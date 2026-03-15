'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { packageFormSchema } from '@/lib/validators/package';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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

const emptyValues = {
  name: '',
  destination: '',
  duration: '',
  group_size: '',
  price: '',
  rating: '',
  reviews: '',
  description: '',
  highlights: '',
  image_class: imagePresets[0].value,
};

export default function PackageDialog({
  open,
  onOpenChange,
  initialValues,
  onSubmit,
  isSubmitting,
}) {
  const form = useForm({
    resolver: zodResolver(packageFormSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!open) return;

    if (!initialValues) {
      form.reset(emptyValues);
      return;
    }

    form.reset({
      name: initialValues.name ?? '',
      destination: initialValues.destination ?? '',
      duration: initialValues.duration ?? '',
      group_size: initialValues.group_size ?? '',
      price: initialValues.price ?? '',
      rating: initialValues.rating ?? '',
      reviews: initialValues.reviews ?? '',
      description: initialValues.description ?? '',
      highlights: Array.isArray(initialValues.highlights)
        ? initialValues.highlights.join(', ')
        : initialValues.highlights ?? '',
      image_class: initialValues.image_class ?? imagePresets[0].value,
    });
  }, [open, initialValues, form]);

  const handleSubmit = (values) => {
    const highlights = values.highlights
      ? values.highlights
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    onSubmit({
      ...values,
      highlights,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues?.id ? 'Edit Package' : 'Add Package'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Andaman Explorer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="Andaman & Nicobar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="7 Days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="group_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Size</FormLabel>
                    <FormControl>
                      <Input placeholder="4-6 people" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="₹1,299" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image_class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Style</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {imagePresets.map((preset) => (
                          <SelectItem key={preset.value} value={preset.value}>
                            {preset.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        placeholder="4.8"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reviews"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reviews</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="250" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short summary of the package."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="highlights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highlights (comma separated)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Cellular Jail, Radhanagar Beach, Scuba"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button className="bg-primary/10 text-primary hover:bg-primary/5 cursor-pointer" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Package'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
