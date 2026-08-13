
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
export const WEATHER_CODES: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Light rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Light snow showers',
    86: 'Heavy snow showers',
    95: 'Slight thunderstorm',
    96: 'Moderate thunderstorm',
    99: 'Heavy thunderstorm with hail'
};

export type IconVariant = { day: string; night: string } | { icon: string };
export const WEATHER_CODE_ICONS_MAP: Record<number, IconVariant> = {
    0: { day: 'clear-day', night: 'clear-night' },
    1: { day: 'mostly-clear-day', night: 'mostly-clear-night' },
    2: { day: 'partly-cloudy-day', night: 'partly-cloudy-night' },
    3: { day: 'overcast-day', night: 'overcast-night' },
    45: { day: 'fog-day', night: 'fog-night' },
    48: { day: 'fog-day', night: 'fog-night' },
    51: { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' },
    53: { icon: 'drizzle' },
    55: { icon: 'extreme-drizzle' },
    56: { day: 'partly-cloudy-day-sleet', night: 'partly-cloudy-night-sleet' },
    57: { icon: 'extreme-sleet' },
    61: { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' },
    63: { icon: 'rain' },
    65: { icon: 'extreme-rain' },
    66: { icon: 'sleet' },
    67: { icon: 'sleet' },
    71: { day: 'partly-cloudy-day-snow', night: 'partly-cloudy-night-snow' },
    73: { icon: 'snow' },
    75: { icon: 'extreme-snow' },
    77: { icon: 'snow' },
    80: { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' },
    81: { icon: 'rain' },
    82: { icon: 'extreme-rain' },
    85: { day: 'partly-cloudy-day-snow', night: 'partly-cloudy-night-snow' },
    86: { icon: 'extreme-snow' },
    95: { day: 'thunderstorms-day-drizzle', night: 'thunderstorms-night-drizzle' },
    96: { icon: 'thunderstorms-rain' },
    99: { icon: 'thunderstorms-extreme-rain' },
}

export function getWeatherIconSlug(code: number, isDay: boolean): string {
    const entry = WEATHER_CODE_ICONS_MAP[code];
    if (!entry) return 'not-available';
    return 'icon' in entry ? entry.icon : isDay ? entry.day : entry.night;
}