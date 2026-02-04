'use client';

import React from "react"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Check } from 'lucide-react';

export default function EmailModal({ open, onOpenChange }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      setTimeout(() => {
        onOpenChange(false);
        setEmail('');
        setSubmitted(false);
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <div className="relative bg-linear-to-br from-card to-slate-900/50 border border-border/50 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 p-2 hover:bg-border/50 rounded-lg transition-colors z-10"
              >
                <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </button>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h2 className="text-2xl font-bold text-foreground mb-3">Get Your Premium Itinerary</h2>
                      <p className="text-muted-foreground mb-6">
                        Unlock your personalized travel itinerary! Enter your email to receive a premium PDF with day-by-day plans, exclusive hotel booking discounts, hidden gems, and restaurant recommendations tailored to your budget.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="email" className="text-foreground mb-2 block">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading || !email}
                          className="w-full bg-linear-to-r from-primary to-purple-600 text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                              Sending...
                            </>
                          ) : (
                            'Download PDF Itinerary'
                          )}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          We'll send your itinerary PDF and exclusive travel deals. No spam, unsubscribe anytime.
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-16 h-16 rounded-full bg-linear-to-r from-primary to-accent flex items-center justify-center mx-auto mb-4"
                      >
                        <Check className="w-8 h-8 text-background" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Email Confirmed!</h3>
                      <p className="text-muted-foreground mb-4">
                        Check your inbox for your premium itinerary PDF and exclusive travel deals.
                      </p>
                      <p className="text-sm text-accent">Your adventure awaits! ✈️</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}