<script lang="ts">
	interface Props {
		slug: string;
		style?: 'fill' | 'monochrome';
		animated?: boolean;
		size?: number;
	}

	let { slug, style = 'fill', animated = true, size = 64 }: Props = $props();

	const animatedIcons = import.meta.glob('/node_modules/@meteocons/svg/**/*.svg', {
		query: '?url',
		import: 'default'
	}) as Record<string, () => Promise<string>>;

	const staticIcons = import.meta.glob('/node_modules/@meteocons/svg-static/**/*.svg', {
		query: '?url',
		import: 'default'
	}) as Record<string, () => Promise<string>>;

	let src = $state('');

	$effect(() => {
		let cancelled = false;

		const pkg = animated ? '@meteocons/svg' : '@meteocons/svg-static';
		const path = `/node_modules/${pkg}/${style}/${slug}.svg`;
		const loader = (animated ? animatedIcons : staticIcons)[path];

		if (loader) {
			loader().then((url) => {
				if (!cancelled) src = url;
			});
		} else {
			src = '';
		}

		return () => {
			cancelled = true;
		};
	});
</script>

{#if !src}
	<div style={`width:${size}px;height:${size}px`}></div>
{:else}
	<img {src} alt={slug} width={size} height={size} />
{/if}
