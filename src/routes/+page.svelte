<script lang="ts">
	import type { PageData } from './$types';
	import { WEATHER_CODES } from '$lib/constants';
	let { data }: { data: PageData } = $props();
</script>

<section>
	{#if data.forecast}
		{#await data.forecast}
			<p>Loading forecast…</p>
		{:then forecast}
			<h1>Current Weather</h1>
			<p>Temperature: {forecast.current.temp}</p>
			<p>Feels like: {forecast.current.feels_like}</p>
			<p>Humidity: {forecast.current.humidity}</p>
			<p>Wind: {forecast.current.wind.speed} {forecast.current.wind.direction}</p>
			<p>Weather: {WEATHER_CODES[forecast.current.weather_code] ?? 'Unknown'}</p>
			<h1>Hourly Weather</h1>
			{#each forecast.hourly as hourly (hourly.time)}
				<h2>Time: {hourly.time}</h2>
				<p>Temperature: {hourly.temp}</p>
				<p>Feels like: {hourly.feels_like}</p>
				<p>Humidity: {hourly.humidity}</p>
				<p>Wind: {hourly.wind.speed} {hourly.wind.direction}</p>
				<p>Weather: {WEATHER_CODES[hourly.weather_code] ?? 'Unknown'}</p>
			{/each}
			<h1>Daily Weather</h1>
			{#each forecast.daily as daily (daily.date)}
				<h2>Day: {daily.date}</h2>
				<p>Temperature Max: {daily.temp_max}</p>
				<p>Temperature Min: {daily.temp_min}</p>
				<p>Precipitation: {daily.precipitation_sum}</p>
				<p>Sunrise: {daily.sunrise}</p>
				<p>Sunset: {daily.sunset}</p>
			{/each}{:catch err}
			<p>Couldn't load the forecast: {err instanceof Error ? err.message : 'Unknown error'}</p>
		{/await}
	{/if}

	<h2>Input a city into the search to get current weather</h2>
	<p>
		Data from <a href="https://open-meteo.com/" rel="noopener noreferrer" target="_blank"
			>Open meteo</a
		>
	</p>
</section>
