import { useEffect, useRef } from "react";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(
              ".reveal, .reveal-left, .reveal-right",
            );
            for (const el of Array.from(reveals)) {
              el.classList.add("is-visible");
            }
          }
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="font-elegant italic text-gold text-lg tracking-widest mb-3">
            Love Story
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal mb-6">
            Our Story
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

        <div className="max-w-3xl mx-auto">
          {/* Story text */}
          <div className="space-y-6 reveal-left">
            {/* Bold thought-style quote */}
            <blockquote className="border-l-4 border-gold pl-6 py-3 my-2">
              <p className="font-display font-bold italic text-charcoal text-xl leading-relaxed">
                A tale crafted by love, where two hearts met, grew, and chose to
                walk one path together
              </p>
            </blockquote>

            <p className="font-elegant text-lg leading-relaxed text-charcoal/80 text-center italic">
              At the dawn of our forever,
              <br />
              we seek your presence and blessings
              <br />
              as we step into a new chapter of life
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
