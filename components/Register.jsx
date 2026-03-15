"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/lib/schemas";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";

import { MapPin, Mail, Lock } from "lucide-react";

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

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
      const supabase = createClient();

      const { error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (signUpError) throw signUpError;

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (signInError) throw signInError;

      // Hard reload to refresh cookies
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full border border-border/50 bg-gradient-to-br from-card to-primary/5 backdrop-blur shadow-xl">
          <Link
            href="/"
            className="flex justify-center items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <MapPin className="w-6 h-6 text-primary" />
            <span className="font-bold text-2xl text-foreground">Tripinit</span>
          </Link>

          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-xl font-bold text-foreground">
              Create an account
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to get started
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        <Mail className="w-4 h-4 text-primary" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
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
                    <FormItem className="relative">
                      <FormLabel className="text-muted-foreground">
                        <Lock className="w-4 h-4 text-primary" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="bg-input relative border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-10 -translate-y-1/2 text-muted-foreground hover:text-primary"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">
                    {error}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full cursor-pointer py-2 px-6 rounded-lg font-semibold bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-4"
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </motion.button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-semibold"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
