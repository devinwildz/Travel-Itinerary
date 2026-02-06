'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, Phone, User, MessageSquare } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { inquirySchema } from '@/lib/schemas';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PackageInquiryModal({ open, onOpenChange, packageName }) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(inquirySchema)
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        console.log("Form Data", data);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSubmitted(true);

        setTimeout(() => {
            reset();
            setSubmitted(false);
            onOpenChange(false);
            setIsSubmitting(false);
        }, 1500);
    };

    const handleClose = () => {
        if (!isSubmitting) {
            reset();
            setSubmitted(false);
            onOpenChange(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="w-full max-w-md rounded-xl bg-card border border-border/50 shadow-2xl">

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-border/50">
                                <div>
                                    <h2 className="text-xl font-bold text-foreground">
                                        Inquire About Package
                                    </h2>
                                    <p className="text-sm text-muted-foreground">{packageName}</p>
                                </div>

                                <button
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    className="p-1 hover:bg-accent/10 cursor-pointer rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">

                                {submitted ? (
                                    <div className="text-center py-6">
                                        <h3 className="text-lg font-semibold">Thank You!</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We received your inquiry.
                                        </p>
                                    </div>
                                ) : (

                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                        {/* Name */}
                                        <div>
                                            <Label className="mb-2 flex items-center gap-2">
                                                <User className="w-4 h-4 text-accent" />
                                                Full Name
                                            </Label>

                                            <Input
                                                {...register("name")}
                                                placeholder="John Doe"
                                            />

                                            {errors.name && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <Label className="mb-2 flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-accent" />
                                                Email
                                            </Label>

                                            <Input
                                                {...register("email")}
                                                placeholder="john@example.com"
                                            />

                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <Label className="mb-2 flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-accent" />
                                                Phone
                                            </Label>

                                            <Input
                                                {...register("phone")}
                                                placeholder="+1 555 000 000"
                                            />

                                            {errors.phone && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <Label className="mb-2 flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4 text-accent" />
                                                Message
                                            </Label>

                                            <textarea
                                                {...register("message")}
                                                rows={3}
                                                className="w-full px-3 py-2 rounded-lg bg-input border border-border/50 text-sm resize-none"
                                            />

                                            {errors.message && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.message.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-2 rounded-lg bg-linear-to-r from-primary to-purple-600 text-white cursor-pointer font-semibold text-sm"
                                        >
                                            {isSubmitting ? "Sending..." : "Send Inquiry"}
                                        </motion.button>

                                    </form>
                                )}

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
