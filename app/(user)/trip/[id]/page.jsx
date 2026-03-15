'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import ResultsSection from '@/components/results-section';
import EmailModal from '@/components/email-modal';
import { useQuery } from '@tanstack/react-query';

export default function TripDetailsPage() {
    const { id: tripId } = useParams();
    const router = useRouter();
    const { user } = useAuth();

    const [showEmailModal, setShowEmailModal] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
    }, [tripId, user]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['trip', tripId, user?.id],
        enabled: Boolean(tripId && user?.id),
        queryFn: async () => {
            const { data, error } = await supabase
                .from('trips')
                .select('ai_data')
                .eq('id', tripId)
                .eq('user_id', user.id)
                .single();

            if (error || !data) {
                throw new Error('Access denied');
            }

            return data.ai_data;
        },
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });

    const itineraryData = data ?? null;

    useEffect(() => {
        if (!itineraryData || !tripId) return;
        if (typeof window === 'undefined') return;

        const shouldOpen = sessionStorage.getItem('openEmailModalTripId');
        if (shouldOpen === tripId) {
            sessionStorage.removeItem('openEmailModalTripId');
            const timer = setTimeout(() => setShowEmailModal(true), 800);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [itineraryData, tripId]);

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
