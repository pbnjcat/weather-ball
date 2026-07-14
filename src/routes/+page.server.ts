import type { PageServerLoad } from './$types';
import { fetchForecast } from '$lib/services/forecastWeather';

export const load: PageServerLoad = ({ fetch, url }) => {
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    const name = url.searchParams.get('name');

    if (!lat || !lon) {
        return { forecast: null, locationName: null };
    }

    return {
        forecast: fetchForecast(
            { latitude: +lat, longitude: +lon, name: name ?? '', timezone: 'auto' },
            fetch
        ),
        locationName: name
    };
};