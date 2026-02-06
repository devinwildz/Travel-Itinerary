'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import ResultsSection from '@/components/results-section';
import EmailModal from '@/components/email-modal';

export default function TripDetailsPage() {
    const { id: tripId } = useParams();
    const router = useRouter();
    const { user } = useAuth();

    const [itineraryData, setItineraryData] = useState(null);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (tripId) {
            loadSavedTrip(tripId);
        }
    }, [tripId, user]);

    const loadSavedTrip = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('trips')
                .select('ai_data')
                .eq('id', id)
                .eq('user_id', user.id)
                .single();

            if (error || !data) {
                throw new Error('Access denied');
            }

            setItineraryData(data.ai_data);

            // 🔥 UI ONLY — open modal after result loads
            setTimeout(() => setShowEmailModal(true), 800);
        } catch (err) {
            setError('You are not allowed to view this trip');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-destructive">{error}</p>
                <button
                    onClick={() => router.push('/my-trips')}
                    className="text-accent underline"
                >
                    Go to My Trips
                </button>
            </div>
        );
    }

    return (
        <>
            <ResultsSection data={itineraryData} />

            {/* 🧪 UI-ONLY EMAIL MODAL */}
            <EmailModal
                open={showEmailModal}
                onOpenChange={setShowEmailModal}
            />
        </>
    );
}
