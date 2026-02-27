import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { src: "/assets/generated/gallery-1.dim_800x600.jpg", alt: "Emily and James at the university library where they first met" },
  { src: "/assets/generated/gallery-2.dim_800x600.jpg", alt: "First date at the cozy coffee house on Elm Street" },
  { src: "/assets/generated/gallery-3.dim_800x600.jpg", alt: "A romantic afternoon walk through the botanical garden" },
  { src: "/assets/generated/gallery-4.dim_800x600.jpg", alt: "Engagement photoshoot in the golden evening light" },
  { src: "/assets/generated/gallery-5.dim_800x600.jpg", alt: "Celebrating with family and friends after the proposal" },
  { src: "/assets/generated/gallery-6.dim_800x600.jpg", alt: "A candid moment of laughter and joy together" },
];

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(".reveal");
            reveals.forEach((el, idx) => {
              setTimeout(() => { el.classList.add("is-visible"); }, idx * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => prev !== null ? (prev + 1) % galleryImages.length : null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null);
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  const goNext = () => {
    setLightboxIndex((prev) => prev !== null ? (prev + 1) % galleryImages.length : null);
  };

  const goPrev = () => {
    setLightboxIndex((prev) => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-ivory"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="font-elegant italic text-gold text-lg tracking-widest mb-3">
            Memories
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal mb-6">
            Gallery
          </h2>
          <div className="ornament-divider">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold/70">
              <path d="M12 2C12 2 10 6 6 6C6 6 10 8 12 12C14 8 18 6 18 6C14 6 12 2 12 2Z" fill="currentColor" />
              <path d="M12 22C12 22 10 18 6 18C6 18 10 16 12 12C14 16 18 18 18 18C14 18 12 22 12 22Z" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <button
              type="button"
              key={image.src}
              className="reveal gallery-item aspect-[4/3] overflow-hidden cursor-pointer relative group"
              style={{ transitionDelay: `${index * 0.08}s` }}
              onClick={() => setLightboxIndex(index)}
              aria-label={`View ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 border border-white/70 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">+</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightboxIndex(null);
          }}
          role="dialog"
          aria-modal="true"
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
            onClick={goPrev}
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
            onClick={goNext}
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  );
}
