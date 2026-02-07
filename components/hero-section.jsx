'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative py-20 px-6 md:px-0 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm text-accent font-medium">AI-Powered Travel Planning</span>
        </motion.div>

        {/* Main headline with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="bg-linear-to-r from-white via-accent to-purple-400 bg-clip-text text-transparent">
            Plan Your Trip with AI in Seconds
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Generate personalized travel itineraries powered by advanced AI. Get day-wise plans, cost breakdowns, and exclusive discounts on hotels and bookings.
        </motion.p>

        {/* CTA Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="inline-block px-6 py-2 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm text-sm text-accent/80"
        >
          No credit card required. Get your itinerary instantly.
        </motion.div>
      </motion.div>
    </section>
  );
}
