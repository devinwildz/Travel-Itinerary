'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ResultsSection from '@/components/results-section';
import EmailModal from '@/components/email-modal';

export default function TripDetailsPage() {
    const params = useParams();
    const tripId = params.id;

    const [itineraryData, setItineraryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (tripId) {
            loadSavedTrip(tripId);
        }
    }, [tripId]);

    const loadSavedTrip = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('trips')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            if (data && data.ai_data) {
                setItineraryData(data.ai_data);
            } else {
                setError('No itinerary data found');
            }
        } catch (error) {
            console.error('Error loading trip:', error);
            setError('Failed to load trip. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading your trip...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-destructive mb-4">{error}</p>
                    <a href="/trip-planner" className="text-accent underline">
                        Go back to planner
                    </a>
                </div>
            </div>
        );
    }

    if (!itineraryData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">No trip data available</p>
            </div>
        );
    }

    return (
        <>
            <ResultsSection data={itineraryData} />
            <EmailModal open={false} onOpenChange={() => { }} />
        </>
    );
}