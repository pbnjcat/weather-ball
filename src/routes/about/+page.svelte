<script lang="ts">
</script>

<section class="container">
	<h1>About &amp; Privacy</h1>
	<p>
		Weatherball is a free tool for checking current conditions and multi-day forecasts. Weather and
		location data come from the
		<a href="https://open-meteo.com/" rel="noopener noreferrer" target="_blank">Open-Meteo API</a>.
	</p>

	<h2>Privacy</h2>
	<ul>
		<li>
			When you search for a location, that query is sent to Open-Meteo to look up the matching
			location.
		</li>
		<li>
			<strong>Hosting.</strong> Weatherball is hosted on Cloudflare Pages for processing requests to
			serve the app; see
			<a href="https://www.cloudflare.com/privacypolicy/" rel="noopener noreferrer" target="_blank"
				>Cloudflare's privacy policy</a
			>.
		</li>
	</ul>

	<h2>Open source</h2>
	<p>
		Weatherball is open source under the MIT License. Read the code, file an issue, or fork it at
		<a href="https://github.com/pbnjcat/weather-ball" rel="noopener noreferrer" target="_blank"
			>https://github.com/pbnjcat/weather-ball</a
		>.
	</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-medium);
	}

	h1 {
		margin-bottom: 0;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-x-small);
		padding-left: var(--spacing-medium);
	}
</style>
