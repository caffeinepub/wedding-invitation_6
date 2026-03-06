import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const galleryImages = [
  {
    src: "/assets/uploads/DSC08244-1.JPG",
    alt: "Bhavana and Ajay together",
  },
  {
    src: "/assets/uploads/DSC08177-2.JPG",
    alt: "Bhavana and Ajay sharing a moment",
  },
  {
    src: "/assets/uploads/DSC08135-2-3.JPG",
    alt: "Bhavana and Ajay at a vintage car",
  },
  {
    src: "/assets/uploads/DSC07985-2-4.JPG",
    alt: "Bhavana and Ajay in traditional attire",
  },
];

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Section reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
          }
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number, dir: "next" | "prev") => {
      if (isTransitioning) return;
      setDirection(dir);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 420);
    },
    [isTransitioning],
  );

  const goNext = useCallback(() => {
    const next = (currentIndex + 1) % galleryImages.length;
    goTo(next, "next");
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    const prev =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    goTo(prev, "prev");
  }, [currentIndex, goTo]);

  // Auto-advance every 4.5s, pause on hover
  useEffect(() => {
    if (isPaused || lightboxIndex !== null) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      return;
    }
    autoplayRef.current = setInterval(() => {
      goNext();
    }, 4500);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, lightboxIndex, goNext]);

  // Keyboard nav for carousel & lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % galleryImages.length : null,
          );
        } else if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + galleryImages.length) % galleryImages.length
              : null,
          );
        } else if (e.key === "Escape") {
          setLightboxIndex(null);
        }
      } else {
        if (e.key === "ArrowRight") goNext();
        else if (e.key === "ArrowLeft") goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goNext, goPrev]);

  const lightboxGoNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null,
    );

  const lightboxGoPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : null,
    );

  return (
    <section id="gallery" ref={sectionRef} className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="font-elegant italic text-gold text-lg tracking-widest mb-3">
            Memories
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal mb-6">
            Gallery
          </h2>
          <div className="ornament-divider">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-gold/70"
            >
              <path
                d="M12 2C12 2 10 6 6 6C6 6 10 8 12 12C14 8 18 6 18 6C14 6 12 2 12 2Z"
                fill="currentColor"
              />
              <path
                d="M12 22C12 22 10 18 6 18C6 18 10 16 12 12C14 16 18 18 18 18C14 18 12 22 12 22Z"
                fill="currentColor"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main image frame */}
          <div className="relative overflow-hidden rounded-sm aspect-[16/10] bg-charcoal/5 shadow-elegant-lg">
            {/* Decorative corner accents */}
            <span
              aria-hidden="true"
              className="absolute top-3 left-3 z-10 w-6 h-6 border-t border-l border-gold/50 pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute top-3 right-3 z-10 w-6 h-6 border-t border-r border-gold/50 pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-3 z-10 w-6 h-6 border-b border-l border-gold/50 pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 z-10 w-6 h-6 border-b border-r border-gold/50 pointer-events-none"
            />

            {/* Image with cross-fade transition */}
            <button
              type="button"
              className="w-full h-full cursor-pointer group focus:outline-none"
              onClick={() => setLightboxIndex(currentIndex)}
              aria-label={`View ${galleryImages[currentIndex].alt} — click to enlarge`}
            >
              <img
                key={currentIndex}
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.03]
                  ${
                    isTransitioning
                      ? direction === "next"
                        ? "opacity-0 scale-[1.04] translate-x-4"
                        : "opacity-0 scale-[1.04] -translate-x-4"
                      : "opacity-100 scale-100 translate-x-0"
                  }`}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
                <div className="w-12 h-12 border border-white/60 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/10">
                  <span className="text-white text-xl leading-none">+</span>
                </div>
              </div>
            </button>

            {/* Counter badge */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full pointer-events-none">
              <span className="font-elegant italic text-white/80 text-sm tracking-widest">
                {currentIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>

          {/* Left arrow */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous photo"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20
              w-11 h-11 rounded-full bg-ivory shadow-elegant border border-gold/30
              flex items-center justify-center
              text-charcoal/70 hover:text-gold hover:border-gold hover:shadow-gold
              transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
              sm:-translate-x-6"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20
              w-11 h-11 rounded-full bg-ivory shadow-elegant border border-gold/30
              flex items-center justify-center
              text-charcoal/70 hover:text-gold hover:border-gold hover:shadow-gold
              transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
              sm:translate-x-6"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Dot indicators */}
        <div
          className="flex items-center justify-center gap-2.5 mt-7"
          role="tablist"
          aria-label="Gallery photos"
        >
          {galleryImages.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Go to photo ${idx + 1}`}
              onClick={() => goTo(idx, idx > currentIndex ? "next" : "prev")}
              className={`rounded-full transition-all duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
                ${
                  idx === currentIndex
                    ? "w-7 h-2.5 bg-gold shadow-gold"
                    : "w-2.5 h-2.5 bg-gold/25 hover:bg-gold/50"
                }`}
            />
          ))}
        </div>

        {/* Caption */}
        <p
          className={`text-center font-elegant italic text-charcoal/40 text-sm mt-4 tracking-wide transition-all duration-500
            ${isTransitioning ? "opacity-0" : "opacity-100"}`}
        >
          {galleryImages[currentIndex].alt}
        </p>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <dialog
          open
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center w-full h-full max-w-none max-h-none m-0 p-0 border-0"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightboxIndex(null);
          }}
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            type="button"
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>

          {/* Prev button */}
          <button
            type="button"
            className="absolute left-4 p-3 text-white/70 hover:text-white transition-colors z-10"
            onClick={lightboxGoPrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <div className="max-w-4xl max-h-[85vh] mx-16">
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain"
            />
            {/* Caption */}
            <p className="text-center font-elegant italic text-white/50 mt-4 text-sm px-4">
              {lightboxIndex + 1} / {galleryImages.length}
            </p>
          </div>

          {/* Next button */}
          <button
            type="button"
            className="absolute right-4 p-3 text-white/70 hover:text-white transition-colors z-10"
            onClick={lightboxGoNext}
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>
        </dialog>
      )}
    </section>
  );
}
