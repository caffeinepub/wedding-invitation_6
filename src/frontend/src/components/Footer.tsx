export function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="py-16 px-6 text-center"
      style={{ background: "oklch(0.16 0.018 45)" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Decorative top ornament */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="text-gold/50"
          >
            <path
              d="M14 2C14 2 12 7 7 7C7 7 12 9.5 14 14C16 9.5 21 7 21 7C16 7 14 2 14 2Z"
              fill="currentColor"
            />
            <path
              d="M14 26C14 26 12 21 7 21C7 21 12 18.5 14 14C16 18.5 21 21 21 21C16 21 14 26 14 26Z"
              fill="currentColor"
              opacity="0.4"
            />
            <circle cx="14" cy="14" r="1.5" fill="currentColor" opacity="0.7" />
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* Couple names */}
        <h2
          className="font-display text-4xl sm:text-5xl italic mb-3"
          style={{ color: "oklch(0.92 0.04 15)" }}
        >
          Bhavana &amp; Ajay
        </h2>

        {/* Wedding date */}
        <p
          className="font-body text-xs tracking-[0.35em] uppercase mb-8"
          style={{ color: "oklch(0.65 0.025 45)" }}
        >
          March 25, 2026 · Bengaluru, Karnataka
        </p>

        {/* Romantic quote */}
        <blockquote className="mb-10">
          <p
            className="font-elegant italic text-xl sm:text-2xl"
            style={{ color: "oklch(0.72 0.1 65 / 0.7)" }}
          >
            "Two hearts, one forever."
          </p>
        </blockquote>

        {/* Ornamental divider */}
        <div
          className="text-2xl tracking-widest mb-10"
          style={{ color: "oklch(0.72 0.1 65 / 0.25)" }}
        >
          ❧ ✦ ❧
        </div>

        {/* Attribution */}
        <p
          className="font-body text-xs"
          style={{ color: "oklch(0.45 0.01 45)" }}
        >
          © {currentYear}. Built with{" "}
          <span style={{ color: "oklch(0.72 0.1 65 / 0.6)" }}>
            <span aria-label="love" role="img">
              ♥
            </span>
          </span>{" "}
          using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors"
            style={{ color: "oklch(0.65 0.04 50)" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
