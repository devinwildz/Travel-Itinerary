'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TripCard from '@/components/trip-card';
import { EmptyState } from '@/components/empty-state';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function MyTripsContent() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // ✅ Fetch trips from DB
  useEffect(() => {
    if (!user) return;

    const fetchTrips = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setTrips(data);
      setLoading(false);
    };

    fetchTrips();
  }, [user]);

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
    setIsDetailsOpen(true);
  };

  // ✅ Delete trip from DB
  const handleDeleteTrip = async (tripId) => {
    if (!confirm('Are you sure you want to delete this trip?')) return;

    const { error } = await supabase.from('trips').delete().eq('id', tripId);

    if (!error) {
      setTrips(trips.filter((trip) => trip.id !== tripId));
      if (selectedTrip?.id === tripId) {
        setIsDetailsOpen(false);
        setSelectedTrip(null);
      }
    }
  };

  return (
    <main className="bg-background pt-21">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            My Trips
          </h1>
          <p className="text-muted-foreground">
            {trips.length} Trip saved
          </p>
        </motion.div>


        {/* Trips Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : trips.length === 0 ? (
          <EmptyState
            icon="MapPin"
            title="No trips yet"
            description="Start planning your next adventure by creating a new trip itinerary."
            actionLabel="Create Trip"
            actionHref="/trip-planner"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onSelect={handleSelectTrip}
                onDelete={handleDeleteTrip}
              />
            ))}
          </motion.div>
        )}



      </div>
    </main>
  );
}

