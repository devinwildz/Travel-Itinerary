'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Sparkles, Globe, Users, Zap } from 'lucide-react';
import Link from 'next/link';


const features = [
    {
        icon: Sparkles,
        title: 'AI-Powered Planning',
        description: 'Advanced AI algorithms analyze your preferences to create perfect itineraries.',
    },
    {
        icon: Globe,
        title: 'Global Coverage',
        description: 'Discover destinations worldwide with detailed local insights and recommendations.',
    },
    {
        icon: Users,
        title: 'Personalized Trips',
        description: 'Customized itineraries tailored to your travel style, budget, and interests.',
    },
    {
        icon: Zap,
        title: 'Instant Generation',
        description: 'Get your complete travel plan in seconds, not hours or days.',
    },
];


export default function AboutPage() {

    return (
        <main className="bg-background pt-20 px-4">
            <div className="max-w-4xl mx-auto ">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-white via-accent to-purple-400 bg-clip-text text-transparent mb-4">
                        About Tripinit
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Revolutionizing travel planning with artificial intelligence to create unforgettable journeys.
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-16"
                >
                    <Card className="border-border/50 bg-linear-to-br from-card to-slate-900/30 backdrop-blur p-6 md:p-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                            We believe travel should be effortless and personalized. Tripinit AI empowers travelers to explore the world with confidence by providing intelligent, data-driven itineraries that match their unique preferences and budget.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Whether you're a solo adventurer, a romantic couple, a family looking for memories, or friends seeking unforgettable experiences, our AI-powered platform creates the perfect travel companion for every journey.
                        </p>
                    </Card>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                >
                                    <Card className="border-border/50 bg-linear-to-br from-card to-slate-900/30 backdrop-blur p-6 hover:border-accent/50 transition-all group">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                                <Icon className="w-6 h-6 text-accent" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                                                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* How It Works Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-16"
                >
                    <Card className="border-border/50 bg-linear-to-br from-card to-slate-900/30 backdrop-blur p-8 md:p-6 lg:p-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4 lg:mb-8 text-center">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    step: '1',
                                    title: 'Tell Us Your Preferences',
                                    description: 'Enter your destination, duration, budget, and travel style.',
                                },
                                {
                                    step: '2',
                                    title: 'AI Creates Your Plan',
                                    description: 'Our advanced AI generates a personalized itinerary in seconds.',
                                },
                                {
                                    step: '3',
                                    title: 'Save and Explore',
                                    description: 'Save your trips and manage all your travel plans in one place.',
                                },
                            ].map((item, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-accent/20 text-accent text-xl font-bold flex items-center justify-center mx-auto mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center pb-16"
                >
                    <p className="text-lg text-muted-foreground mb-6">
                        Ready to plan your next adventure?
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 rounded-lg bg-linear-to-r from-primary to-purple-600  text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
                    >
                        Start Planning Now
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
