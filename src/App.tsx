import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopBar } from './components/TopBar';
import { HeroEmergency } from './components/HeroEmergency';
import { GoalTracker } from './components/GoalTracker';
import { PhotoGallery } from './components/PhotoGallery';
import { LightboxModal } from './components/LightboxModal';
import { ImpactCalculator } from './components/ImpactCalculator';
import { PixModal } from './components/PixModal';
import { FieldUpdates } from './components/FieldUpdates';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { DISASTER_PHOTOS, DisasterPhoto } from './data/photos';
import { CheckCircle2 } from 'lucide-react';

const sectionScrollProps = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
};

export default function App() {
  const [activePhoto, setActivePhoto] = useState<DisasterPhoto | null>(null);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<number>(10);
  const [currentAmount, setCurrentAmount] = useState<number>(338760.50);
  const [donorCount, setDonorCount] = useState<number>(4920);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenDonate = (amount: number = 10) => {
    setDonationAmount(amount >= 10 ? amount : 10);
    setIsDonateModalOpen(true);
  };

  const handleDonationSuccess = (amount: number) => {
    setCurrentAmount((prev) => prev + amount);
    setDonorCount((prev) => prev + 1);
    setToastMessage(`Doação de R$ ${amount.toFixed(2)} confirmada! Muito obrigado por ajudar Santa Catarina.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleNavigateLightbox = (index: number) => {
    if (index >= 0 && index < DISASTER_PHOTOS.length) {
      setActivePhoto(DISASTER_PHOTOS[index]);
    }
  };

  const scrollToGallery = () => {
    const el = document.getElementById('galeria');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090e18] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Bar Navigation */}
      <TopBar onOpenDonate={() => handleOpenDonate(10)} />

      {/* Main Content Sections with framer-motion entrance and scroll animations */}
      <main className="flex-1">
        {/* 1. Hero: immediate smooth fade-in and slide-up on entry */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <HeroEmergency
            onOpenDonate={(amt) => handleOpenDonate(amt || 10)}
            onExploreGallery={scrollToGallery}
            onOpenPhoto={(photo) => setActivePhoto(photo)}
          />
        </motion.div>

        {/* 2. Crowdfunding Goal Progress Bar & Live PIX Donors */}
        <motion.div {...sectionScrollProps}>
          <GoalTracker
            currentAmount={currentAmount}
            targetAmount={500000}
            donorCount={donorCount}
            onOpenDonate={(amt) => handleOpenDonate(amt || 10)}
          />
        </motion.div>

        {/* 3. Categorized Photo Gallery with Smooth Motion Transitions */}
        <motion.div {...sectionScrollProps} viewport={{ once: true, amount: 0.08 }}>
          <PhotoGallery onSelectPhoto={(photo) => setActivePhoto(photo)} />
        </motion.div>

        {/* 4. Real Impact Breakdown (Starting from R$ 10) */}
        <motion.div {...sectionScrollProps}>
          <ImpactCalculator onDonate={(amt) => handleOpenDonate(amt)} />
        </motion.div>

        {/* 5. Field Updates & Transparency */}
        <motion.div {...sectionScrollProps}>
          <FieldUpdates />
        </motion.div>

        {/* 6. FAQ & Support Channels */}
        <motion.div {...sectionScrollProps}>
          <FAQSection />
        </motion.div>
      </main>

      {/* Footer with scroll reveal */}
      <motion.div {...sectionScrollProps} viewport={{ once: true, amount: 0.1 }}>
        <Footer />
      </motion.div>

      {/* Lightbox Modal for Photo Inspection */}
      <LightboxModal
        photo={activePhoto}
        photos={DISASTER_PHOTOS}
        onClose={() => setActivePhoto(null)}
        onNavigate={handleNavigateLightbox}
        onOpenDonate={() => handleOpenDonate(10)}
      />

      {/* Interactive PIX Modal (with quick amount selection starting at R$ 10) */}
      <PixModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        donationAmount={donationAmount}
        onDonationSuccess={handleDonationSuccess}
      />

      {/* Floating Success Toast with AnimatePresence */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-slate-900/95 px-5 py-3.5 text-white shadow-xl backdrop-blur-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Doação Registrada</p>
              <p className="text-xs sm:text-sm text-slate-200">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
