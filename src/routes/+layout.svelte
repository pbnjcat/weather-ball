<script lang="ts">
	import '$lib/assets/styles/globals.css';
	import favicon from '$lib/assets/logo/weatherball-02.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { debounceTimeout } from '$lib/utils';
	import { fetchLocations } from '$lib/services/geocode';
	import { DEFAULT_SUGGESTIONS } from '$lib/constants';
	import type { GeocodeLocation } from '$lib/types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { setUnitPreferenceContext, DEFAULT_PREFERENCES } from '$lib/services/unitPreference';

	let { children } = $props();

	let isLoading = $state(false);
	let query = $state('');
	let searchResults = $state<GeocodeLocation[]>([]);
	let searchError = $state<string | undefined>(undefined);
	let currentController: AbortController | null = null;

	const debounceSearch = debounceTimeout(500, async (searchTerm: string) => {
		if (currentController) {
			currentController.abort();
		}

		if (!searchTerm.trim()) {
			searchResults = [];
			isLoading = false;
			return;
		}

		currentController = new AbortController();
		isLoading = true;

		try {
			const results = await fetchLocations({ query: searchTerm }, fetch, currentController.signal);
			if (query === searchTerm) {
				searchResults = results;
			}
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') return;
			console.error('Search error:', error);
			searchResults = [];
			searchError = error instanceof Error ? error.message : 'Unknown error';
		} finally {
			isLoading = false;
		}
	});

	function selectCity(location: GeocodeLocation) {
		const slug = encodeURIComponent(location.name.toLowerCase().replace(/\s+/g, '-'));

		const url = new URL(`/${slug}`, page.url.origin);
		url.searchParams.set('id', location.id.toString());
		url.searchParams.set('city', location.name.toString());
		url.searchParams.set('country', location.country.toString());

		query = location.name;
		searchResults = [];

		goto(url, { noScroll: true });
	}

	let unitPreferences = $state({ ...DEFAULT_PREFERENCES });
	setUnitPreferenceContext(unitPreferences);

	if (browser) {
		const saved = localStorage.getItem('unitPreferences');
		if (saved) {
			try {
				Object.assign(unitPreferences, JSON.parse(saved));
			} catch {
				// if error return default
			}
		}
	}

	$effect(() => {
		if (browser) {
			localStorage.setItem('unitPreferences', JSON.stringify(unitPreferences));
		}
	});

	$effect(() => {
		debounceSearch(query);
	});
</script>

<svelte:head>
	<script lang="ts">
		// Injects in html head to prevent flash of unstyled content
		// requires SSR enabled
		try {
			const savedTheme = localStorage.getItem('theme');
			const theme =
				savedTheme === 'light' || savedTheme === 'dark'
					? savedTheme
					: matchMedia('(prefers-color-scheme: dark)').matches
						? 'dark'
						: 'light';
			document.documentElement.dataset['theme'] = theme;
		} catch (error) {
			document.documentElement.dataset.theme = 'light';
		}
	</script>
	<link rel="icon" href={favicon} />
	<title>Weatherball</title>
</svelte:head>

<Navbar
	bind:searchTerm={query}
	{isLoading}
	searchResults={query.trim() ? searchResults : DEFAULT_SUGGESTIONS}
	{searchError}
	onSelect={selectCity}
/>
<main id="main-content">
	{@render children?.()}
</main>
<Footer />
