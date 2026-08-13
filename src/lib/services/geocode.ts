import { GEOCODE_BASE_URL, GEOCODE_GET_BASE_URL } from '$lib/constants';
import type { LocationSearchRequest, GeocodeLocation } from '$lib/types';
import { GeocodeResponseSchema, GeocodeLocationSchema } from '$lib/types';

export async function fetchLocations(
    data: LocationSearchRequest,
    fetchFn = fetch,
    signal?: AbortSignal
): Promise<GeocodeLocation[]> {
    const { query } = data;
    // returns 5 results by default
    const count = 5;
    const url = `${GEOCODE_BASE_URL}?name=${encodeURIComponent(query)}&count=${count}&language=en&format=json`;

    const response = await fetchFn(url, {
        method: "GET",
        signal,
    });
    if (!response.ok || response.status !== 200) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error occurred" }));
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const rawData = await response.json();
    const parsedData = GeocodeResponseSchema.parse(rawData);

    return parsedData.results || [];
}

export async function fetchLocationById(
    id: number,
    fetchFn = fetch,
    signal?: AbortSignal
): Promise<GeocodeLocation> {
    const url = `${GEOCODE_GET_BASE_URL}?id=${id}`;

    const response = await fetchFn(url, { method: 'GET', signal });
    if (!response.ok || response.status !== 200) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const rawData = await response.json();
    return GeocodeLocationSchema.parse(rawData);
}
