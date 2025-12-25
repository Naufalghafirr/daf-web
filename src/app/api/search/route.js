export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return Response.json([], { status: 200 });
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      q
    )}&format=json&addressdetails=1&limit=5`,
    {
      headers: {
        "User-Agent": "danaAutoFinance",
      },
    }
  );
  
  const data = await res.json();

  return Response.json(data);
}
