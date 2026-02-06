"use client"
import HeroSection from '@/components/hero-section';
import ItineraryForm from '@/components/itinerary-form';
import { useRouter } from 'next/navigation';


export default function Home() {

  const router = useRouter();

  const handleTripCreated = (tripId) => {
    if (!tripId) return;
    router.push(`/trip/${tripId}`);
  };

  return (
    <main className="relative min-h-screen bg-linear-to-br from-background via-background to-slate-900">
      {/* Grid background effect */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="relative inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-tr from-cyan-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      <HeroSection />

      <ItineraryForm onSubmit={handleTripCreated} />

    </main>
  );
}