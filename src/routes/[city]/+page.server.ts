import type { PageServerLoad } from './$types';
import { fetchForecast } from '$lib/services/forecastWeather';

export const load: PageServerLoad = ({ fetch, url, params }) => {
    const { city } = params;
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');

    if (!lat || !lon) {
        return { forecast: null, locationName: null };
    }

    return {
        forecast: fetchForecast(
            { latitude: +lat, longitude: +lon, name: city, timezone: 'auto' },
            fetch
        ),
    };
};