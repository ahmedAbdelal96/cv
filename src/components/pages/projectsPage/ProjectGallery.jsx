'use client';

import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { useLocale } from 'next-intl';

const galleryI18n = {
  ar: {
    galleryLabel: 'معرض صور المشروع',
    screenshotsList: 'صور المشروع',
    screenshotNum: 'لقطة شاشة رقم',
    prev: 'الصورة السابقة',
    next: 'الصورة التالية',
    expand: 'عرض بالحجم الكامل',
    close: 'إغلاق المعاينة',
    zoomIn: 'تكبير',
    zoomOut: 'تصغير',
    resetZoom: 'إعادة ضبط الحجم',
    panHint: 'اسحب للتكبير والتنقل بحرية داخل تفاصيل الشاشة',
    imageOf: 'من',
  },
  en: {
    galleryLabel: 'Project image gallery',
    screenshotsList: 'Project screenshots',
    screenshotNum: 'screenshot',
    prev: 'Previous image',
    next: 'Next image',
    expand: 'View full screen',
    close: 'Close viewer',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    resetZoom: 'Reset zoom',
    panHint: 'Pan & scroll horizontally or vertically to inspect UI details',
    imageOf: 'of',
  },
  fr: {
    galleryLabel: 'Galerie d’images du projet',
    screenshotsList: 'Captures d’écran du projet',
    screenshotNum: 'capture d’écran',
    prev: 'Image précédente',
    next: 'Image suivante',
    expand: 'Plein écran',
    close: 'Fermer la vue',
    zoomIn: 'Zoom avant',
    zoomOut: 'Zoom arrière',
    resetZoom: 'Réinitialiser',
    panHint: 'Faites glisser pour inspecter les détails de l’interface',
    imageOf: 'sur',
  },
};

