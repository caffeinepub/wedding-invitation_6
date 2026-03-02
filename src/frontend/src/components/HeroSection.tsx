import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-03-25T19:00:00");

function getTimeRemaining() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-bg.dim_1600x900.jpg"
          alt="Wedding background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.72 0.1 65 / 0.15) 0%, transparent 50%), 
                              radial-gradient(circle at 80% 20%, oklch(0.72 0.1 65 / 0.1) 0%, transparent 40%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="text-gold"
            aria-hidden="true"
          >
            <path
              d="M16 2C16 2 14 8 8 8C8 8 14 10 16 16C18 10 24 8 24 8C18 8 16 2 16 2Z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M16 30C16 30 14 24 8 24C8 24 14 22 16 16C18 22 24 24 24 24C18 24 16 30 16 30Z"
              fill="currentColor"
              opacity="0.6"
            />
            <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.8" />
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
        </div>

        {/* Names */}
        <h1
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-4 leading-none tracking-wide animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Bhavana{" "}
          <span className="font-elegant italic text-gold-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            &amp;
          </span>{" "}
          Ajay
        </h1>

        {/* Tagline */}
        <p
          className="font-elegant italic text-base sm:text-lg text-white/80 tracking-widest mb-2 animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          She is the chaos and he is the meaning, who chose the chaos.
        </p>

        {/* Divider */}
        <div
          className="flex items-center justify-center gap-4 my-6 animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          <div className="h-px w-20 bg-gold/50" />
          <span className="text-gold/80 text-lg">✦</span>
          <div className="h-px w-20 bg-gold/50" />
        </div>

        {/* Date */}
        <p
          className="font-body text-base sm:text-lg tracking-[0.3em] uppercase text-white/70 mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          March 25, 2026
        </p>

        {/* Countdown */}
        <div
          className="flex items-center justify-center gap-4 sm:gap-8 mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.7s", opacity: 0 }}
        >
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Min" },
            { value: timeLeft.seconds, label: "Sec" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="relative w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center">
                <div className="absolute inset-0 border border-gold/30 rounded" />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded" />
                <span className="relative font-display text-2xl sm:text-3xl text-white font-bold">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <span className="font-body text-xs tracking-widest uppercase text-white/50 mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <div className="w-px h-8 bg-gradient-to-b from-white/0 to-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>
    </section>
  );
}
