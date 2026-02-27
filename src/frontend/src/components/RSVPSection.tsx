import { useState, useEffect, useRef } from "react";
import { Check, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmitRSVP } from "@/hooks/useQueries";

interface FormData {
  attending: "yes" | "no" | null;
  mealPreference: string;
  message: string;
}

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
}

function Confetti() {
  const pieces: ConfettiPiece[] = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: [
      "oklch(0.78 0.07 65)",
      "oklch(0.92 0.04 15)",
      "oklch(0.72 0.1 65)",
      "oklch(0.82 0.05 20)",
      "oklch(0.65 0.08 55)",
    ][Math.floor(Math.random() * 5)],
    delay: Math.random() * 2,
    duration: 2.5 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 w-2 h-2 rounded-sm"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animation: `confettiFall ${piece.duration}s ease-in ${piece.delay}s forwards`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

export function RSVPSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    attending: null,
    mealPreference: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const submitRSVP = useSubmitRSVP();

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
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.attending) {
      newErrors.attending = "Please let us know if you'll attend.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await submitRSVP.mutateAsync({
        name: "",
        email: "",
        attending: formData.attending === "yes",
        mealPreference: formData.mealPreference || "None",
        message: formData.message.trim(),
      });

      setSubmitted(true);
      if (formData.attending === "yes") {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch {
      setErrors({ attending: "Something went wrong. Please try again." });
    }
  };

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, oklch(0.98 0.008 60) 0%, oklch(0.96 0.018 30) 100%)",
      }}
    >
      {/* Background ornament */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, oklch(0.72 0.1 65) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-12 reveal">
          <p className="font-elegant italic text-gold text-lg tracking-widest mb-3">
            Join us
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal mb-4">
            RSVP
          </h2>
          <p className="font-body text-charcoal/50 tracking-widest text-sm uppercase">
            Kindly respond by March 15, 2026
          </p>
          <div className="ornament-divider mt-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold/70">
              <path d="M12 2C12 2 10 6 6 6C6 6 10 8 12 12C14 8 18 6 18 6C14 6 12 2 12 2Z" fill="currentColor" />
              <path d="M12 22C12 22 10 18 6 18C6 18 10 16 12 12C14 16 18 18 18 18C14 18 12 22 12 22Z" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Form card */}
        <div
          className="reveal relative p-8 lg:p-10"
          style={{
            background: "oklch(0.998 0.003 60)",
            boxShadow: "0 8px 60px oklch(0.22 0.018 45 / 0.1), inset 0 0 0 1px oklch(0.72 0.1 65 / 0.2)",
          }}
        >
          {/* Corner flourishes */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/40" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/40" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/40" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/40" />

          {submitted ? (
            <ThankYouMessage attending={formData.attending === "yes"} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Attendance */}
              <div className="space-y-3">
                <p className="font-body text-xs tracking-widest uppercase text-charcoal/60">
                  Will you attend? *
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {(["yes", "no"] as const).map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, attending: val }));
                        if (errors.attending) setErrors((prev) => ({ ...prev, attending: undefined }));
                      }}
                      className={`py-4 px-4 font-body text-xs tracking-widest uppercase transition-all duration-200 border ${
                        formData.attending === val
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-gold/20 text-charcoal/50 hover:border-gold/40 hover:text-charcoal/70"
                      }`}
                    >
                      {val === "yes" ? "Joyfully Accept" : "Regretfully Decline"}
                    </button>
                  ))}
                </div>
                {errors.attending && (
                  <p className="font-body text-xs text-destructive">{errors.attending}</p>
                )}
              </div>

              {/* Meal preference - only when attending */}
              {formData.attending === "yes" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="meal-preference"
                    className="font-body text-xs tracking-widest uppercase text-charcoal/60"
                  >
                    Meal Preference
                  </Label>
                  <Select
                    value={formData.mealPreference}
                    onValueChange={(val) => setFormData((prev) => ({ ...prev, mealPreference: val }))}
                  >
                    <SelectTrigger
                      id="meal-preference"
                      className="border-gold/20 focus:border-gold/50 bg-ivory rounded-none font-elegant text-base"
                    >
                      <SelectValue placeholder="Select a meal preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">No preference</SelectItem>
                      <SelectItem value="Meat">Meat</SelectItem>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Message */}
              <div className="space-y-2">
                <Label
                  htmlFor="rsvp-message"
                  className="font-body text-xs tracking-widest uppercase text-charcoal/60"
                >
                  Message to the Couple{" "}
                  <span className="text-charcoal/30 normal-case tracking-normal">(optional)</span>
                </Label>
                <Textarea
                  id="rsvp-message"
                  placeholder="Share your well wishes or any notes..."
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="font-elegant text-base border-gold/20 focus:border-gold/50 bg-ivory placeholder:text-charcoal/25 rounded-none resize-none h-28"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitRSVP.isPending}
                className="w-full py-4 font-body text-xs tracking-[0.3em] uppercase transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, oklch(0.45 0.08 35), oklch(0.38 0.07 40))",
                  color: "oklch(0.98 0.008 60)",
                }}
              >
                {submitRSVP.isPending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send RSVP"
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Confetti overlay */}
      {showConfetti && <Confetti />}
    </section>
  );
}

function ThankYouMessage({ attending }: { attending: boolean }) {
  return (
    <div className="text-center py-8 space-y-6">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
        style={{
          background: "linear-gradient(135deg, oklch(0.78 0.07 65 / 0.2), oklch(0.62 0.09 50 / 0.15))",
          border: "1px solid oklch(0.72 0.1 65 / 0.5)",
        }}
      >
        <Check size={28} className="text-gold" />
      </div>

      <div>
        <h3 className="font-display text-3xl text-charcoal mb-3">
          {attending ? "We can't wait to see you!" : "We'll miss you dearly."}
        </h3>
        <p className="font-elegant text-lg text-charcoal/60 leading-relaxed">
          {attending
            ? "Thank you! Your RSVP has been received. We're so excited to celebrate this special day with you."
            : "Thank you for letting us know. You'll be in our hearts on our special day."}
        </p>
      </div>

      <div className="text-gold/50 text-3xl tracking-widest">
        ❧ ✦ ❧
      </div>

      <p className="font-body text-xs tracking-widest uppercase text-charcoal/30">
        Bhavana &amp; Ajay · March 25, 2026
      </p>
    </div>
  );
}
