"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/lib/schemas";
import { motion } from 'framer-motion';
import { supabase } from "@/lib/supabaseClient";
import { MapPin, Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const form = useForm({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values) {
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) throw error;

            router.push("/");
            router.refresh();
        } catch (err) {
            setError(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <Card className="w-full max-w-md border bg-linear-to-br from-card to-slate-900/30 backdrop-blur shadow-xl">

                <Link href="/" className="flex justify-center items-center gap-2 hover:opacity-80 transition-opacity">
                    <MapPin className="w-6 h-6 text-accent" />
                    <span className="font-bold text-2xl text-foreground">TripPlanner AI</span>
                </Link>

                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-xl font-bold text-white">
                        Welcome back
                    </CardTitle>
                    <p className="text-sm text-zinc-400">
                        Sign in to your account
                    </p>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-300">
                                            <Mail className="w-4 h-4 text-accent" />
                                            Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-300">
                                            <Lock className="w-4 h-4 text-accent" />
                                            Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                autoComplete="current-password"
                                                className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Error */}
                            {error && (
                                <p className="text-sm text-red-400 bg-red-950/40 p-2 rounded-md">
                                    {error}
                                </p>
                            )}

                            {/* Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                                type="submit"
                                className="w-full cursor-pointer py-2 px-6 rounded-lg font-semibold bg-linear-to-r from-primary to-purple-600 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-slate-300 duration-200 mt-4"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </motion.button>

                        </form>
                    </Form>
                    <div className="mt-8 text-center">
                        <p className="text-muted-foreground text-sm">
                            Don’t have an account?{" "}
                            <Link href="/register" className="text-accent hover:underline font-semibold">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </motion.div >
    );
}
