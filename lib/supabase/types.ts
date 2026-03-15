export type Package = {
  id: string
  name: string
  destination: string
  duration: string | null
  group_size: string | null
  price: string | null
  rating: number | null
  reviews: number | null
  description: string | null
  highlights: string[] | null
  image_class: string | null
  created_at: string
}

export type PackageInsert = Omit<Package, 'id' | 'created_at'>
export type PackageUpdate = Partial<PackageInsert> & { id: string }
