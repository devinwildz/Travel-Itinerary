import { useQuery } from '@tanstack/react-query';

export default function useTravelImages(destination) {
  const query = destination?.trim() || '';

  const { data } = useQuery({
    queryKey: ['travel-images', query.toLowerCase()],
    enabled: Boolean(query),
    queryFn: async () => {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&per_page=6&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
      );
      if (!res.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await res.json();
      return (data.results || []).map((img) => img.urls.regular);
    },
  });

  return data || [];
}
