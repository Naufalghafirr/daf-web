export async function GET(request) {
    const provinceId = request.nextUrl.searchParams.get('provinceId');
    
    if (!provinceId) {
        return new Response('Missing provinceId query parameter', { status: 400 });
    }
    const apiUrl = `${request.nextUrl.origin}/api/wilayah/regencies/${provinceId}`;

    const response = await fetch(apiUrl, {
        cache: "no-store",
    });

    // Check if the response from the internal API call was successful
    if (!response.ok) {
        // If the internal API call failed, propagate its status and body
        const errorBody = await response.text(); // Get as text to avoid JSON parsing errors on non-JSON responses
        return new Response(errorBody, {
            status: response.status,
            headers: { 'Content-Type': response.headers.get('Content-Type') || 'application/json' },
        });
    }

    const data = await response.json();
    console.log(data);
    // The line `console.log(data.json());` was incorrect because `data` is already
    // the parsed JSON object, not a Response object that has a .json() method.
    // It has been removed.
    return Response.json(data);
}
