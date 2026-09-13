<script lang="ts">
	import type { DailyWeather } from '$lib/types';
	import { WEATHER_CODES } from '$lib/iconMap';
	import { getWeatherIconSlug, convertedTempUnit } from '$lib/utils';
	import WeatherIcon from '$lib/components/WeatherIcon.svelte';
	import CalendarWeekIcon from 'virtual:icons/tabler/calendar-week';
	import CirclePlus from 'virtual:icons/tabler/circle-plus';
	import CircleMinus from 'virtual:icons/tabler/circle-minus';
	import { getUnitPreferenceContext } from '$lib/services/unitPreference';

	interface Props {
		daily: DailyWeather;
	}

	let { daily }: Props = $props();
	const unitPreferences = getUnitPreferenceContext();

	let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	let isExpanded = $state(false);
</script>

<div class="wrapper">
	<div class="table__header">
		<CalendarWeekIcon width={24} height={24} />
		<h2>10 Day Forecast</h2>
	</div>
	<div class="table" class:expanded={isExpanded}>
		{#each isExpanded ? daily : daily.slice(0, 3) as day, i (day.date)}
			{@const [year, month, date] = day.date.split('-')}
			<div class="table__row">
				<div class="table__col-day">
					<p class="table__day-label">{i === 0 ? 'Today' : days[new Date(day.date).getDay()]}</p>
					<p class="table__day-date">{Number(month)}/{Number(date)}</p>
				</div>
				<WeatherIcon
					animated={false}
					style="fill"
					slug={getWeatherIconSlug(day.weather_code, true)}
				/>
				<div class="table__row-col-temp">
					<span class="table__row-col-temp-max"
						>{Math.round(convertedTempUnit(day.temp_max, unitPreferences.temperature))}&#176;</span
					>
					<span class="table__row-col-temp-min"
						>{Math.round(convertedTempUnit(day.temp_min, unitPreferences.temperature))}&#176;</span
					>
				</div>
				<p class="table__row-col-weather">{WEATHER_CODES[day.weather_code] ?? 'Unknown'}</p>
			</div>
		{/each}
		<button class="table__button-expand" onclick={() => (isExpanded = !isExpanded)}>
			{#if isExpanded}
				<CircleMinus height={24} width={24} />
			{:else}
				<CirclePlus height={24} width={24} />
			{/if}
			{isExpanded ? 'Show less' : 'Show more'}
		</button>
	</div>
</div>

<style>
	.wrapper {
		background-color: var(--card-color);
		border: 1px solid var(--color-border);
		border-radius: var(--spacing-x-small);
	}

	.table__header {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: var(--color-text);
		gap: var(--spacing-xx-small);
		padding: var(--spacing-small);
	}

	.table__header h2 {
		font-size: var(--font-size-body-normal);
		font-weight: var(--font-weight-semi-bold);
		color: var(--color-text);
	}

	.table {
		padding: 0 var(--spacing-x-small) var(--spacing-x-small) var(--spacing-x-small);
	}

	.table__col-day {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding-inline: var(--spacing-x-small);
	}
	.table__row-col-temp {
		color: var(--color-text);
	}

	.table__row-col-temp-max {
		font-size: var(--font-size-heading-2);
	}

	.table__row-col-temp-min {
		font-size: var(--font-size-body-normal);
	}

	.table__row-col-weather {
		color: var(--color-text);
		white-space: nowrap;
		padding-inline: var(--spacing-medium);
	}

	.table__button-expand {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text);
		background-color: transparent;
		width: 100%;
		border: none;
		border-top: 1px solid var(--color-border);
		padding-top: var(--spacing-x-small);
		gap: var(--spacing-xx-small);
	}

	.table__day-label {
		font-size: var(--font-size-body-normal);
		font-weight: var(--font-weight-semi-bold);
		color: var(--color-text);
	}

	.table__day-date {
		font-size: var(--font-size-body-small);
		font-weight: var(--font-weight-regular);
		color: var(--color-text-muted);
	}

	.table__row {
		display: grid;
		grid-template-columns: 20% 20% 20% 40%;
		align-items: center;
		border-top: 1px solid var(--color-border);
		padding-block: var(--spacing-x-small);
	}

	.table__row :global(img) {
		height: 48px;
		width: auto;
	}

	@media (hover: hover) {
		.table__button-expand:hover {
			cursor: pointer;
			color: var(--color-primary);
		}
	}
</style>
