import type { PageServerLoad } from './$types';
import { fetchForecast } from '$lib/services/forecastWeather';

export const load: PageServerLoad = ({ fetch, url, params, cookies }) => {
    const { city } = params;
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    const tz = url.searchParams.get('tz') ?? cookies.get('tz') ?? 'auto';
    if (!lat || !lon) {
        return { forecast: null, locationName: null };
    }

    return {
        forecast: fetchForecast(
            { latitude: +lat, longitude: +lon, name: city, timezone: tz },
            fetch
        ),
        city
    };
};