import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitMessage } from "@/hooks/useQueries";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FormData {
  name: string;
  message: string;
}

export function MessagesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({ name: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);

  const submitMessage = useSubmitMessage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(".reveal");
            for (const el of Array.from(reveals)) {
              el.classList.add("is-visible");
            }
          }
        }
      },
      { threshold: 0.05 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please write a message.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await submitMessage.mutateAsync({
        name: formData.name.trim(),
        message: formData.message.trim(),
      });

      setSubmitted(true);
    } catch {
      setErrors({ message: "Something went wrong. Please try again." });
    }
  };

  return (
    <section
      id="messages"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.98 0.008 60) 0%, oklch(0.96 0.018 30) 100%)",
      }}
    >
      {/* Background ornament */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, oklch(0.72 0.1 65) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-12 reveal">
          <p className="font-elegant italic text-gold text-lg tracking-widest mb-3">
            With love
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal mb-4">
            Leave a Message
          </h2>
          <p className="font-body text-charcoal/50 tracking-widest text-sm uppercase">
            Say something nice (they're getting married now).
          </p>
          <div className="ornament-divider mt-6">
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

        {/* Form card */}
        <div
          className="reveal relative p-8 lg:p-10"
          style={{
            background: "oklch(0.998 0.003 60)",
            boxShadow:
              "0 8px 60px oklch(0.22 0.018 45 / 0.1), inset 0 0 0 1px oklch(0.72 0.1 65 / 0.2)",
          }}
        >
          {/* Corner flourishes */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/40" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/40" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/40" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/40" />

          {submitted ? (
            <ThankYouMessage />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="msg-name"
                  className="font-body text-xs tracking-widest uppercase text-charcoal/60"
                >
                  Your Name *
                </Label>
                <Input
                  id="msg-name"
                  type="text"
                  placeholder="No incognito"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className="font-elegant text-base border-gold/20 focus:border-gold/50 bg-ivory placeholder:text-charcoal/25 rounded-none"
                />
                {errors.name && (
                  <p className="font-body text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label
                  htmlFor="msg-message"
                  className="font-body text-xs tracking-widest uppercase text-charcoal/60"
                >
                  Your Message *
                </Label>
                <Textarea
                  id="msg-message"
                  placeholder="We listen, we won't judge. Got a funny moment, inside joke, or chaotic memory with Bhavana or Ajay? Drop it here — The space is all yours"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }));
                    if (errors.message)
                      setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  className="font-elegant text-base border-gold/20 focus:border-gold/50 bg-ivory placeholder:text-charcoal/25 rounded-none resize-none h-36"
                />
                {errors.message && (
                  <p className="font-body text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitMessage.isPending}
                className="w-full py-4 font-body text-xs tracking-[0.3em] uppercase transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.45 0.08 35), oklch(0.38 0.07 40))",
                  color: "oklch(0.98 0.008 60)",
                }}
              >
                {submitMessage.isPending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Your Message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ThankYouMessage() {
  return (
    <div className="text-center py-8 space-y-6">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.78 0.07 65 / 0.2), oklch(0.62 0.09 50 / 0.15))",
          border: "1px solid oklch(0.72 0.1 65 / 0.5)",
        }}
      >
        <Check size={28} className="text-gold" />
      </div>

      <div>
        <h3 className="font-display text-3xl text-charcoal mb-3">
          Thank you so much!
        </h3>
        <p className="font-elegant text-lg text-charcoal/60 leading-relaxed">
          Your message has been received. Bhavana &amp; Ajay are grateful for
          your love and warm wishes.
        </p>
      </div>

      <div className="text-gold/50 text-3xl tracking-widest">❧ ✦ ❧</div>

      <p className="font-body text-xs tracking-widest uppercase text-charcoal/30">
        Bhavana &amp; Ajay · March 25, 2026
      </p>
    </div>
  );
}
