import type { PageServerLoad } from './$types';
import { fetchForecast } from '$lib/services/forecastWeather';
import { fetchLocationById } from '$lib/services/geocode';

export const load: PageServerLoad = async ({ fetch, url }) => {
    const id = url.searchParams.get('id');

    if (!id) {
        return { forecast: null, locationName: null };
    }

    const location = await fetchLocationById(+id, fetch);

    return {
        forecast: fetchForecast(location, fetch),
        location
    };
};