'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, DollarSign, Mail, Trash2 } from 'lucide-react';

export default function TripCard({ trip, onDelete }) {
    const router = useRouter();

    const formatDate = (dateString) => {
        if (!dateString) return 'Recently';

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Recently';

            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch (error) {
            return 'Recently';
        }
    };

    const handleCardClick = () => {
        // Clean URL with dynamic route
        router.push(`/trip/${trip.id}`);
    };

    const createdDate = formatDate(trip.created_at);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="border-border/50 bg-linear-to-br from-card to-slate-900/30 backdrop-blur overflow-hidden hover:border-accent/50 transition-all cursor-pointer group">
                <div className="p-4">
                    <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="flex-1" onClick={handleCardClick}>
                            <h3 className="text-xl capitalize font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                                {trip.destination || trip.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {trip.ai_data?.overview || 'Click to view your personalized itinerary'}
                            </p>
                        </div>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(trip.id);
                            }}
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>

                    <div onClick={handleCardClick} className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/30">
                        {trip.destination && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-accent shrink-0" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Location</p>
                                    <p className="text-sm font-medium capitalize text-foreground">{trip.destination}</p>
                                </div>
                            </div>
                        )}

                        {trip.duration && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-accent shrink-0" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Duration</p>
                                    <p className="text-sm font-medium text-foreground">{trip.duration} days</p>
                                </div>
                            </div>
                        )}

                        {trip.budget && (
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-accent shrink-0" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Budget</p>
                                    <p className="text-sm font-medium text-foreground capitalize">{trip.budget}</p>
                                </div>
                            </div>
                        )}

                        {trip.travel_type && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-accent shrink-0" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Type</p>
                                    <p className="text-sm font-medium text-foreground capitalize">{trip.travel_type}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">Created {createdDate}</p>
                </div>
            </Card>
        </motion.div>
    );
}