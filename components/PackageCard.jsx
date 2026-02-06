'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Clock, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';

function PackageCard({ pkg, index, onInquiry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <Card className="border-border/50 bg-linear-to-br from-card to-slate-900/30 backdrop-blur overflow-hidden hover:border-accent/50 transition-all group h-full flex flex-col">
        
        {/* Image */}
        <div className={`${pkg.image} h-40 relative overflow-hidden`}>
          <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">

          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-2xl font-semibold text-foreground">
                {pkg.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {pkg.destination}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 mr-1 h-4 ${
                    i < Math.floor(pkg.rating)
                      ? 'fill-accent text-accent'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              {pkg.rating} ({pkg.reviews} reviews)
            </span>
          </div>

          <p className="text-md text-muted-foreground mb-4 flex-1">
            {pkg.description}
          </p>

          {/* Details */}
          <div className="space-y-2 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              {pkg.duration}
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              {pkg.groupSize}
            </div>
          </div>

          {/* Price + Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="text-xl font-bold text-accent flex items-center gap-1">
              {pkg.price}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onInquiry(pkg)}
              className="px-3 py-2 rounded-xl cursor-pointer bg-linear-to-r from-primary to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default memo(PackageCard);
