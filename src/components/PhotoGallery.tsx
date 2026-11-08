import React, { useState, useMemo } from 'react';
import { Camera, MapPin, Maximize2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { DISASTER_PHOTOS, DisasterPhoto } from '../data/photos';

interface PhotoGalleryProps {
  onSelectPhoto: (photo: DisasterPhoto) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Todas as fotos', count: 15 },
  { id: 'floods', label: 'Inundações nos bairros', count: 4 },
  { id: 'tornadoes', label: 'Passagem de tornados', count: 5 },
  { id: 'landslides', label: 'Estradas e barreiras', count: 3 },
  { id: 'rescue', label: 'Famílias e resgates', count: 3 },
];

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onSelectPhoto }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return DISASTER_PHOTOS;
    return DISASTER_PHOTOS.filter((photo) => photo.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="galeria" className="py-14 sm:py-20 bg-[#090e18] border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 mb-1.5">
              <Camera className="h-4 w-4" />
              <span>Fotos Reais da Tragédia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              O Cenário no Chão em Santa Catarina
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              Registros feitos por moradores e voluntários nas últimas horas. A dimensão dos danos mostra por que cada ajuda em dinheiro faz a diferença imediata.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            <span>Toque ou clique em qualquer foto para ver em tela cheia</span>
          </div>
        </div>

        {/* Interactive Category Filter Tabs with Smooth CSS Transition */}
        <div className="mt-6 flex flex-wrap gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-red-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid with smooth CSS transitions */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 transition-opacity duration-300">
          {filteredPhotos.map((photo, index) => {
            const isMarquee = photo.featured && (index === 0 || index === 1);
            return (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className={`gallery-card group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-md transition-all duration-300 hover:border-slate-700 hover:shadow-xl cursor-pointer ${
                  isMarquee ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Image Container with smooth CSS Zoom */}
                <div className={`relative w-full overflow-hidden bg-slate-950 ${isMarquee ? 'h-64 sm:h-80 lg:h-96' : 'h-64 sm:h-72'}`}>
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="gallery-card-image h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090e18] via-[#090e18]/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />

                  {/* Top Floating Tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <span className="rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-slate-200 backdrop-blur-sm border border-white/10">
                      {photo.categoryLabel}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-md bg-red-600/90 px-2 py-0.5 text-[11px] font-semibold text-white">
                      <AlertCircle className="h-3 w-3" />
                      {photo.impactTag}
                    </span>
                  </div>

                  {/* Hover icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                    <Maximize2 className="h-4 w-4" />
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-red-400 mb-0.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{photo.location}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                      {photo.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-xs font-semibold text-slate-400 pt-2 border-t border-slate-800">
                      <span>Ver foto e detalhes</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-red-400" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
