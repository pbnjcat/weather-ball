<script lang="ts">
	import type { HourlyWeather } from '$lib/types';
	import CloudRainIcon from 'virtual:icons/tabler/cloud-rain';
	import ClockIcon from 'virtual:icons/tabler/clock';
	import WeatherIcon from '$lib/components/WeatherIcon.svelte';
	import ChevronRight from 'virtual:icons/tabler/chevron-right';
	import ChevronLeft from 'virtual:icons/tabler/chevron-left';
	import { getWeatherIconSlug, convertedTempUnit } from '$lib/utils';
	import { getUnitPreferenceContext } from '$lib/services/unitPreference';

	interface Props {
		hours: HourlyWeather;
	}
	let { hours }: Props = $props();
	const unitPreferences = getUnitPreferenceContext();
	let slideEl: HTMLDivElement;
	let atStart = $state(true);
	let atEnd = $state(false);

	function updateScrollState() {
		if (!slideEl) return;
		atStart = slideEl.scrollLeft <= 0;
		atEnd = slideEl.scrollLeft + slideEl.clientWidth >= slideEl.scrollWidth - 1;
	}

	$effect(() => {
		updateScrollState();
	});

	function scroll(direction: 'left' | 'right') {
		if (!slideEl) return;
		const item = slideEl.querySelector<HTMLElement>('.carousel__item');
		if (!item) return;
		const scrollAmount = item.offsetWidth;
		slideEl.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth'
		});
	}
</script>

<div class="wrapper">
	<div class="carousel__header">
		<ClockIcon height={24} width={24} />
		<h2>Hourly Weather</h2>
	</div>
	<div class="carousel">
		<button aria-label="Scroll left" onclick={() => scroll('left')} disabled={atStart}
			><ChevronLeft height={24} width={24} />
		</button>
		<div class="carousel__slide" bind:this={slideEl} onscroll={updateScrollState}>
			{#each hours as hour, i (hour.time)}
				<div class="carousel__item" class:carousel__item--current={i === 0}>
					<h3>
						{new Date(hour.time).toLocaleTimeString('en-US', {
							hour: 'numeric'
						})}
					</h3>
					<WeatherIcon
						animated={false}
						slug={getWeatherIconSlug(hour.weather_code, hour.is_day)}
						style="fill"
						size={48}
					/>
					<h2>
						{Math.round(convertedTempUnit(hour.temp, unitPreferences.temperature))}&#176;
					</h2>
					<div class="carousel__item-rain">
						<CloudRainIcon height={24} width={24} />
						<p>{hour.precipitation_probability}%</p>
					</div>
				</div>
			{/each}
		</div>
		<button aria-label="Scroll right" onclick={() => scroll('right')} disabled={atEnd}
			><ChevronRight height={24} width={24} /></button
		>
	</div>
</div>

<style>
	.wrapper {
		background-color: var(--card-color);
		border: 1px solid var(--color-border);
		border-radius: var(--spacing-x-small);
	}

	.carousel__header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: var(--spacing-x-small);
		gap: var(--spacing-xx-small);
	}

	.carousel__header h2 {
		font-size: var(--font-size-body-normal);
		font-weight: var(--font-weight-semi-bold);
		color: var(--color-text);
	}

	.carousel__header :global(svg) {
		color: var(--color-text);
	}

	.carousel {
		display: flex;
		align-items: center;
		gap: var(--spacing-x-small);
		padding: 0 var(--spacing-x-small) var(--spacing-x-small) var(--spacing-x-small);
	}

	.carousel__slide h3 {
		font-size: var(--font-size-body-small);
		font-weight: var(--font-weight-regular);
		white-space: nowrap;
		color: var(--color-text);
	}

	.carousel__slide {
		display: flex;
		flex-direction: row;
		overflow-x: auto;
		scroll-behavior: smooth;
		scroll-snap-type: x mandatory;
		width: 100%;
		scrollbar-width: none;
	}

	.carousel__slide::-webkit-scrollbar {
		display: none;
	}

	.carousel__item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		scroll-snap-align: start;
		padding: var(--spacing-small);
		flex-shrink: 0;
		color: var(--color-text);
	}

	.carousel__item--current {
		background-color: var(--color-background-row-selected);
		border-radius: var(--spacing-xx-small);
	}

	.carousel__item-rain {
		color: var(--color-text-muted);
	}

	.carousel button {
		border: none;
		color: var(--color-text);
		border-radius: var(--spacing-xx-small);
		flex-shrink: 0;
		height: 6rem;
		background-color: var(--color-background-row-selected);
	}

	.carousel button:disabled {
		cursor: not-allowed;
		opacity: 0.4;
	}

	@media (hover: hover) {
		.carousel button:not(:disabled):hover {
			background: var(--color-background-row-selected);
			cursor: pointer;
		}
	}
</style>
