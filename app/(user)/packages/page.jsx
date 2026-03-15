'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { Card } from '@/components/ui/card';
import PackageCard from '@/components/PackageCard';
import PackageInquiryModal from '@/components/PackageInquiryModal';
import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

export default function PackagesPage() {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [inquiryOpen, setInquiryOpen] = useState(false);

    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('packages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            return data || [];
        },
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });

    const normalizedPackages = useMemo(
        () =>
            packages.map((pkg) => ({
                ...pkg,
                groupSize: pkg.group_size ?? pkg.groupSize,
                image: pkg.image_class ?? pkg.image,
            })),
        [packages]
    );

    const handleInquiry = useCallback((packageData) => {
        setSelectedPackage(packageData);
        setInquiryOpen(true);
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-12 md:py-20 px-6">
            {/* Background Grid */}
            <div className="fixed inset-0 -z-10 opacity-20">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(99,102,241,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(99,102,241,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            {/* Background Glow */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-tr from-cyan-500/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <Card className="border-border/50 bg-linear-to-r from-primary/20 via-accent/20 to-purple-600/20 backdrop-blur overflow-hidden relative">
                        <div className="absolute inset-0 opacity-30">
                            <Plane className="w-40 h-40 text-primary absolute top-1/2 right-8 -translate-y-1/2" />
                        </div>

                        <div className="p-4 md:p-12 relative z-10">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                Explore Our{' '}
                                <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Travel Packages
                                </span>
                            </h1>

                            <p className="text-lg text-muted-foreground max-w-2xl">
                                Discover curated travel packages designed to create unforgettable
                                memories. From tropical beaches to majestic mountains, we have
                                the perfect adventure waiting for you.
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Packages Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, i) => (
                              <div
                                  key={i}
                                  className="h-80 rounded-xl bg-muted animate-pulse"
                              />
                          ))
                        : normalizedPackages.map((pkg, index) => (
                              <PackageCard
                                  key={pkg.id}
                                  pkg={pkg}
                                  index={index}
                                  onInquiry={handleInquiry}
                              />
                          ))}
                </div>
            </div>

            {/* Inquiry Modal */}
            <PackageInquiryModal
                open={inquiryOpen}
                onOpenChange={setInquiryOpen}
                packageName={selectedPackage?.name}
            />
        </main>
    );
}
