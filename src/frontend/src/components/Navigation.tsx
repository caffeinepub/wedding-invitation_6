import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  onAdminClick: () => void;
}

export function Navigation({ onAdminClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Our Story", id: "story" },
    { label: "Details", id: "details" },
    { label: "Gallery", id: "gallery" },
    { label: "RSVP", id: "rsvp" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/97 backdrop-blur-md shadow-elegant"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className={`font-display text-xl italic transition-colors ${
            scrolled ? "text-charcoal" : "text-white"
          }`}
        >
          Bhavana &amp; Ajay
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`font-body text-sm tracking-widest uppercase transition-colors hover:text-gold ${
                scrolled ? "text-charcoal/80" : "text-white/90"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onAdminClick}
            className={`font-body text-sm tracking-widest uppercase transition-colors hover:text-gold ${
              scrolled ? "text-charcoal/40" : "text-white/40"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`md:hidden p-2 transition-colors ${
            scrolled ? "text-charcoal" : "text-white"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory/97 backdrop-blur-md border-t border-gold/20 py-4">
          <div className="flex flex-col items-center gap-4 px-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-body text-sm tracking-widest uppercase text-charcoal/80 hover:text-gold transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                onAdminClick();
                setMobileMenuOpen(false);
              }}
              className="font-body text-sm tracking-widest uppercase text-charcoal/40 hover:text-gold transition-colors py-2"
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
