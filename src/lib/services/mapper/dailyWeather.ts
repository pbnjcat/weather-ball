import type { OpenMeteoForecastResponse, DailyWeather } from '$lib/types';
import { DailyWeatherSchema } from '$lib/types';


export function toDailyWeather(rawData: OpenMeteoForecastResponse): DailyWeather {
    // d gets json data from daily weather key 
    const d = rawData.daily;
    const dataPoints = d.time.map((date, i) => ({
        date,
        temp_max: d.temperature_2m_max[i],
        temp_min: d.temperature_2m_min[i],
        weather_code: d.weather_code[i],
        precipitation_sum: d.precipitation_sum[i],
        sunrise: d.sunrise[i],
        sunset: d.sunset[i]
    }));

    return DailyWeatherSchema.parse(dataPoints)
}