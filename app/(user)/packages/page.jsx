'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { Card } from '@/components/ui/card';
import PackageCard from '@/components/PackageCard';
import PackageInquiryModal from '@/components/PackageInquiryModal'

export default function PackagesPage() {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [inquiryOpen, setInquiryOpen] = useState(false);

    const packages = [
        {
            id: 1,
            name: 'Andaman Tour',
            destination: 'Andaman & Nicobar Island',
            duration: '7 Days',
            groupSize: '4-6 people',
            price: '₹1,299',
            rating: 4.8,
            reviews: 234,
            description:
                `The Andaman Islands are an Indian archipelago in the Bay of Bengal. These roughly 300 islands are known for their palm-lined, white-sand beaches, mangroves, and tropical rainforests.`,
            highlights: ['Cellular Jail National Memorial', 'Rajiv Gandhi Water Sports Complex', 'North Bay Beach', 'Water sports'],
            image: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
        },
        {
            id: 2,
            name: 'Kerela Tour',
            destination: 'Kerela',
            duration: '10 Days',
            groupSize: '6-8 people',
            price: '₹1,899',
            rating: 4.9,
            reviews: 456,
            description:
                `Kerala, a state on India's tropical Malabar Coast, has nearly 600 km of Arabian Sea shoreline. This is famous for houseboats, palm-lined beaches, and backwaters.`,
            highlights: ['Alleppey', 'Kochi,', 'Munnar', 'Kovalam'],
            image: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
        },
        {
            id: 3,
            name: 'Shimla & Manali Tour',
            destination: 'Himachal Pradesh',
            duration: '8 Days',
            groupSize: '3-5 people',
            price: '₹1,599',
            rating: 4.7,
            reviews: 189,
            description:
                `Shimla & Manali are two popular tourist destinations in Himachal Pradesh. You can enjoy your winter and summer vacation with the family on Shimla and Manali trip.`,
            highlights: ['The Ridge', ' Kufri', 'Manikaran Gurudwara', 'Jogini Waterfall '],
            image: 'bg-gradient-to-br from-green-500/20 to-blue-500/20',
        },
        {
            id: 4,
            name: 'Goa Tour',
            destination: 'Goa, India',
            duration: '5 Days',
            groupSize: '2-4 people',
            price: '₹899',
            rating: 4.6,
            reviews: 312,
            description:
                `Goa is a state in western India with coastlines stretching along the Arabian Sea. Goa is famous for its fantastic beaches and its culture, you will feel the totally different culture in goa`,
            highlights: ['Fontainhas,', 'Reis Magos Fort,', 'Candolim Beach', 'Beaches'],
            image: 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20',
        },
        {
            id: 5,
            name: 'Jaipur Tour',
            destination: 'Rajasthan',
            duration: '9 Days',
            groupSize: '4-7 people',
            price: '₹1,699',
            rating: 4.9,
            reviews: 523,
            description:
                `Jaipur is the capital of India’s Rajasthan state.Jaipur, popularly known as the Pink City of India, The city is the mixture and combination of Indian culture and modern experiences.`,
            highlights: ['City Palace', 'Albert Hall Museum', 'Nahargarh Fort', 'Galta Ji'],
            image: 'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
        },
        {
            id: 6,
            name: 'Udaipur Tour',
            destination: 'Rajasthan',
            duration: '10 Days',
            groupSize: '6-10 people',
            price: '₹2,299',
            rating: 4.8,
            reviews: 267,
            description:
                `Udaipur, formerly the capital of the Mewar Kingdom, is a city in the western Indian state of Rajasthan. Udaipur is well known for handicrafts such as paintings, marble articles, silver arts and terracotta.`,
            highlights: ['City Palace', 'Lake Garden Palace', 'Bagore Ki Haveli', 'Vintage Car Museum'],
            image: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
        },
        
    ];

    const handleInquiry = useCallback((packageData) => {
        setSelectedPackage(packageData);
        setInquiryOpen(true);
    }, []);


    return (
        <main className="min-h-screen bg-linear-to-br from-background via-background to-slate-900 py-12 md:py-20 px-4">

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
                            <Plane className="w-40 h-40 text-accent absolute top-1/2 right-8 -translate-y-1/2" />
                        </div>

                        <div className="p-8 md:p-12 relative z-10">
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
                    {packages.map((pkg, index) => (
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
