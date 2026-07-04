import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { FloatingAI } from "./FloatingAI";
import { MobileBottomNav } from "./MobileBottomNav";
import { Navbar } from "./Navbar";

export function SiteLayout({
  children,
  showFooter = true,
}: {
  children: ReactNode;
  showFooter?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-blue/20">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pb-24 md:pb-0"
      >
        {children}
      </motion.main>
      {showFooter && <Footer />}
      <FloatingAI />
      <MobileBottomNav />
    </div>
  );
}