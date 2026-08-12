import { WEATHER_FORECAST_API_BASE_URL } from '$lib/constants';
import type { GeocodeLocation, CurrentWeather, HourlyWeather, DailyWeather } from '$lib/types';
import { OpenMeteoForecastResponseSchema } from '$lib/types';
import { toHourlyWeather } from './mapper/hourlyWeather';
import { toCurrentWeather } from './mapper/currentWeather';
import { toDailyWeather } from './mapper/dailyWeather';

export interface Forecast {
    current: CurrentWeather;
    hourly: HourlyWeather;
    daily: DailyWeather;
}

const FORECAST_HOURS = 24;
const FORECAST_DAYS = 10;
const CURRENT_PARAMS = 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m';
const HOURLY_PARAMS = 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m';
const DAILY_PARAMS = 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,sunrise,sunset';

export async function fetchForecast(
    data: GeocodeLocation,
    fetchFn = fetch,
    signal?: AbortSignal
): Promise<Forecast> {
    const { latitude, longitude, timezone } = data;

    const url = `${WEATHER_FORECAST_API_BASE_URL}?latitude=${latitude}&longitude=${longitude}`
        + `&current=${CURRENT_PARAMS}`
        + `&hourly=${HOURLY_PARAMS}`
        + `&daily=${DAILY_PARAMS}`
        + `&forecast_days=${FORECAST_DAYS}`
        + `&forecast_hours=${FORECAST_HOURS}`
        + `&timezone=${encodeURIComponent(timezone)}`;

    // let t = performance.now();
    // const response = await fetchFn(url, { method: 'GET', signal });
    // console.log(`[perf] second: ${(performance.now() - t).toFixed(0)}ms`);
    const response = await fetchFn(url, { method: 'GET', signal });

    if (!response.ok || response.status !== 200) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(errorData.reason || errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const rawData = await response.json();
    const parsed = OpenMeteoForecastResponseSchema.parse(rawData);

    return {
        current: toCurrentWeather(parsed),
        hourly: toHourlyWeather(parsed),
        daily: toDailyWeather(parsed)
    }
}