export default function ProjectGallery({ project }) {
  const locale = useLocale();
  const t = galleryI18n[locale] || galleryI18n.en;

  const gallery = [...(project?.gallery || [])].sort((a, b) => a.order - b.order);
  const settings = project?.gallerySettings || {};
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Touch swipe state
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndX = useRef(null);
  const touchEndY = useRef(null);

  // Thumbnail container reference for auto-scrolling
  const thumbnailStripRef = useRef(null);

  const go = useCallback(
    (step) => {
      setActiveIndex((current) => {
        const next = current + step;
        if (next < 0) return settings.loop ? gallery.length - 1 : 0;
        if (next >= gallery.length) return settings.loop ? 0 : gallery.length - 1;
        return next;
      });
      // Reset zoom on slide change in fullscreen
      setZoomLevel(1);
    },
    [gallery.length, settings.loop]
  );

  // Slideshow timer
  useEffect(() => {
    if (!settings.autoPlay || gallery.length < 2 || isPaused || isFullscreen) {
      return undefined;
    }

    const interval = Math.max(1, settings.intervalSeconds || 5) * 1000;
    const timer = setInterval(() => {
      setActiveIndex((current) => {
        if (current < gallery.length - 1) return current + 1;
        return settings.loop ? 0 : current;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [
    activeIndex,
    gallery.length,
    isPaused,
    isFullscreen,
    settings.autoPlay,
    settings.intervalSeconds,
    settings.loop,
  ]);

  // Lock body scroll during Fullscreen Modal
  useEffect(() => {
    if (isFullscreen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFullscreen) {
        if (e.key === 'Escape') {
          setIsFullscreen(false);
          setZoomLevel(1);
        } else if (e.key === 'ArrowLeft') {
          locale === 'ar' ? go(1) : go(-1);
        } else if (e.key === 'ArrowRight') {
          locale === 'ar' ? go(-1) : go(1);
        } else if (e.key === '+' || e.key === '=') {
          setZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
        } else if (e.key === '-' || e.key === '_') {
          setZoomLevel((z) => Math.max(1, +(z - 0.25).toFixed(2)));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, go, locale]);

  // Auto scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailStripRef.current) {
      const activeEl = thumbnailStripRef.current.children[activeIndex];
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeIndex]);

  if (!gallery.length) return null;

  const active = gallery[activeIndex] || gallery[0];

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;

    // Trigger swipe only when horizontal gesture is stronger than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Swiped left
        locale === 'ar' ? go(-1) : go(1);
      } else {
        // Swiped right
        locale === 'ar' ? go(1) : go(-1);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  return (
    <section
      className="w-full"
      aria-label={t.galleryLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Main Image Showcase Card */}
      <div className="group relative w-full overflow-hidden rounded-2xl border border-border/80 bg-muted/20 shadow-lg shadow-black/5 dark:shadow-black/20">
        <div
          className="relative flex w-full aspect-[16/10] min-h-[320px] sm:min-h-[440px] md:min-h-[520px] lg:min-h-[580px] xl:min-h-[640px] max-h-[760px] items-center justify-center cursor-pointer select-none"
          onClick={() => setIsFullscreen(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            key={active.src}
            src={active.src}
            alt={`${project.title} ${t.screenshotNum} ${active.order}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1440px"
            className="object-contain p-2 sm:p-3 transition-opacity duration-300 motion-safe:animate-in motion-safe:fade-in"
            priority={activeIndex === 0}
          />

          {/* Image Counter Badge */}
          {gallery.length > 1 && (
            <div className="absolute start-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10 shadow-sm pointer-events-none">
              <span>{activeIndex + 1}</span>
              <span className="opacity-60">/</span>
              <span className="opacity-80">{gallery.length}</span>
            </div>
          )}

          {/* Expand to Fullscreen CTA */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(true);
            }}
            aria-label={t.expand}
            className="absolute end-4 top-4 z-10 flex items-center gap-1.5 rounded-xl bg-black/70 hover:bg-black/90 active:scale-95 px-3 py-1.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md border border-white/15 shadow-md transition-all duration-200"
          >
            <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{t.expand}</span>
          </button>
        </div>

        {/* Previous & Next Floating Navigation Overlay */}
        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label={t.prev}
              className="absolute start-3 sm:start-5 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/10 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label={t.next}
              className="absolute end-3 sm:end-5 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/10 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <ChevronRight className="h-6 w-6 rtl:rotate-180" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Navigation Strip */}
      {gallery.length > 1 && (
        <div
          ref={thumbnailStripRef}
          className="mt-4 sm:mt-5 flex gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth"
          role="list"
          aria-label={t.screenshotsList}
        >
          {gallery.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={image.src}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  setZoomLevel(1);
                }}
                aria-label={`${project.title} ${t.screenshotNum} ${image.order}`}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative h-16 w-24 sm:h-20 sm:w-32 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'border-primary ring-2 ring-primary/30 shadow-md scale-[1.02] opacity-100'
                    : 'border-border/60 bg-muted/30 opacity-60 hover:opacity-100 hover:border-muted-foreground/40'
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 96px, 128px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-1 end-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
                  {index + 1}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Modal Lightbox Viewer */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl text-white select-none motion-safe:animate-in motion-safe:fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} - ${t.galleryLabel}`}
        >
          {/* Top Bar Controls */}
          <div className="flex h-16 sm:h-18 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6 bg-black/40">
            {/* Title & Counter */}
            <div className="flex items-center gap-3 truncate">
              <span className="text-sm sm:text-base font-semibold text-white/90 truncate max-w-[180px] sm:max-w-md">
                {project.title}
              </span>
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-mono text-white/80">
                {activeIndex + 1} {t.imageOf} {gallery.length}
              </span>
            </div>

            {/* Viewer Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Zoom Out */}
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(1, +(z - 0.3).toFixed(2)))}
                disabled={zoomLevel <= 1}
                aria-label={t.zoomOut}
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all text-white"
              >
                <ZoomOut className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Current Zoom Level / Toggle */}
              <button
                type="button"
                onClick={() => setZoomLevel((z) => (z > 1 ? 1 : 1.6))}
                aria-label={t.resetZoom}
                className="hidden sm:flex h-10 px-3 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-medium transition-all text-white"
              >
                {Math.round(zoomLevel * 100)}%
              </button>

              {/* Zoom In */}
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(2.5, +(z + 0.3).toFixed(2)))}
                disabled={zoomLevel >= 2.5}
                aria-label={t.zoomIn}
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all text-white"
              >
                <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {zoomLevel > 1 && (
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  aria-label={t.resetZoom}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white"
                >
                  <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setIsFullscreen(false);
                  setZoomLevel(1);
                }}
                aria-label={t.close}
                className="ms-2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-red-600/80 hover:bg-red-600 active:scale-95 transition-all text-white shadow-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Interactive Lightbox Canvas */}
          <div
            className="relative flex-1 overflow-auto p-2 sm:p-4 overscroll-contain flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Scrollable & Zoomable Image Wrapper */}
            <div
              className="relative transition-all duration-200 ease-out flex items-center justify-center max-w-none"
              style={{
                width: zoomLevel > 1 ? `${zoomLevel * 100}%` : '100%',
                height: zoomLevel > 1 ? `${zoomLevel * 100}%` : '100%',
                minWidth: zoomLevel > 1 ? '900px' : 'auto',
                minHeight: zoomLevel > 1 ? '600px' : 'auto',
              }}
            >
              <div className="relative w-full h-[68vh] sm:h-[76vh]">
                <Image
                  src={active.src}
                  alt={`${project.title} ${t.screenshotNum} ${active.order}`}
                  fill
                  sizes="100vw"
                  className="object-contain select-none"
                  priority
                />
              </div>
            </div>

            {/* Modal Overlay Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t.prev}
                  className="fixed start-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="h-7 w-7 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t.next}
                  className="fixed end-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="h-7 w-7 rtl:rotate-180" />
                </button>
              </>
            )}
          </div>

          {/* Modal Bottom Bar: Hint & Mini Thumbnails */}
          <div className="shrink-0 border-t border-white/10 bg-black/60 px-4 py-3">
            <div className="mx-auto flex max-w-4xl flex-col sm:flex-row items-center justify-between gap-2 text-center">
              <p className="text-xs text-white/60">
                {t.panHint}
              </p>
              {gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-1 max-w-full no-scrollbar">
                  {gallery.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => {
                        setActiveIndex(index);
                        setZoomLevel(1);
                      }}
                      className={`relative h-10 w-14 sm:h-12 sm:w-18 shrink-0 overflow-hidden rounded-md border transition-all ${
                        index === activeIndex
                          ? 'border-primary ring-2 ring-primary/40 opacity-100 scale-105'
                          : 'border-white/20 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <Image src={image.src} alt="" fill sizes="72px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
