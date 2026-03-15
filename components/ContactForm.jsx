"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { inquirySchema } from "@/lib/schemas";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    console.log("Contact Form Data:", data);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitted(true);
    reset();

    setTimeout(() => {
      setSubmitted(false);
      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <Card className="bg-gradient-to-br from-card to-primary/5 backdrop-blur-xl px-4 py-8 md:px-12 md:py-12">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          Send us a Message
        </h2>
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/50 text-primary text-sm"
        >
          Thank you for your message! We'll get back to you soon.
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name + Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-2 block text-foreground ">Name</Label>
            <Input
              {...register("name")}
              placeholder="Your name"
              className=" border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
            {errors.name && (
              <p className="text-destructive text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2 block text-foreground ">Email</Label>
            <Input
              {...register("email")}
              placeholder="your.email@example.com"
              className=" border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <Label className="mb-2 block text-foreground ">Phone Number</Label>
          <Input
            {...register("phone")}
            placeholder="+1 (555) 000-0000"
            className=" border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
          />
        </div>

        {/* Message */}
        <div>
          <Label className="mb-2 block text-foreground ">Message</Label>
          <textarea
            {...register("message")}
            rows="6"
            placeholder="Send us a message"
            className="w-full px-4 py-3 rounded-lg border border-border/50 text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />

          {errors.message && (
            <p className="text-destructive text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          type="submit"
          className="w-full py-3 px-6 cursor-pointer rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </Card>
  );
}
