import { z } from 'zod'

const toNumber = (value: unknown) => {
  if (value === '' || value === null || value === undefined) return null
  const parsed = Number(value)
  return Number.isNaN(parsed) ? null : parsed
}

export const packageFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  destination: z.string().min(2, 'Destination is required'),
  duration: z.string().optional().nullable(),
  group_size: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  rating: z.preprocess(toNumber, z.number().min(0).max(5).nullable()),
  reviews: z.preprocess(toNumber, z.number().int().min(0).nullable()),
  description: z.string().optional().nullable(),
  highlights: z.string().optional().nullable(),
  image_class: z.string().optional().nullable(),
})

export type PackageFormValues = z.infer<typeof packageFormSchema>
