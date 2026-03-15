"use client";

import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { generateItinerary } from "@/app/actions/generate-itinerary";

export default function ItineraryForm({ onSubmit }) {
  const { user } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const suggestionAbortRef = useRef(null);
  const suggestionTimerRef = useRef(null);
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    budget: "medium",
    travelType: "solo",
  });

  useEffect(() => {
    const query = formData.destination.trim();
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveSuggestion(-1);
      if (suggestionAbortRef.current) {
        suggestionAbortRef.current.abort();
        suggestionAbortRef.current = null;
      }
      if (suggestionTimerRef.current) {
        clearTimeout(suggestionTimerRef.current);
        suggestionTimerRef.current = null;
      }
      return undefined;
    }

    if (suggestionTimerRef.current) {
      clearTimeout(suggestionTimerRef.current);
    }

    suggestionTimerRef.current = setTimeout(async () => {
      if (suggestionAbortRef.current) {
        suggestionAbortRef.current.abort();
      }

      const controller = new AbortController();
      suggestionAbortRef.current = controller;
      setIsSuggesting(true);

      try {
        const params = new URLSearchParams({
          format: "json",
          addressdetails: "1",
          limit: "6",
          countrycodes: "in",
          q: query,
        });
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params.toString()}`,
          {
            signal: controller.signal,
            headers: {
              "Accept-Language": "en",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        const normalized = Array.isArray(data)
          ? data.map((item) => ({
              id: item.place_id,
              label: item.display_name,
              lat: item.lat,
              lon: item.lon,
            }))
          : [];
        setSuggestions(normalized);
        setShowSuggestions(true);
        setActiveSuggestion(-1);
      } catch (err) {
        if (err?.name !== "AbortError") {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } finally {
        setIsSuggesting(false);
      }
    }, 350);

    return () => {
      if (suggestionTimerRef.current) {
        clearTimeout(suggestionTimerRef.current);
        suggestionTimerRef.current = null;
      }
    };
  }, [formData.destination]);

  useEffect(() => {
    return () => {
      if (suggestionAbortRef.current) {
        suggestionAbortRef.current.abort();
      }
      if (suggestionTimerRef.current) {
        clearTimeout(suggestionTimerRef.current);
      }
    };
  }, []);

  const applySuggestion = (suggestion) => {
    if (!suggestion) return;
    setFormData((prev) => ({ ...prev, destination: suggestion.label }));
    setShowSuggestions(false);
    setSuggestions([]);
    setActiveSuggestion(-1);
  };

  const handleDestinationKeyDown = (event) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestion((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestion((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (event.key === "Enter") {
      if (activeSuggestion >= 0) {
        event.preventDefault();
        applySuggestion(suggestions[activeSuggestion]);
      }
    } else if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.destination || !formData.duration) return;

    if (!user) {
      router.push("/login");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateItinerary(formData);
      if (result.success && result.data) {
        // Save to Supabase
        if (user) {
          const { data, error } = await supabase
            .from("trips")
            .insert({
              user_id: user.id,
              title: `${formData.destination} Trip`,
              destination: formData.destination,
              duration: Number(formData.duration),
              budget: formData.budget,
              travel_type: formData.travelType,
              ai_data: result.data, // JSON
            })
            .select()
            .single();

          if (data?.id) {
            onSubmit(data.id);
          }

          if (error) {
            console.error("Trip save error:", error);
          }
        }

        // onSubmit(result.data);
      } else {
        setError(result.error || "Failed to generate itinerary");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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
      <Card className="w-full max-w-2xl py-0 border-border/50 bg-gradient-to-br from-card to-primary/5 backdrop-blur-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="px-4 py-8 md:p-12">
          <h2 className="text-2xl text-center md:text-left font-bold mb-8 text-foreground">
            Generate Your AI Travel Plan
          </h2>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/50 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Destination */}
          <div className="mb-6">
            <Label
              htmlFor="destination"
              className="text-foreground mb-2 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-primary" />
              Destination
            </Label>
            <div className="relative">
              <Input
                id="destination"
                placeholder="Enter your destination (e.g., Paris, Tokyo, New York)"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 120);
                }}
                onKeyDown={handleDestinationKeyDown}
                className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                autoComplete="off"
                role="combobox"
                aria-expanded={showSuggestions}
                aria-controls="destination-suggestions"
                aria-activedescendant={
                  activeSuggestion >= 0
                    ? `destination-suggestion-${activeSuggestion}`
                    : undefined
                }
              />
              {isSuggesting && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  Searching...
                </div>
              )}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  id="destination-suggestions"
                  className="absolute z-20 mt-2 w-full rounded-lg border border-border/60 bg-card/95 shadow-xl backdrop-blur-xl max-h-64 overflow-auto"
                  role="listbox"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion.id}
                      id={`destination-suggestion-${index}`}
                      type="button"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        applySuggestion(suggestion);
                      }}
                      onMouseEnter={() => setActiveSuggestion(index)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        index === activeSuggestion
                          ? "bg-primary/15 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      }`}
                      role="option"
                      aria-selected={index === activeSuggestion}
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Trip Duration */}
          <div className="mb-6">
            <Label
              htmlFor="duration"
              className="text-foreground mb-2 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-primary" />
              Trip Duration (days)
            </Label>
            <Input
              id="duration"
              type="number"
              placeholder="Enter duration days"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              min="1"
              max="30"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Budget */}
            <div>
              <Label
                htmlFor="budget"
                className="text-foreground mb-2 flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4 text-primary" />
                Budget
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) =>
                  setFormData({ ...formData, budget: value })
                }
              >
                <SelectTrigger className="bg-input border-border/50 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem
                    className="data-[highlighted]:bg-primary"
                    value="low"
                  >
                    Budget-Friendly
                  </SelectItem>
                  <SelectItem
                    className="data-[highlighted]:bg-primary"
                    value="medium"
                  >
                    Moderate
                  </SelectItem>
                  <SelectItem
                    className="data-[highlighted]:bg-primary"
                    value="luxury"
                  >
                    Luxury
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Travel Type */}
            <div>
              <Label
                htmlFor="travelType"
                className="text-foreground mb-2 flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-primary" />
                Travel Type
              </Label>
              <Select
                value={formData.travelType}
                onValueChange={(value) =>
                  setFormData({ ...formData, travelType: value })
                }
              >
                <SelectTrigger className="bg-input border-border/50 text-foreground focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border backdrop-blur-xl">
                  <SelectItem
                    className="data-[highlighted]:bg-primary"
                    value="solo"
                  >
                    Solo
                  </SelectItem>
                  <SelectItem
                    className="data-[highlighted]:bg-primary"
                    value="couple"
                  >
                    Couple
                  </SelectItem>
                  <SelectItem
                    className="data-[highlighted]:bg-primary"
                    value="family"
                  >
                    Family
                  </SelectItem>
                  <SelectItem
                    className="data-[highlighted]:bg-primary"
                    value="friends"
                  >
                    Friends
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || !formData.destination || !formData.duration}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all disabled:cursor-not-allowed"
            type="submit"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 text-foreground border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
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
