'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const imagePresets = [
  {
    label: 'Ocean Blue',
    value: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
  },
  {
    label: 'Violet Glow',
    value: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
  },
  {
    label: 'Forest Chill',
    value: 'bg-gradient-to-br from-green-500/20 to-blue-500/20',
  },
  {
    label: 'Sunset Gold',
    value: 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20',
  },
  {
    label: 'Royal Indigo',
    value: 'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
  },
  {
    label: 'Amber Sand',
    value: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
  },
];

const defaultFormState = {
  name: '',
  destination: '',
  duration: '',
  groupSize: '',
  price: '',
  rating: '',
  reviews: '',
  description: '',
  highlights: '',
  imageClass: imagePresets[0].value,
};

export default function AdminPackageForm({
  onSubmit,
  isSubmitting,
  initialData,
  resetSignal,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(defaultFormState);

  const isEditing = Boolean(initialData?.id);

  const computedInitial = useMemo(() => {
    if (!initialData) return defaultFormState;
    return {
      name: initialData.name ?? '',
      destination: initialData.destination ?? '',
      duration: initialData.duration ?? '',
      groupSize: initialData.group_size ?? initialData.groupSize ?? '',
      price: initialData.price ?? '',
      rating: initialData.rating ?? '',
      reviews: initialData.reviews ?? '',
      description: initialData.description ?? '',
      highlights: Array.isArray(initialData.highlights)
        ? initialData.highlights.join(', ')
        : initialData.highlights ?? '',
      imageClass: initialData.image_class ?? imagePresets[0].value,
    };
  }, [initialData]);

  useEffect(() => {
    setFormData(computedInitial);
  }, [computedInitial]);

  useEffect(() => {
    if (!initialData) {
      setFormData(defaultFormState);
    }
  }, [resetSignal, initialData]);

  const handleChange = (key) => (event) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.destination) return;

    const highlights = formData.highlights
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    onSubmit({
      id: initialData?.id,
      name: formData.name.trim(),
      destination: formData.destination.trim(),
      duration: formData.duration.trim(),
      group_size: formData.groupSize.trim(),
      price: formData.price.trim(),
      rating: formData.rating ? Number(formData.rating) : null,
      reviews: formData.reviews ? Number(formData.reviews) : null,
      description: formData.description.trim(),
      highlights,
      image_class: formData.imageClass,
    });
  };

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur p-6">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Package' : 'Add New Package'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="Andaman Explorer"
            />
          </div>
          <div>
            <Label>Destination</Label>
            <Input
              value={formData.destination}
              onChange={handleChange('destination')}
              placeholder="Andaman & Nicobar"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Duration</Label>
            <Input
              value={formData.duration}
              onChange={handleChange('duration')}
              placeholder="7 Days"
            />
          </div>
          <div>
            <Label>Group Size</Label>
            <Input
              value={formData.groupSize}
              onChange={handleChange('groupSize')}
              placeholder="4-6 people"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Price</Label>
            <Input
              value={formData.price}
              onChange={handleChange('price')}
              placeholder="₹1,299"
            />
          </div>
          <div>
            <Label>Image Style</Label>
            <Select
              value={formData.imageClass}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, imageClass: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {imagePresets.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Rating</Label>
            <Input
              value={formData.rating}
              onChange={handleChange('rating')}
              placeholder="4.8"
              type="number"
              step="0.1"
              min="0"
              max="5"
            />
          </div>
          <div>
            <Label>Reviews</Label>
            <Input
              value={formData.reviews}
              onChange={handleChange('reviews')}
              placeholder="250"
              type="number"
              min="0"
            />
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={formData.description}
            onChange={handleChange('description')}
            placeholder="Short summary of the package."
          />
        </div>

        <div>
          <Label>Highlights (comma separated)</Label>
          <Textarea
            value={formData.highlights}
            onChange={handleChange('highlights')}
            placeholder="Cellular Jail, Radhanagar Beach, Scuba"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Saving...'
              : isEditing
              ? 'Update Package'
              : 'Save Package'}
          </Button>
          {isEditing && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancelEdit}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
