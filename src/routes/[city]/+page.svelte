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
	import WeatherIcon from '$lib/components/WeatherIcon.svelte';
	import { getWeatherIconSlug } from '$lib/constants';

	let { data }: PageProps = $props();

	const unitPreferences = getUnitPreferenceContext();
</script>

<section>
	{#if data.forecast}
		{#await data.forecast}
			<p>Loading forecast…</p>
		{:then forecast}
			<CurrentWeatherHero
				currentTemp={convertedTempUnit(forecast.current.temp, unitPreferences.temperature)}
				hiTemp={forecast.daily[0].temp_max}
				lowTemp={forecast.daily[0].temp_min}
				weatherCode={forecast.current.weather_code}
				city={data.city}
				time={forecast.current.time}
			/>
			<div class="card-grid">
				<Card
					Icon={ThermometerIcon}
					label="Feels Like"
					value={convertedTempUnit(forecast.current.feels_like, unitPreferences.temperature)}
					unit={tempUnitLabel(unitPreferences.temperature)}
				/>
				<Card Icon={DropletIcon} label="Humidity" value={forecast.current.humidity} unit="%" />
				<Card
					Icon={WindIcon}
					label="Wind"
					value={convertedWindUnit(forecast.current.wind.speed, unitPreferences.wind)}
					unit={windUnitLabel(unitPreferences.wind)}
				/>
				<Card
					Icon={CloudRainIcon}
					label="Precipitation"
					value={convertedPrecipUnit(forecast.current.precipitation, unitPreferences.precipitation)}
					unit={precipitationUnitLabel(unitPreferences.precipitation)}
				/>

				<p>Wind Direction: {forecast.current.wind.direction}</p>
				<WeatherIcon
					animated={true}
					slug={getWeatherIconSlug(forecast.current.weather_code, forecast.current.is_day)}
					style="fill"
					size={200}
				/>
			</div>

			<!-- <h1>Hourly Weather</h1>
			{#each forecast.hourly as hourly (hourly.time)}
				<h2>Time: {hourly.time}</h2>
				<p>Temperature: {hourly.temp}</p>
				<p>Feels like: {hourly.feels_like}</p>
				<p>Humidity: {hourly.humidity}</p>
				<p>Wind: {hourly.wind.speed} {hourly.wind.direction}</p>
				<p>Weather: {WEATHER_CODES[hourly.weather_code] ?? 'Unknown'}</p>
			{/each} -->
			<!-- <h1>Daily Weather</h1>
			{#each forecast.daily as daily (daily.date)}
				<h2>Day: {daily.date}</h2>
				<p>Temperature Max: {daily.temp_max}</p>
				<p>Temperature Min: {daily.temp_min}</p>
				<p>Precipitation: {daily.precipitation_sum}</p>
				<p>Sunrise: {daily.sunrise}</p>
				<p>Sunset: {daily.sunset}</p>
			{/each} -->
		{:catch err}
			<p>Couldn't load the forecast: {err instanceof Error ? err.message : 'Unknown error'}</p>
		{/await}
	{/if}

	<h2>Input a city into the search to get current weather</h2>
</section>

<style>
	section {
		padding-block: var(--spacing-medium);
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));
		gap: var(--spacing-large);
	}
</style>
