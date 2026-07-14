<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import Sun from 'virtual:icons/tabler/sun';
	import MoonStars from 'virtual:icons/tabler/moon-stars';
	import DeviceDesktop from 'virtual:icons/tabler/device-desktop';
	import Check from 'virtual:icons/tabler/check';
	import { browser } from '$app/environment';
	import type { Component } from 'svelte';

	type Preference = 'light' | 'dark' | 'system';

	function readStoredPreference(): Preference {
		try {
			const storedTheme = localStorage.getItem('theme');
			return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'system';
		} catch (error) {
			return 'system';
		}
	}

	const prefersDark = new MediaQuery('(prefers-color-scheme: dark)');
	let preference = $state<Preference>(browser ? readStoredPreference() : 'system');
	let isOpen = $state(false);

	let appliedTheme = $derived(
		preference === 'system' ? (prefersDark.current ? 'dark' : 'light') : preference
	);

	const options: { value: Preference; label: string; icon: Component }[] = [
		{ value: 'light', label: 'Light', icon: Sun },
		{ value: 'dark', label: 'Dark', icon: MoonStars },
		{ value: 'system', label: 'System', icon: DeviceDesktop }
	];

	$effect(() => {
		document.documentElement.dataset.theme = appliedTheme;
	});

	function switchTheme(pref: Preference) {
		preference = pref;
		try {
			localStorage.setItem('theme', pref);
		} catch {}
		isOpen = false;
	}
</script>

<div class="theme-menu-wrapper">
	<button
		class="theme-toggle"
		aria-label="Theme options"
		aria-haspopup="menu"
		aria-expanded={isOpen}
		onclick={() => (isOpen = !isOpen)}
	>
		<MoonStars class="theme-menu-icon" data-icon="moon" />
		<Sun class="theme-menu-icon" data-icon="sun" />
	</button>
	{#if isOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<div class="menu-overlay" onclick={() => (isOpen = false)}></div>
		<ul class="theme-menu" role="menu">
			{#each options as opt}
				<li role="none">
					<button
						role="menuitemradio"
						class="theme-option"
						aria-checked={preference === opt.value}
						onclick={() => switchTheme(opt.value)}
					>
						<opt.icon class="theme-menu-icon" />
						{opt.label}
						{#if preference === opt.value}<Check />{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.theme-toggle {
		display: flex;
		outline: none;
		border: 1px solid var(--color-border);
		background: var(--card-color);
		padding: var(--spacing-xx-small);
		border-radius: var(--spacing-x-small);
		color: var(--color-text);
	}

	.theme-toggle :global(svg) {
		color: inherit;
		height: 2rem;
		width: auto;
		flex-shrink: 0;
	}

	.theme-menu-wrapper {
		position: relative;
	}

	.menu-overlay {
		position: fixed;
		inset: 0;
		z-index: 40;
	}

	.theme-menu {
		position: absolute;
		right: 0;
		z-index: 40;
		margin: 0;
		padding: var(--spacing-xx-small);
		min-width: 8rem;
		list-style: none;
		background-color: var(--card-color);
		border: 1px solid var(--color-border);
		border-radius: var(--spacing-x-small);
		box-shadow: var(--card-color-shadow);

		button {
			display: flex;
			align-items: center;
			width: 100%;
			gap: var(--spacing-xx-small);
			padding: var(--spacing-x-small);
			border: none;
			background: none;
			color: var(--color-text);
			border-radius: var(--spacing-xx-small);
			cursor: pointer;
		}
	}

	.theme-menu button :global(svg) {
		height: 1.25rem;
		width: auto;
		flex-shrink: 0;
	}

	:global(html[data-theme='dark']) .theme-toggle :global([data-icon='sun']) {
		display: none;
	}
	:global(html:not([data-theme='dark'])) .theme-toggle :global([data-icon='moon']) {
		display: none;
	}

	@media (hover: hover) {
		.theme-toggle:hover {
			background: var(--color-background-row-selected);
			cursor: pointer;
		}

		.theme-option:hover {
			background-color: var(--color-background-row-selected);
			color: var(--color-primary);
		}
	}
</style>
