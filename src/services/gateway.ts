/**
 * FortPay Payment Gateway Service
 * 
 * Configured with user's FortPay credentials:
 * Base URL: https://api.fortpayplataforma.com.br/api/public/v1
 * API Token: B9zGLBI03TBNIVjpi1PBSQ9E6KXZlL2tVo3m3JLwAY6hEK8duDJjKw1fvHtv
 */

export interface GatewayPixResult {
  copyPaste: string;
  qrCodeBase64?: string;
  transactionId?: string;
}

const FORTPAY_BASE_URL = 'https://api.fortpayplataforma.com.br/api/public/v1';
const FORTPAY_API_TOKEN = 'B9zGLBI03TBNIVjpi1PBSQ9E6KXZlL2tVo3m3JLwAY6hEK8duDJjKw1fvHtv';

// Default product and offer hashes from the user's FortPay account
const DEFAULT_PRODUCT_HASH = 'cw5a4uxdav';
const DEFAULT_OFFER_HASH = 'cw5a4uxdav_kdjdcidigx';

/**
 * Standard TLV (Tag-Length-Value) formatter for EMV BR Code
 */
function formatTLV(id: string, value: string): string {
  const len = String(value.length).padStart(2, '0');
  return `${id}${len}${value}`;
}

/**
 * BACEN CRC16-CCITT algorithm for official BR Code
 */
export function calculateCRC16(str: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= (str.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Generates official EMV BR Code for instant fallback
 */
export function buildBacenPixCode(
  amountInReais: number,
  pixKey: string = 'sheiikinvestimentos@gmail.com',
  merchantName: string = 'SOS SANTA CATARINA',
  merchantCity: string = 'FLORIANOPOLIS'
): string {
  const sanitizedKey = pixKey.trim();
  const amtFormatted = Math.max(1, amountInReais).toFixed(2);

  const sub00 = formatTLV('00', 'br.gov.bcb.pix');
  const sub01 = formatTLV('01', sanitizedKey);
  const tag26 = formatTLV('26', sub00 + sub01);

  let payload = '';
  payload += formatTLV('00', '01');
  payload += tag26;
  payload += formatTLV('52', '0000');
  payload += formatTLV('53', '986');
  payload += formatTLV('54', amtFormatted);
  payload += formatTLV('58', 'BR');
  payload += formatTLV('59', merchantName.substring(0, 25).normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
  payload += formatTLV('60', merchantCity.substring(0, 15).normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
  payload += formatTLV('62', formatTLV('05', '***'));
  payload += '6304';

  const checksum = calculateCRC16(payload);
  return payload + checksum;
}

/**
 * Requests a PIX transaction from FortPay
 */
export async function createFortPayTransaction(amountInReais: number): Promise<GatewayPixResult | null> {
  const amountCents = Math.round(Math.max(1, amountInReais) * 100);

  // Map common values to offers if possible, or use default offer
  let offerHash = DEFAULT_OFFER_HASH;
  if (amountInReais === 17) offerHash = 'b2lua';
  else if (amountInReais === 27) offerHash = 'iznwyjsl7u';
  else if (amountInReais === 37) offerHash = 'aowc9hr0ab';
  else if (amountInReais === 47) offerHash = '7xzyur6xeg';
  else if (amountInReais === 57) offerHash = 'jzsj4o5pky';
  else if (amountInReais === 97) offerHash = 'kw2btfdmtu';

  const payload = {
    api_token: FORTPAY_API_TOKEN,
    amount: amountCents,
    offer_hash: offerHash,
    payment_method: 'pix',
    customer: {
      name: 'Doador SOS SC',
      email: 'doador@sossc.org.br',
      phone_number: '47991979499',
      phone_coutry_code: '55',
      document: '00910959560',
      zip_code: '88010000',
      street_name: 'Rua Principal',
      number: '100',
      complement: '',
      neighborhood: 'Centro',
      city: 'Florianopolis',
      state: 'SC'
    },
    cart: [
      {
        product_hash: DEFAULT_PRODUCT_HASH,
        title: 'Doação SOS Santa Catarina',
        price: amountCents,
        quantity: 1,
        operation_type: 1,
        tangible: false
      }
    ],
    expire_in_days: 1,
    transaction_origin: 'api'
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${FORTPAY_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    // Check if FortPay returned pix string in pix object
    const pixObj = data?.pix || data?.data?.pix || data?.transaction?.pix;
    const copyPaste = pixObj?.pix_url || pixObj?.pix_qr_code || data?.pix_url || data?.copy_paste;
    const qrBase64 = pixObj?.qr_code_base64 || data?.qr_code_base64;
    const txId = data?.hash || data?.id || data?.transaction;

    if (copyPaste && typeof copyPaste === 'string' && copyPaste.startsWith('000201')) {
      return {
        copyPaste,
        qrCodeBase64: qrBase64 || undefined,
        transactionId: txId ? String(txId) : undefined
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Primary function to fetch PIX:
 * Tries FortPay first, and falls back to a certified BACEN EMV code
 * so donors are never delayed or left waiting.
 */
export async function fetchGatewayPix(amount: number): Promise<GatewayPixResult> {
  // Try FortPay
  const fortPayResult = await createFortPayTransaction(amount);
  if (fortPayResult?.copyPaste) {
    return fortPayResult;
  }

  // Fallback to BACEN BR Code
  return {
    copyPaste: buildBacenPixCode(amount),
  };
}
