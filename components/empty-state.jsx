'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, BookOpen, Heart, Compass } from 'lucide-react';

const iconMap = {
    MapPin,
    BookOpen,
    Heart,
    Compass,
};

export function EmptyState({ icon = 'MapPin', title, description, actionLabel, actionHref }) {
    const IconComponent = iconMap[icon] || MapPin;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center pt-10"
        >
            <Card className="w-full max-w-md border-border/50 bg-gradient-to-br from-card to-primary/5 backdrop-blur p-12 text-center">
                <div className="flex justify-center ">
                    <div className="p-4 rounded-lg bg-primary/10">
                        <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground ">{title}</h3>
                <p className="text-muted-foreground">{description}</p>

                {actionHref && actionLabel && (
                    <Link
                        href={actionHref}
                        className="inline-block cursor-pointer px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
                    >
                        {actionLabel}
                    </Link>
                )}
            </Card>
        </motion.div>
    );
}
