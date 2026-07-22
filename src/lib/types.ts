import z from 'zod';

export interface LocationSearchRequest {
    query: string;
}

export const GeocodeLocationSchema = z.object({
    name: z.string(),
    country: z.string().optional(),
    latitude: z.number(),
    longitude: z.number(),
    admin1: z.string().optional(),
    timezone: z.string(),
});

export const GeocodeResponseSchema = z.object({
    results: z.array(GeocodeLocationSchema).default([])
});
export type GeocodeLocation = z.infer<typeof GeocodeLocationSchema>;
export type GeocodeResponse = z.infer<typeof GeocodeResponseSchema>;

export const Wind = z.object({
    speed: z.number(),
    direction: z.string()
})
export type Wind = z.infer<typeof Wind>;

// Weather responses 
export const CurrentWeatherSchema = z.object({
    time: z.string(),
    temp: z.number(),
    is_day: z.boolean(),
    feels_like: z.number(),
    humidity: z.number(),
    weather_code: z.number(),
    precipitation: z.number(),
    pressure: z.number(),
    wind: Wind
})
export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;

export const HourlyWeatherDataPointSchema = z.object({
    time: z.string(),
    temp: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
    precipitation_probability: z.number(),
    weather_code: z.number(),
    wind: Wind
})
export type HourlyWeatherDataPoint = z.infer<typeof HourlyWeatherDataPointSchema>;
export const HourlyWeatherSchema = z.array(HourlyWeatherDataPointSchema);
export type HourlyWeather = z.infer<typeof HourlyWeatherSchema>;

export const DailyWeatherDataPointSchema = z.object({
    date: z.string(),
    temp_max: z.number(),
    temp_min: z.number(),
    weather_code: z.number(),
    precipitation_sum: z.number(),
    sunrise: z.string(),
    sunset: z.string(),
})
export type DailyWeatherDataPoint = z.infer<typeof DailyWeatherDataPointSchema>;
export const DailyWeatherSchema = z.array(DailyWeatherDataPointSchema);
export type DailyWeather = z.infer<typeof DailyWeatherSchema>;

export const OpenMeteoForecastResponseSchema = z.object({
    current: z.object({
        time: z.string(),
        temperature_2m: z.number(),
        relative_humidity_2m: z.number(),
        apparent_temperature: z.number(),
        is_day: z.number(),
        precipitation: z.number(),
        weather_code: z.number(),
        pressure_msl: z.number(),
        wind_speed_10m: z.number(),
        wind_direction_10m: z.number(),
    }),
    hourly: z.object({
        time: z.array(z.string()),
        temperature_2m: z.array(z.number()),
        apparent_temperature: z.array(z.number()),
        relative_humidity_2m: z.array(z.number()),
        precipitation_probability: z.array(z.number()),
        weather_code: z.array(z.number()),
        wind_speed_10m: z.array(z.number()),
        wind_direction_10m: z.array(z.number()),
    }),
    daily: z.object({
        time: z.array(z.string()),
        temperature_2m_max: z.array(z.number()),
        temperature_2m_min: z.array(z.number()),
        weather_code: z.array(z.number()),
        precipitation_sum: z.array(z.number()),
        sunrise: z.array(z.string()),
        sunset: z.array(z.string()),
    }),
})
export type OpenMeteoForecastResponse = z.infer<typeof OpenMeteoForecastResponseSchema>;