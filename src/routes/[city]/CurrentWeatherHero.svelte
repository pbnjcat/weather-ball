<script lang="ts">
	import { WEATHER_CODES } from '$lib/iconMap';
	import WeatherIcon from '$lib/components/WeatherIcon.svelte';
	import { formatDate, formatTime, getWeatherIconSlug } from '$lib/utils';
	import SunriseIcon from 'virtual:icons/tabler/sunrise';
	import SunsetIcon from 'virtual:icons/tabler/sunset';

	interface Props {
		city: string | undefined;
		timezone: string | undefined;
		currentTemp: number;
		isDay: boolean;
		hiTemp: number;
		unit: string;
		lowTemp: number;
		weatherCode: number;
	}

	let { city, timezone, currentTemp, hiTemp, lowTemp, isDay, weatherCode, unit }: Props = $props();

	$effect(() => {
		const id = setInterval(() => (currentTime = Date.now()), 1000);
		return () => clearInterval(id);
	});
	let currentTime = $state(Date.now());
	let timeParts = $derived(
		timezone ? formatTime(timezone).formatToParts(new Date(currentTime)) : []
	);

	let dateParts = $derived(
		timezone ? formatDate(timezone).formatToParts(new Date(currentTime)) : []
	);
</script>

<div class="hero__wrapper">
	<div class="hero__top">
		<div class="hero__locale">
			<h2 class="hero__city">{city ?? 'Unknown location'}</h2>
			<p class="hero__date">
				{#each dateParts as part}{part.value}{/each}
			</p>
			<p class="hero__clock">
				{#each timeParts as part}{part.value}{/each}
			</p>
		</div>
		<div class="hero__weather">
			<WeatherIcon
				animated={true}
				slug={getWeatherIconSlug(weatherCode, isDay)}
				style="fill"
				size={84}
			/>
			<h2 class="hero__weather-label">{WEATHER_CODES[weatherCode] ?? 'Unknown'}</h2>
		</div>
	</div>

	<div class="hero__bottom">
		<div class="hero__temp">
			<p class="hero__temp-label">Currently</p>
			<p class="hero__temp-current"><span>{currentTemp}</span>{unit}</p>
			<div class="hero__temp-range">
				<p>Hi: {hiTemp}{unit}</p>
				<p>Lo: {lowTemp}{unit}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.hero__wrapper {
		background-color: var(--card-color);
		border-radius: var(--spacing-x-small);
		padding: var(--spacing-small);
	}

	.hero__top {
		display: flex;
		justify-content: space-between;
	}

	.hero__city {
		font-size: var(--font-size-heading-3);
		font-weight: var(--font-weight-semi-bold);
		color: var(--color-text);
	}

	.hero__date,
	.hero__clock {
		color: var(--color-text-muted);
		font-size: var(--font-size-body-normal);
	}

	.hero__clock {
		font-variant-numeric: tabular-nums;
	}

	.hero__weather {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--spacing-xx-small);
	}

	.hero__weather-label {
		color: var(--color-text);
		font-size: var(--font-size-heading-3);
		font-weight: var(--font-weight-regular);
		margin-top: calc(-1 * var(--spacing-small));
	}

	.hero__locale {
		display: flex;
		flex-direction: column;
	}

	.hero__bottom {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.hero__temp {
		color: var(--color-text);
	}

	.hero__temp-label {
		color: var(--color-text-muted);
		font-size: var(--font-size-body-small);
		text-transform: uppercase;
		margin-bottom: -5px;
	}

	.hero__temp-current span {
		font-size: var(--font-size-heading-1);
		font-weight: var(--font-weight-semi-bold);
	}
	.hero__temp-current {
		font-size: var(--font-size-heading-1);
		font-weight: var(--font-weight-regular);
	}

	.hero__temp-range {
		display: flex;
		gap: var(--spacing-medium);
		font-size: var(--font-size-body-normal);
	}
</style>
