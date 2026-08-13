import type { OpenMeteoForecastResponse, CurrentWeather } from '$lib/types';
import { CurrentWeatherSchema } from '$lib/types';
import { degToCompass } from '$lib/utils';

export function toCurrentWeather(rawData: OpenMeteoForecastResponse): CurrentWeather {
    // c gets json data from current weather key 
    const c = rawData.current;
    return CurrentWeatherSchema.parse({
        temp: c.temperature_2m,
        is_day: c.is_day === 1,
        feels_like: c.apparent_temperature,
        weather_code: c.weather_code,
        precipitation: c.precipitation,
        pressure: c.pressure_msl,
        wind: {
            speed: c.wind_speed_10m,
            direction: degToCompass(c.wind_direction_10m)
        }
    })
}