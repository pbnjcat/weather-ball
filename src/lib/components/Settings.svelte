<!-- src/lib/components/Settings.svelte -->
<script lang="ts">
	import SettingsIcon from 'virtual:icons/tabler/settings';
	import SquareX from 'virtual:icons/tabler/square-x';
	import { getUnitPreferenceContext } from '$lib/services/unitPreference';
	import type { TemperatureUnit, WindUnit, PrecipitationUnit } from '$lib/services/unitPreference';

	let isOpen = $state(false);

	const unitPreferences = getUnitPreferenceContext();

	const TEMP_OPTIONS: { value: TemperatureUnit; label: string }[] = [
		{ value: 'celsius', label: '°C' },
		{ value: 'fahrenheit', label: '°F' }
	];
	const WIND_OPTIONS: { value: WindUnit; label: string }[] = [
		{ value: 'kmh', label: 'km/h' },
		{ value: 'mph', label: 'mph' },
		{ value: 'ms', label: 'm/s' },
		{ value: 'knots', label: 'kn' }
	];
	const PRECIP_OPTIONS: { value: PrecipitationUnit; label: string }[] = [
		{ value: 'mm', label: 'mm' },
		{ value: 'cm', label: 'cm' },
		{ value: 'inches', label: 'in' }
	];
</script>

<div class="settings__wrapper">
	<button
		class="settings__toggle"
		aria-label="Weather unit settings"
		aria-expanded={isOpen}
		onclick={() => (isOpen = !isOpen)}
	>
		<SettingsIcon height={32} width={32} />
	</button>

	{#if isOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<div class="settings__overlay" onclick={() => (isOpen = false)}></div>
		<div class="settings__menu" role="menu">
			<div class="settings__header"></div>
			<fieldset class="settings__group">
				<legend class="settings__label">Temperature</legend>
				<div class="settings__options">
					{#each TEMP_OPTIONS as opt}
						<button
							class={[
								'settings__option',
								{ 'is-active': unitPreferences.temperature === opt.value }
							]}
							onclick={() => (unitPreferences.temperature = opt.value)}
						>
							{opt.label}
						</button>
					{/each}
				</div>
			</fieldset>

			<fieldset class="settings__group">
				<legend class="settings__label">Wind speed</legend>
				<div class="settings__options">
					{#each WIND_OPTIONS as opt}
						<button
							class={['settings__option', { 'is-active': unitPreferences.wind === opt.value }]}
							onclick={() => (unitPreferences.wind = opt.value)}
						>
							{opt.label}
						</button>
					{/each}
				</div>
			</fieldset>

			<fieldset class="settings__group">
				<legend class="settings__label">Precipitation</legend>
				<div class="settings__options">
					{#each PRECIP_OPTIONS as opt}
						<button
							class={[
								'settings__option',
								{ 'is-active': unitPreferences.precipitation === opt.value }
							]}
							onclick={() => (unitPreferences.precipitation = opt.value)}
						>
							{opt.label}
						</button>
					{/each}
				</div>
			</fieldset>
		</div>
	{/if}
</div>

<style>
	.settings__wrapper {
		position: relative;
	}

	.settings__toggle {
		background-color: var(--card-color);
		border-radius: var(--spacing-x-small);
		padding: var(--spacing-xx-small);
		border: 1px solid var(--color-border);
	}

	.settings__toggle :global(svg) {
		color: var(--color-text);
	}

	.settings__overlay {
		position: fixed;
		inset: 0;
		z-index: 40;
	}

	.settings__menu {
		position: absolute;
		right: 0;
		z-index: 40;
		margin: 0;
		padding: var(--spacing-small);
		background-color: var(--card-color);
		list-style: none;
		background-color: var(--card-color);
		border: 1px solid var(--color-border);
		border-radius: var(--spacing-x-small);
		box-shadow: var(--card-color-shadow);
	}

	.settings__group {
		border: none;
	}

	.settings__label {
		color: var(--color-text);
	}

	@media (hover: hover) {
		.settings__wrapper button:hover {
			background: var(--color-background-row-selected);
			cursor: pointer;
		}
	}
</style>
