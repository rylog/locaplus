import {
  ArrowsPointingOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { TempoPhotos } from '@/data/tempoPhotos';

export const RecentInstallations = () => {
  const t = useTranslations();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const photos = TempoPhotos;

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft')
        setSelectedIndex((i) => (i! > 0 ? i! - 1 : photos.length - 1));
      if (e.key === 'ArrowRight')
        setSelectedIndex((i) => (i! < photos.length - 1 ? i! + 1 : 0));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, photos]);

  // Disable background scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedIndex]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-10 text-center lg:text-left">
        {t('TemposPage.gallery.title')}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="group relative overflow-hidden rounded-lg bg-gray-200 focus:outline-none aspect-square cursor-pointer"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={1000}
              height={1000}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/50 p-1.5 rounded-full">
                <ArrowsPointingOutIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl h-full sm:h-auto flex flex-col items-center justify-center"
          >
            <Image
              src={photos[selectedIndex].src}
              alt={photos[selectedIndex].alt}
              width={2800}
              height={2800}
              className="object-contain w-full h-full sm:h-auto rounded-lg select-none max-w-full max-h-screen"
            />

            {/* Navigation buttons */}
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev! > 0 ? prev! - 1 : photos.length - 1,
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 sm:p-4 bg-black/70 rounded-full text-white shadow-lg hover:bg-black/90 hover:scale-105 transition-transform cursor-pointer"
            >
              <ChevronLeftIcon className="h-8 w-8 sm:h-10 sm:w-10" />
            </button>
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev! < photos.length - 1 ? prev! + 1 : 0,
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-4 bg-black/70 rounded-full text-white shadow-lg hover:bg-black/90 hover:scale-105 transition-transform cursor-pointer"
            >
              <ChevronRightIcon className="h-8 w-8 sm:h-10 sm:w-10" />
            </button>
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-2 right-2 p-2 sm:p-3 bg-black/70 rounded-full text-white shadow-lg hover:bg-black/90 hover:scale-105 transition-transform cursor-pointer"
            >
              <XMarkIcon className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
