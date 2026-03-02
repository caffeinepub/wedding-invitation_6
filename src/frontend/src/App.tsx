import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { AdminPanel } from "./components/AdminPanel";
import { DetailsSection } from "./components/DetailsSection";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { MessagesSection } from "./components/MessagesSection";
import { Navigation } from "./components/Navigation";
import { StorySection } from "./components/StorySection";

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
        <MessagesSection />
      </main>

      <Footer />

      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}

      <Toaster />
    </>
  );
}
