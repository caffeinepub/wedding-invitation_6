import { useEffect, useRef } from "react";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right");
            reveals.forEach((el) => { el.classList.add("is-visible"); });
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

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-ivory"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="font-elegant italic text-gold text-lg tracking-widest mb-3">
            How it began
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal mb-6">
            Our Story
          </h2>
          <div className="ornament-divider">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold/70">
              <path d="M12 2C12 2 10 6 6 6C6 6 10 8 12 12C14 8 18 6 18 6C14 6 12 2 12 2Z" fill="currentColor" />
              <path d="M12 22C12 22 10 18 6 18C6 18 10 16 12 12C14 16 18 18 18 18C14 18 12 22 12 22Z" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Story text */}
          <div className="space-y-6 reveal-left">
            <p className="font-elegant text-lg leading-relaxed text-charcoal/80">
              It was the spring of 2019 when fate drew two strangers to the same quiet corner 
              of the university library. Bhavana was buried in architectural blueprints, and Ajay 
              was losing his battle with a particularly stubborn philosophy paper — both seeking 
              the same refuge of silence. A shared look over mismatched books became the first 
              thread in an unexpected tapestry.
            </p>
            <p className="font-elegant text-lg leading-relaxed text-charcoal/80">
              Their first proper date was at a small coffee house on Elm Street, where a two-hour 
              conversation stretched well past closing time. Over mismatched mugs of Ethiopian 
              pour-overs and almond croissants, they discovered a shared love of rainy days, 
              old films, and the particular magic found in the margins of well-worn books. The 
              barista had to gently remind them the chairs needed stacking.
            </p>
            <p className="font-elegant text-lg leading-relaxed text-charcoal/80">
              Five years of adventures, late-night conversations, and growing together brought 
              them to a moonlit rooftop in December 2024, where Ajay knelt with a ring his 
              grandmother once wore. The answer, through tears of joy, was a resounding yes. 
              Now, on March 25, 2026, surrounded by the people they love most, they will 
              begin the greatest chapter of their story — together, forever.
            </p>

            {/* Small ornament quote */}
            <blockquote className="border-l-2 border-gold/40 pl-6 py-2 mt-8">
              <p className="font-display italic text-charcoal/60 text-lg">
                "In all the world, there is no heart for me like yours."
              </p>
              <cite className="font-body text-xs tracking-widest uppercase text-charcoal/40 mt-2 block">
                — Maya Angelou
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
