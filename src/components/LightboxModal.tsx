import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Heart, AlertCircle, Maximize2, Minimize2 } from 'lucide-react';
import { DisasterPhoto } from '../data/photos';

interface LightboxModalProps {
  photo: DisasterPhoto | null;
  photos: DisasterPhoto[];
  onClose: () => void;
  onNavigate: (index: number) => void;
  onOpenDonate: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
  onOpenDonate,
}) => {
  const [isZoomed, setIsZoomed] = React.useState(false);

  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;

  useEffect(() => {
    setIsZoomed(false);
  }, [photo]);

  // Lock body scroll when photo is active
  useEffect(() => {
    if (!photo) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [photo]);

  // Keyboard navigation
  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          onNavigate(currentIndex - 1);
        } else {
          onNavigate(photos.length - 1);
        }
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < photos.length - 1) {
          onNavigate(currentIndex + 1);
        } else {
          onNavigate(0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, currentIndex, photos.length, onClose, onNavigate]);

  if (!photo) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(photos.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-4 lg:p-6 transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      {/* Top bar with count, location and close button */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/90 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-red-600/30 text-red-400 text-xs font-mono font-bold border border-red-500/40">
            {currentIndex + 1}/{photos.length}
          </span>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold">
              <MapPin className="h-3.5 w-3.5" />
              <span>{photo.location}</span>
            </div>
            <p className="text-sm font-bold text-white hidden sm:block truncate max-w-md">
              {photo.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="rounded-lg bg-slate-900/80 p-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800"
            title={isZoomed ? 'Reduzir Zoom' : 'Ampliar Zoom'}
          >
            {isZoomed ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900/80 p-2 text-slate-300 hover:text-white hover:bg-red-600 transition-colors border border-slate-800"
            title="Fechar (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport with Prev/Next buttons */}
      <div
        className="relative flex flex-col items-center justify-center w-full max-w-6xl max-h-[85vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-all border border-slate-700 shadow-xl cursor-pointer"
          title="Foto Anterior (Seta Esquerda)"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-all border border-slate-700 shadow-xl cursor-pointer"
          title="Próxima Foto (Seta Direita)"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* The Image with zoom capability */}
        <div className={`relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950 flex items-center justify-center max-h-[62vh] sm:max-h-[68vh] transition-all duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
             onClick={() => setIsZoomed(!isZoomed)}>
          <img
            src={photo.src}
            alt={photo.title}
            className={`max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full object-contain transition-transform duration-300 ${
              isZoomed ? 'scale-125' : 'scale-100'
            }`}
          />
        </div>

        {/* Metadata & Caption Card */}
        <div className="w-full mt-3 rounded-xl border border-slate-800 bg-slate-900/90 p-4 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  {photo.categoryLabel}
                </span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {photo.impactTag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {photo.caption}
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenDonate();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-red-600/30 hover:bg-red-500 transition-all shrink-0 cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-white/20" />
              <span>Ajudar Esta Região</span>
            </button>
          </div>
        </div>

        {/* Bottom thumbnail strip */}
        <div className="w-full mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {photos.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onNavigate(idx)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'border-red-500 ring-2 ring-red-500/50 scale-105 opacity-100'
                  : 'border-slate-800 opacity-50 hover:opacity-90'
              }`}
            >
              <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
