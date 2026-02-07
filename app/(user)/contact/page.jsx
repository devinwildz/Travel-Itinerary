'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {

    const contactInfo = [
        {
            icon: Mail,
            label: 'Our Email',
            value: 'infotripinit@gmail.com',
            description: 'We reply within 24 hours',
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+91 98080 15801',
            description: 'Monday to Friday, 9AM-6PM',
        },
        {
            icon: MapPin,
            label: 'Location',
            value: '123 Travel Street',
            description: 'San Francisco, CA 94105',
        },
    ];

    return (
        <main className="min-h-screen bg-linear-to-br from-background via-background to-slate-900 py-12 md:py-20 px-6">

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Get in Touch</span>
                    </h1>
                </motion.div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {contactInfo.map((info, index) => {
                        const Icon = info.icon;

                        return (
                            <Card key={index} className="p-6 text-center">
                                <Icon className="mx-auto mb-3 text-accent" />
                                <h3 className="font-semibold">{info.label}</h3>
                                <p>{info.value}</p>
                                <p className="text-sm text-muted-foreground">
                                    {info.description}
                                </p>
                            </Card>
                        );
                    })}
                </div>

                {/* Form */}
                <ContactForm />

            </div>
        </main>
    );
}
