import type { HourlyWeather, OpenMeteoForecastResponse } from '$lib/types';
import { HourlyWeatherSchema } from '$lib/types';
import { degToCompass } from '$lib/utils';

export function toHourlyWeather(rawData: OpenMeteoForecastResponse): HourlyWeather {
    // h gets json data from hourly weather key 
    const h = rawData.hourly;
    const dataPoints = h.time.map((time, i) => ({
        time,
        temp: h.temperature_2m[i],
        feels_like: h.apparent_temperature[i],
        humidity: h.relative_humidity_2m[i],
        is_day: h.is_day[i] === 1,
        precipitation_probability: h.precipitation_probability[i],
        weather_code: h.weather_code[i],
        wind: {
            speed: h.wind_speed_10m[i],
            direction: degToCompass(h.wind_direction_10m[i]),
        }
    }));

    return HourlyWeatherSchema.parse(dataPoints);
}