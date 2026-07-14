<script lang="ts">
	import type { GeocodeLocation } from '$lib/types';
	import BrandGithubFilled from 'virtual:icons/tabler/brand-github-filled';
	import CurrentLocationFilled from 'virtual:icons/tabler/current-location-filled';
	import CloseX from 'virtual:icons/tabler/x';
	import { DEFAULT_SUGGESTIONS } from '$lib/constants';
	import Logo from '$lib/assets/logo/weatherball-01.svg';
	import ThemeToggle from './ThemeToggle.svelte';

	let {
		searchTerm = $bindable(),
		isLoading = false,
		searchResults = [],
		searchError,
		onSelect
	}: {
		searchTerm: string;
		isLoading: boolean;
		searchResults: GeocodeLocation[];
		searchError: string | undefined;
		onSelect?: (location: GeocodeLocation) => void;
	} = $props();

	let isOpen = $state(false);
	let searchInput: HTMLInputElement | null = $state(null);
	let displayResults = $derived(searchTerm?.length > 0 ? searchResults : DEFAULT_SUGGESTIONS);

	function closeSearch() {
		isOpen = false;
		searchInput?.blur();
	}
	function clearSearch() {
		searchTerm = '';
		searchInput?.focus();
	}

	function onInputKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeSearch();
	}
	function onWindowKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			searchInput?.focus();
		}
	}

	function selectLocation(e: MouseEvent, location: GeocodeLocation) {
		e.preventDefault();
		searchTerm = location.name + ',' + location.country;
		closeSearch();
		onSelect?.(location);
	}
</script>

<svelte:window onkeydown={onWindowKeydown} />

<header>
	<nav class="container">
		<img src={Logo} alt="Logo" class="logo" />
		<div class="nav-buttons">
			<a class="github-link" href="https://github.com/pbnjcat/weather-ball">
				<BrandGithubFilled height={32} width={32} />
			</a>
			<ThemeToggle />
		</div>
	</nav>
</header>
<form class="container" role="search" onsubmit={(e) => e.preventDefault()}>
	<div class="search-wrapper">
		<label class={['search-bar', { open: isOpen }]}>
			<CurrentLocationFilled height={36} width={36} />
			<input
				bind:this={searchInput}
				bind:value={searchTerm}
				onfocus={() => (isOpen = true)}
				onkeydown={onInputKeydown}
				autocomplete="off"
				type="search"
				name="location"
				placeholder="Search City"
				aria-label="Search city"
			/>
			<button
				type="button"
				class={['clear-search-icon', { hidden: !searchTerm }]}
				aria-label="Clear search"
				onclick={clearSearch}
			>
				<CloseX height={36} width={36} />
			</button>
			<kbd class="shortcut" aria-hidden="true">⌘K</kbd>
		</label>

		{#if isOpen}
			<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
			<div class="modal-overlay" onclick={closeSearch}></div>
			<div class="dropdown">
				{#if isLoading}
					<div class="loading">Searching...</div>
				{:else if searchError}
					<div class="error">{searchError}</div>
				{/if}

				{#if !isLoading && displayResults.length > 0}
					<ul class="results-list">
						{#each displayResults as result}
							<li>
								<a
									href="/"
									aria-label={`Select location ${result.name}`}
									onclick={(e) => selectLocation(e, result)}
								>
									{result.name}
									{#if result.country}, {result.country}{/if}</a
								>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/if}
	</div>
</form>

<style>
	.search-wrapper {
		position: relative;
		z-index: 20;
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: -1;
	}

	header {
		width: 100%;
		background-color: inherit;
		padding-block: var(--spacing-large) var(--spacing-small);
	}

	header nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-buttons {
		display: flex;
		gap: var(--spacing-small);
		color: var(--color-background);
	}

	.github-link {
		display: flex;
		padding: var(--spacing-xx-small);
		color: var(--color-text);
		background: var(--card-color);
		border: 1px solid var(--color-border);
		border-radius: var(--spacing-x-small);
	}

	.github-link:active {
		box-shadow: var(--shadow-active);
	}

	.github-link:focus-visible {
		box-shadow: 0 0 0 3px oklch(0.62 0.17 256.75 / 0.25);
	}

	.logo {
		display: block;
		width: auto;
		height: 40px;
		object-fit: contain;
	}

	.search-bar {
		display: flex;
		justify-content: center;
		width: 100%;
		gap: var(--spacing-x-small);
		align-items: center;
		padding: var(--spacing-x-small) var(--spacing-small);
		border-radius: var(--spacing-small);
		border: 1px solid var(--color-border);
		box-shadow: inset 0 2px 4px 0 var(--color-border);
		cursor: pointer;
		flex-shrink: 0;
		background-color: var(--card-color);
		color: var(--color-text);
		&.open {
			border-radius: var(--spacing-small) var(--spacing-small) 0 0;
			border-bottom-color: transparent;
		}
	}

	.shortcut {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-body-normal);
		letter-spacing: var(--spacing-xx-small);
		padding: var(--spacing-xx-small) var(--spacing-large);
		background-color: rgb(228, 226, 226);
		border-radius: var(--spacing-small);
		border: 1px solid var(--card-shadow);
		user-select: none;
		color: var(--color-text-muted);
		background-color: var(--color-background);
	}

	.clear-search-icon {
		border: none;
		background: none;
		cursor: pointer;
		color: inherit;

		&.hidden {
			visibility: hidden;
			pointer-events: none;
		}
	}

	:global(html[data-theme='dark']) .search-bar {
		box-shadow: inset 0 2px 5px 0 oklch(0 0 0 / 0.45);
	}

	.search-bar:focus-within {
		cursor: text;
	}

	.search-bar input {
		border: none;
		outline: none;
		width: 100%;
		color: inherit;
		background-color: inherit;
		font-size: var(--font-size-body-normal);
		cursor: inherit;
	}

	.dropdown {
		position: absolute;
		left: 0;
		right: 0;
		margin: 0;
		background-color: var(--card-color);
		border: 1px solid var(--color-border);
		border-top: none;
		border-radius: 0 0 var(--spacing-small) var(--spacing-small);
		overflow: hidden;
	}

	.results-list {
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--font-size-heading-3);

		a {
			display: block;
			padding: var(--spacing-small);
			text-decoration: none;
			color: var(--color-text);
		}
	}

	@media (hover: hover) {
		.github-link:hover {
			background-color: var(--color-background-row-selected);
			cursor: pointer;
		}
		.results-list a:hover {
			background-color: var(--color-row-hover);
		}

		.results-list a:hover,
		a:focus-visible {
			background-color: var(--color-background-row-selected);
			color: var(--color-primary);
		}
	}
</style>
