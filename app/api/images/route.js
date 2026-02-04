export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "travel";

    const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=6&client_id=${process.env.UNSPLASH_KEY}`
    );

    const data = await res.json();

    const images = data.results.map(img => ({
        id: img.id,
        url: img.urls.small,
        alt: img.alt_description,
    }));

    return Response.json(images);
}
