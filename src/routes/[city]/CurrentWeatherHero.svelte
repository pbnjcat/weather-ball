<script lang="ts">
	import { WEATHER_CODES } from '$lib/constants';
	import type { PageProps } from '../$types';

	interface Props {
		city: string;
		time: Date;
		currentTemp: number;
		hiTemp: number;
		lowTemp: number;
		weatherCode: number;
	}

	let { city, time, currentTemp, hiTemp, lowTemp, weatherCode } = $props();
</script>

<div class="hero">
	<h3 class="hero_title">Hero Content</h3>
	<p>{city}</p>
	<p>Time: {time}</p>
	<p>current temp = {currentTemp}</p>
	<p>high temp= {hiTemp}</p>
	<p>low temp={lowTemp}</p>
	<p>Weather: {WEATHER_CODES[weatherCode] ?? 'Unknown'}</p>
	<p></p>
</div>

<style>
</style>
