import { useEffect, useRef } from "react";
import { MapPin, Clock, Calendar } from "lucide-react";

interface EventCardProps {
  type: "Ceremony" | "Reception";
  time: string;
  date: string;
  venue: string;
  address: string;
  locationUrl?: string;
  delay?: string;
}

function EventCard({ type, time, date, venue, address, locationUrl, delay = "0s" }: EventCardProps) {
  const isCeremony = type === "Ceremony";

  return (
    <div
      className={`reveal ${delay ? `reveal-delay-${delay}` : ""} relative p-8 lg:p-10 flex flex-col gap-6`}
      style={{
        background: "linear-gradient(135deg, oklch(0.995 0.004 60 / 0.9), oklch(0.97 0.015 55 / 0.8))",
        boxShadow: "0 4px 40px oklch(0.22 0.018 45 / 0.1), inset 0 0 0 1px oklch(0.72 0.1 65 / 0.25)",
        backdropFilter: "blur(8px)",
        transitionDelay: delay,
      }}
    >
      {/* Corner flourishes */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/50" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/50" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/50" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/50" />

      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
          style={{
            background: "linear-gradient(135deg, oklch(0.78 0.07 65 / 0.2), oklch(0.62 0.09 50 / 0.15))",
            border: "1px solid oklch(0.72 0.1 65 / 0.4)",
          }}
        >
          {isCeremony ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold">
              <path d="M12 2L9 6H3L7.5 9.5L5.5 15L12 11.5L18.5 15L16.5 9.5L21 6H15L12 2Z" fill="currentColor" opacity="0.8" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold">
              <path d="M12 3C12 3 5 7 5 14C5 17.866 8.134 21 12 21C15.866 21 19 17.866 19 14C19 7 12 3 12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M12 14C13.104 14 14 13.104 14 12C14 10.896 13.104 10 12 10C10.896 10 10 10.896 10 12C10 13.104 10.896 14 12 14Z" fill="currentColor" />
            </svg>
          )}
        </div>
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/70 mb-1">
          {isCeremony ? "The" : "Join us for the"}
        </p>
        <h3 className="font-display text-3xl text-charcoal">
          {type}
        </h3>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/30" />
        <span className="text-gold/50 text-xs">✦</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/30" />
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Clock size={16} className="text-gold/60 mt-0.5 shrink-0" />
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-charcoal/40 mb-0.5">Time</p>
            <p className="font-elegant text-xl text-charcoal">{time}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar size={16} className="text-gold/60 mt-0.5 shrink-0" />
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-charcoal/40 mb-0.5">Date</p>
            <p className="font-elegant text-xl text-charcoal">{date}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin size={16} className="text-gold/60 mt-0.5 shrink-0" />
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-charcoal/40 mb-0.5">Venue</p>
            {locationUrl ? (
              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-elegant text-xl text-charcoal hover:text-gold transition-colors duration-200 underline decoration-gold/40 underline-offset-2"
              >
                {venue}
              </a>
            ) : (
              <p className="font-elegant text-xl text-charcoal">{venue}</p>
            )}
            <p className="font-body text-sm text-charcoal/60 mt-1">{address}</p>
          </div>
        </div>
      </div>

      {/* Add to calendar button */}
      <button
        type="button"
        className="mt-2 w-full py-3 font-body text-xs tracking-[0.2em] uppercase text-gold border border-gold/40 hover:bg-gold/10 hover:border-gold/70 transition-all duration-300"
        onClick={() => {
          /* Placeholder for calendar integration */
        }}
      >
        Add to Calendar
      </button>
    </div>
  );
}

export function DetailsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(".reveal");
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
      id="details"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, oklch(0.96 0.025 15) 0%, oklch(0.98 0.012 30) 50%, oklch(0.96 0.025 15) 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-0 left-0 w-64 h-64 opacity-20"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.1 65 / 0.3), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-10"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.1 65 / 0.4), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="font-elegant italic text-gold text-lg tracking-widest mb-3">
            Save the date
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal mb-6">
            Reception Details
          </h2>
          <div className="ornament-divider">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold/70">
              <path d="M12 2C12 2 10 6 6 6C6 6 10 8 12 12C14 8 18 6 18 6C14 6 12 2 12 2Z" fill="currentColor" />
              <path d="M12 22C12 22 10 18 6 18C6 18 10 16 12 12C14 16 18 18 18 18C14 18 12 22 12 22Z" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Event cards */}
        <div className="max-w-xl mx-auto">
          <EventCard
            type="Reception"
            time="7:00 PM"
            date="March 25, 2026"
            venue="Parthasarathy Damodar Party Hall"
            address="376, Rajaji Nagar Main Rd, 1st Block, Nagapura, Bengaluru, Karnataka 560010"
            locationUrl="https://maps.app.goo.gl/gWUnucLXanJgXtPN9"
            delay="0s"
          />
        </div>
      </div>
    </section>
  );
}
