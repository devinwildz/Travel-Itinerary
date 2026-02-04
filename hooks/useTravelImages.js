import { useState, useEffect } from 'react';

export default function useTravelImages(destination) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!destination) return;


    async function fetchImages() {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${destination}&per_page=6&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
        )
        const data = await res.json()

        console.log(data)

        const urls = data.results.map(img => img.urls.regular)
        setImages(urls)
      } catch (err) {
        console.error("Unsplash error", err)
      }
    }
    fetchImages()

  }, [destination]);

  return images;
}