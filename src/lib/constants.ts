import { type GeocodeLocation } from './types';

export const DEFAULT_SUGGESTIONS: GeocodeLocation[] = [
    {
        name: 'New York',
        country: 'United States',
        admin1: 'New York',
        latitude: 40.7128,
        longitude: -74.006,
        timezone: 'America/New_York'
    },
    {
        name: 'Los Angeles',
        country: 'United States',
        admin1: 'California',
        latitude: 34.0522,
        longitude: -118.2437,
        timezone: 'America/Los_Angeles'
    },
    {
        name: 'London',
        country: 'United Kingdom',
        latitude: 51.5074,
        longitude: -0.1278,
        timezone: 'Europe/London'
    },
    {
        name: 'Paris',
        country: 'France',
        latitude: 48.8566,
        longitude: 2.3522,
        timezone: 'Europe/Paris'
    },
    {
        name: 'Sydney',
        country: 'Australia',
        admin1: 'New South Wales',
        latitude: -33.8688,
        longitude: 151.2093,
        timezone: 'Australia/Sydney'
    },
    {
        name: 'Tokyo',
        country: 'Japan',
        latitude: 35.6762,
        longitude: 139.6503,
        timezone: 'Asia/Tokyo'
    }
];

export const limit = 10;
export const lang = ['en'];

export const WEATHER_FORECAST_API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
export const GEOCODE_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

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