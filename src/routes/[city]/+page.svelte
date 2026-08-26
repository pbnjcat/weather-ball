<script lang="ts">
	import ThermometerIcon from 'virtual:icons/tabler/temperature';
	import DropletIcon from 'virtual:icons/tabler/droplet-half-2-filled';
	import WindIcon from 'virtual:icons/tabler/wind';
	import CloudRainIcon from 'virtual:icons/tabler/cloud-rain';
	import LungsIcon from 'virtual:icons/tabler/lungs';
	import CalendarWeekIcon from 'virtual:icons/tabler/calendar-week';
	import ClockIcon from 'virtual:icons/tabler/clock';
	import CircleChevronRightIcon from 'virtual:icons/tabler/circle-chevron-right';
	import CircleChevronLeftIcon from 'virtual:icons/tabler/circle-chevron-left';
	import type { PageProps } from './$types';
	import {
		convertedTempUnit,
		convertedPrecipUnit,
		convertedWindUnit,
		tempUnitLabel,
		windUnitLabel,
		precipitationUnitLabel
	} from '$lib/utils';
	import Card from './Card.svelte';
	import { getUnitPreferenceContext } from '$lib/services/unitPreference';
	import CurrentWeatherHero from './CurrentWeatherHero.svelte';

	let { data }: PageProps = $props();
	let location = $derived(data.location);
	let timezone = $derived(data.location?.timezone);

	const unitPreferences = getUnitPreferenceContext();
</script>

<section>
	{#if data.forecast}
		{#await data.forecast}
			<p>Loading forecast…</p>
		{:then forecast}
			<div class="content__hero">
				<CurrentWeatherHero
					currentTemp={convertedTempUnit(forecast.current.temp, unitPreferences.temperature)}
					hiTemp={convertedTempUnit(forecast.daily[0].temp_max, unitPreferences.temperature)}
					lowTemp={convertedTempUnit(forecast.daily[0].temp_min, unitPreferences.temperature)}
					weatherCode={forecast.current.weather_code}
					city={location?.name}
					unit={tempUnitLabel(unitPreferences.temperature)}
					isDay={forecast.current.is_day}
					{timezone}
				/>
			</div>
			<div class="card-grid">
				<Card
					Icon={ThermometerIcon}
					label="Feels Like"
					value={convertedTempUnit(forecast.current.feels_like, unitPreferences.temperature)}
					unit={tempUnitLabel(unitPreferences.temperature)}
				>
					{#snippet description()}
						{#if forecast.current.feels_like < forecast.current.temp}
							Feels colder than the actual temperature.
						{:else if forecast.current.feels_like > forecast.current.temp}
							Feels warmer than the actual temperature.
						{:else}
							Feels like the actual temperature.
						{/if}
					{/snippet}
				</Card>
				<Card Icon={DropletIcon} label="Humidity" value={forecast.hourly[0].humidity} unit="%">
					{#snippet description()}
						<p>
							<span class="dew-point"
								>{`${convertedTempUnit(forecast.hourly[0].dew_point, unitPreferences.temperature)}`}&deg;
							</span> Dew point
						</p>
					{/snippet}
				</Card>
				<Card
					Icon={WindIcon}
					label="Wind"
					value={convertedWindUnit(forecast.current.wind.speed, unitPreferences.wind)}
					unit={windUnitLabel(unitPreferences.wind)}
				/>
				<Card
					Icon={CloudRainIcon}
					label="Precipitation"
					value={convertedPrecipUnit(
						forecast.daily[0].precipitation_sum,
						unitPreferences.precipitation
					)}
					unit={precipitationUnitLabel(unitPreferences.precipitation)}
					>{#snippet description()}
						{'Total precipitation for the day'}
					{/snippet}</Card
				>

				<p>Wind Direction: {forecast.current.wind.direction}</p>
			</div>
		{:catch err}
			<p>Couldn't load the forecast: {err instanceof Error ? err.message : 'Unknown error'}</p>
		{/await}
	{/if}
</section>

<style>
	.content__hero {
		padding-block: var(--spacing-medium);
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));
		gap: var(--spacing-large);
	}

	.dew-point {
		color: var(--color-text-muted-on-light);
		background-color: var(--color-button-border);
		border-radius: var(--spacing-small);
		padding: var(--spacing-xx-small);
	}
</style>
