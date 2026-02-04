'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ResultsSection from '@/components/results-section';
import ItineraryForm from '@/components/itinerary-form';
import EmailModal from '@/components/email-modal';

export default function TripPlannerPage() {
  const [showResults, setShowResults] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);

  const handleFormSubmit = (data) => {
    setItineraryData(data);
    setShowResults(true);
    setTimeout(() => setShowEmailModal(true), 1500);
  };

  return (
    <>
      {!showResults && (
        <section className="relative pt-20 md:pt-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-linear-to-r from-white via-accent to-purple-400 bg-clip-text text-transparent">
                AI Trip Planner
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Create your perfect itinerary with the power of artificial intelligence. Get personalized recommendations tailored to your preferences.
            </motion.p>
          </motion.div>
        </section>
      )}

      {!showResults ? (
        <div className="container mx-auto px-4 py-12 md:py-20">
          <ItineraryForm onSubmit={handleFormSubmit} />
        </div>
      ) : (
        <ResultsSection data={itineraryData} />
      )}

      <EmailModal open={showEmailModal} onOpenChange={setShowEmailModal} />
    </>
  );
}