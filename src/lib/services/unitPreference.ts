import { createContext } from 'svelte';

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindUnit = 'kmh' | 'mph' | 'ms' | 'knots';
export type PrecipitationUnit = 'mm' | 'cm' | 'inches';

interface UnitPreference {
    temperature: TemperatureUnit;
    wind: WindUnit;
    precipitation: PrecipitationUnit;
    timezone: string | null;
}

export const [getUnitPreferenceContext, setUnitPreferenceContext] = createContext<UnitPreference>();

export const DEFAULT_PREFERENCES: UnitPreference = {
    temperature: 'celsius',
    wind: 'ms',
    precipitation: 'mm',
    timezone: null
};

