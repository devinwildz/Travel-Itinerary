'use client';

import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { MapPin, Calendar, DollarSign, Users, Sparkles, AlertCircle } from 'lucide-react';
import { generateItinerary } from '@/app/actions/generate-itinerary';

export default function ItineraryForm({ onSubmit }) {

  const { user } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    budget: 'medium',
    travelType: 'solo',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.destination || !formData.duration) return;

    if (!user) {
      router.push('/login');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateItinerary(formData);
      if (result.success && result.data) {

        // Save to Supabase
        if (user) {
          const { data, error } = await supabase.from("trips").insert({
            user_id: user.id,
            title: `${formData.destination} Trip`,
            destination: formData.destination,
            duration: Number(formData.duration),
            budget: formData.budget,
            travel_type: formData.travelType,
            ai_data: result.data, // JSON
          }).select().single();

          if (data?.id) {
            onSubmit(data.id);
          }



          if (error) {
            console.error("Trip save error:", error);
          }
        }

        // onSubmit(result.data);
      } else {
        setError(result.error || 'Failed to generate itinerary');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center p-6 md:p-10"
    >
      <Card className="w-full max-w-2xl py-0 border-border/50 bg-linear-to-br from-card to-slate-900/50 backdrop-blur-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="px-4 py-8 md:p-12">
          <h2 className="text-2xl text-center md:text-left font-bold mb-8 text-foreground">Create Your Itinerary</h2>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/50 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Destination */}
          <div className="mb-6">
            <Label htmlFor="destination" className="text-foreground mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              Destination
            </Label>
            <Input
              id="destination"
              placeholder="Enter your destination (e.g., Paris, Tokyo, New York)"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
            />
          </div>

          {/* Trip Duration */}
          <div className="mb-6">
            <Label htmlFor="duration" className="text-foreground mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              Trip Duration (days)
            </Label>
            <Input
              id="duration"
              type="number"
              placeholder="Enter duration days"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
              min="1"
              max="30"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Budget */}
            <div>
              <Label htmlFor="budget" className="text-foreground mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-accent" />
                Budget
              </Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                <SelectTrigger className="bg-input border-border/50 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="low">Budget-Friendly</SelectItem>
                  <SelectItem value="medium">Moderate</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Travel Type */}
            <div>
              <Label htmlFor="travelType" className="text-foreground mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                Travel Type
              </Label>
              <Select
                value={formData.travelType}
                onValueChange={(value) => setFormData({ ...formData, travelType: value })}
              >
                <SelectTrigger className="bg-input border-border/50 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="solo">Solo</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="friends">Friends</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || !formData.destination || !formData.duration}
            className="w-full py-3 px-6 rounded-lg bg-linear-to-r from-primary to-purple-600 text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all disabled:cursor-not-allowed"
            type="submit"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 text-white border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-white" />
                <span className="text-white">Generate Itinerary</span>
              </>
            )}
          </motion.button>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Powered by advanced AI • Instant results • No account required
          </p>
        </form>
      </Card>
    </motion.div>
  );
}