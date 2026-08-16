
import type { GeocodeLocation } from './types';

export const DEFAULT_SUGGESTIONS: GeocodeLocation[] = [
    { id: 5128581, name: 'New York', country: 'United States', admin1: 'New York', latitude: 40.71427, longitude: -74.00597, timezone: 'America/New_York' },
    { id: 5368361, name: 'Los Angeles', country: 'United States', admin1: 'California', latitude: 34.05223, longitude: -118.24368, timezone: 'America/Los_Angeles' },
    { id: 2643743, name: 'London', country: 'United Kingdom', admin1: 'England', latitude: 51.50853, longitude: -0.12574, timezone: 'Europe/London' },
    { id: 2988507, name: 'Paris', country: 'France', admin1: 'Île-de-France', latitude: 48.85341, longitude: 2.3488, timezone: 'Europe/Paris' },
    { id: 2147714, name: 'Sydney', country: 'Australia', admin1: 'New South Wales', latitude: -33.86785, longitude: 151.20732, timezone: 'Australia/Sydney' },
    { id: 1850147, name: 'Tokyo', country: 'Japan', admin1: 'Tokyo', latitude: 35.6895, longitude: 139.69171, timezone: 'Asia/Tokyo' },
];

export const limit = 10;
export const lang = ['en'];

export const WEATHER_FORECAST_API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
export const GEOCODE_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
export const GEOCODE_GET_BASE_URL = "https://geocoding-api.open-meteo.com/v1/get";