import type { LocationSearchRequest } from './types';

export function degToCompass(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const normalized = ((deg % 360) + 360) % 360; // if api doesn't already 
  const index = Math.round(normalized / 22.5) % 16;

  return directions[index];
}

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
