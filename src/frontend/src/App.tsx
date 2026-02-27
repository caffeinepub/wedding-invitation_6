import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { StorySection } from "./components/StorySection";
import { DetailsSection } from "./components/DetailsSection";
import { GallerySection } from "./components/GallerySection";
import { RSVPSection } from "./components/RSVPSection";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if URL is /admin on load
  useEffect(() => {
    if (window.location.pathname === "/admin") {
      setShowAdmin(true);
    }
  }, []);

  // Update URL when admin opens/closes
  useEffect(() => {
    if (showAdmin) {
      window.history.pushState(null, "", "/admin");
    } else {
      if (window.location.pathname === "/admin") {
        window.history.pushState(null, "", "/");
      }
    }
  }, [showAdmin]);

  return (
    <>
      <Navigation onAdminClick={() => setShowAdmin(true)} />

      <main>
        <HeroSection />
        <StorySection />
        <DetailsSection />
        <GallerySection />
        <RSVPSection />
      </main>

      <Footer />

      {showAdmin && (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      )}

      <Toaster />
    </>
  );
}
