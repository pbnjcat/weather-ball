import type { LocationSearchRequest } from './types';
import { WEATHER_CODE_ICONS_MAP } from './iconMap';
import convert from 'convert';
import type { TemperatureUnit, PrecipitationUnit, WindUnit } from './services/unitPreference';

export function debounceTimeout<T extends (...args: any[]) => void>(
  wait: number,
  callback: T,
  immediate = false,
) {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function <U>(this: U, ...args: Parameters<typeof callback>) {
    const context = this;
    const later = () => {
      timeout = null;

      if (!immediate) {
        callback.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    if (typeof timeout === "number") {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      callback.apply(context, args);
    }
  }
};

export function parseSearchParams(params: URLSearchParams): LocationSearchRequest {
  const query = params.get('location') ?? '';

  return { query };
}

export function degToCompass(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const normalized = ((deg % 360) + 360) % 360; // if api doesn't already 
  const index = Math.round(normalized / 22.5) % 16;

  return directions[index];
}

const precipitationFromMM: Record<PrecipitationUnit, (mm: number) => number> = {
  mm: (mm) => mm,
  cm: (mm) => convert(mm, 'millimeters').to('centimeters'),
  inches: (mm) => convert(mm, 'millimeters').to('inches')
};
export function convertedPrecipUnit(mm: number, unit: PrecipitationUnit): number {
  return Number(precipitationFromMM[unit](mm).toFixed(2));
}
const precipitationLabels: Record<PrecipitationUnit, string> = {
  mm: 'mm',
  cm: 'cm',
  inches: 'in'
};
export function precipitationUnitLabel(unit: PrecipitationUnit): string {
  return precipitationLabels[unit];
}

function celsiusToFahrenheit(celsius: number) {
  return Number((convert(celsius, 'celsius').to('fahrenheit')).toFixed(2));
}
export function convertedTempUnit(celsius: number, unit: TemperatureUnit): number {
  return unit === 'fahrenheit' ? celsiusToFahrenheit(celsius) : celsius;
}
export function tempUnitLabel(unit: TemperatureUnit): string {
  return unit === 'fahrenheit' ? '°F' : '°C';
}

const kmhToMph = 0.621371;
const kmhToMs = 1 / 3.6;
const kmhToKnots = 0.539957;
const convertWindFromKMH: Record<WindUnit, (kmh: number) => number> = {
  kmh: (kmh) => Number(kmh.toFixed(2)),
  mph: (kmh) => Number((kmh * kmhToMph).toFixed(2)),
  ms: (kmh) => Number((kmh * kmhToMs).toFixed(2)),
  knots: (kmh) => Number((kmh * kmhToKnots).toFixed(2)),
}
export function convertedWindUnit(kmh: number, unit: WindUnit): number {
  return convertWindFromKMH[unit](kmh);
}
const windLabels: Record<WindUnit, string> = {
  kmh: 'km/h',
  mph: 'mph',
  ms: 'm/s',
  knots: 'kn'
};
export function windUnitLabel(unit: WindUnit): string {
  return windLabels[unit];
}

export function formatTime(timezone: string): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}

export function formatDate(timezone: string): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function getWeatherIconSlug(code: number, isDay: boolean): string {
  const entry = WEATHER_CODE_ICONS_MAP[code];
  if (!entry) return 'not-available';
  return 'icon' in entry ? entry.icon : isDay ? entry.day : entry.night;
}







