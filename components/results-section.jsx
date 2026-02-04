'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  MapPin,
  Clock,
  DollarSign,
  Landmark,
  Hotel,
  UtensilsCrossed,
  Calendar,
  Star,
  Ticket,
  Sun,
  Moon,
  Sunset,
  Wifi,
  Coffee,
  Waves,
  ChefHat,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  IndianRupee,
} from 'lucide-react';
import Image from 'next/image';
import useTravelImages from '@/hooks/useTravelImages';

// Helpers
const parseCost = (str = '') => parseInt(str.replace(/\D/g, '')) || 0;
const percent = (v, t) => (t ? Math.round((v / t) * 100) : 0);

const getTimeIcon = (time) => {
  if (time?.toLowerCase().includes('morning')) return Sun;
  if (time?.toLowerCase().includes('evening')) return Sunset;
  return Moon;
};

export default function ResultsSection({ data }) {
  const images = useTravelImages(data?.destination);
  console.log(images)

  const safe = {
    ...data,
    days: data?.days || [],
    topPlaces: data?.topPlaces || [],
    hotels: data?.hotels || [],
    restaurants: data?.restaurants || [],
    tips: data?.tips || [],
    costBreakdown: data?.costBreakdown || {},
  };

  return (
    <section className="min-h-screen py-16 px-4 bg-linear-to-b from-background to-slate-900">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm text-accent mb-4">
            <TrendingUp size={16} />
            <span>AI-Powered Travel Plan</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {safe.destination} Travel Blueprint
          </h1>

          <div className="flex justify-center flex-wrap gap-4">
            <Badge variant="outline" className="px-4 py-2 text-base">
              <MapPin size={18} className="mr-2" />
              {safe.destination}
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base">
              <Clock size={18} className="mr-2" />
              {safe.duration} Days
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base">
              <IndianRupee size={18} className="mr-2" />
              {safe.budget} Budget
            </Badge>
          </div>
        </motion.div>

        {/* GALLERY */}
        {images && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                <Landmark size={20} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold">Destination Gallery</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.slice(0, 6).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-xl overflow-hidden border border-border/50 shadow-lg group cursor-pointer"
                >
                  <Image
                    src={img}
                    alt={`${safe.destination} ${i + 1}`}
                    width={400}
                    height={300}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TOP PLACES */}
        {safe.topPlaces.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                <Star size={20} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold">Top Places to Visit</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safe.topPlaces.map((p, i) => {
                const TimeIcon = getTimeIcon(p.bestTime);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-xl transition-shadow border-border/50 bg-linear-to-br from-card to-slate-900/30 backdrop-blur h-full">
                      <div className="flex items-start gap-3 mb-3">
                        <Landmark size={20} className="text-accent mt-1" />
                        <h3 className="font-semibold text-lg flex-1">{p.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{p.whyVisit}</p>
                      <div className="flex flex-col items-start gap-2 justify-between text-sm">
                        <span className="flex items-center gap-2 text-accent">
                          <Ticket size={16} />
                          {p.entryFee}
                        </span>
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <TimeIcon size={16} />
                          {p.bestTime}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ITINERARY DAYS */}
        {safe.days.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                <Calendar size={20} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold">Day-By-Day Itinerary</h2>
            </div>

            <div className="space-y-6">
              {safe.days.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 border-border/50 gap-5 bg-linear-to-r from-card to-slate-900/30 backdrop-blur">
                    <div className="flex items-start gap-4 ">
                      <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center shrink-0">
                        <span className="font-bold text-white text-lg">D{d.day}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl">{d.title || `Day ${d.day}`}</h3>
                        {d.estimatedCost && (
                          <p className="text-sm text-accent mt-2 flex items-center gap-1">
                            <IndianRupee size={14} />
                            Estimated: {d.estimatedCost}
                          </p>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3 ml-16">
                      {(d.plan || []).map((activity, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm">
                          <ArrowRight size={16} className="text-accent mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* HOTELS & RESTAURANTS SIDE BY SIDE */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* HOTELS */}
          {safe.hotels.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Hotel size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Hotel Recommendations</h2>
              </div>

              <div className="space-y-4">
                {safe.hotels.map((h, i) => (
                  <Card
                    key={i}
                    className="p-5 border-border/50 bg-linear-to-br from-card to-slate-900/30 backdrop-blur hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between ">
                      <h3 className="font-semibold text-2xl">{h.name}</h3>
                      <Badge variant="secondary" className="text-md">
                        {h.type}
                      </Badge>
                    </div>
                    <p className="text-md text-muted-foreground flex items-center gap-2 ">
                      <MapPin size={18} />
                      {h.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-md">
                        <Star size={18} className="fill-yellow-500 text-yellow-500" />
                        {h.rating}
                      </span>
                      <span className="font-bold text-md text-accent flex items-center gap-2">
                        <IndianRupee size={18} />
                        {h.pricePerNight?.replace('₹', '')} / night
                      </span>
                    </div>
                    {h.amenities && (
                      <p className="text-md text-muted-foreground flex items-center gap-2">
                        <Wifi size={18} />
                        {h.amenities}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* RESTAURANTS */}
          {safe.restaurants.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                  <UtensilsCrossed size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Best Restaurants</h2>
              </div>

              <div className="space-y-4">
                {safe.restaurants.map((r, i) => (
                  <Card
                    key={i}
                    className="p-5 border-border/50 bg-linear-to-br from-card to-slate-900/30 backdrop-blur hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{r.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {r.cuisine}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mb-3">
                      <MapPin size={14} />
                      {r.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm">
                        <Star size={14} className="fill-yellow-500 text-yellow-500" />
                        {r.rating}
                      </span>
                      <span className="font-bold text-accent flex items-center gap-1">
                        <IndianRupee size={16} />
                        {r.priceForTwo?.replace('₹', '')} for two
                      </span>
                    </div>
                    {r.mustTry && (
                      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                        <ChefHat size={12} />
                        Must try: {r.mustTry}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* COST BREAKDOWN & TIPS */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* COST BREAKDOWN */}
          {safe.costBreakdown.total && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                  <DollarSign size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Budget Breakdown</h2>
              </div>

              <Card className="p-6 border-border/50 bg-linear-to-br from-card to-slate-900/30 backdrop-blur">
                <div className="space-y-5">
                  {['accommodation', 'food', 'activities', 'transport'].map((key) => {
                    const v = parseCost(safe.costBreakdown[key]);
                    const t = parseCost(safe.costBreakdown.total);
                    const p = percent(v, t);
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="capitalize font-medium">{key}</span>
                          <span className="text-accent font-semibold">{safe.costBreakdown[key]}</span>
                        </div>
                        <div className="h-2 bg-border rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${p}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-2 bg-linear-to-r from-primary to-purple-600 rounded-full"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{p}% of total budget</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total Estimated Cost</span>
                    <span className="text-3xl font-bold text-accent flex items-center gap-1">
                      <IndianRupee size={24} />
                      {safe.costBreakdown.total?.replace('₹', '')}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* TRAVEL TIPS */}
          {safe.tips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Lightbulb size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Pro Travel Tips</h2>
              </div>

              <Card className="p-6 border-border/50 bg-linear-to-br from-card to-slate-900/30 backdrop-blur">
                <ul className="space-y-4">
                  {safe.tips.map((tip, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex gap-3 text-sm"
                    >
                      <ArrowRight size={16} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}
        </div>

        {/* DOWNLOAD BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button className="px-10 py-7 text-lg flex gap-3 mx-auto bg-linear-to-r from-primary to-purple-600 hover:shadow-2xl hover:shadow-primary/50 transition-all">
            <Download size={22} />
            Download Complete Travel Guide PDF
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Includes booking links, maps, offline access & exclusive deals
          </p>
        </motion.div>
      </div>
    </section>
  );
}