<script lang="ts">
	import type { Component, Snippet } from 'svelte';

	interface Props {
		Icon: Component;
		label: string;
		value: number;
		unit?: string;
		description?: Snippet;
	}

	let { Icon, label, value, unit, description }: Props = $props();
</script>

<div class="card">
	<div class="card__header">
		<Icon class="card-icon-svg" />
		<h3>{label}</h3>
	</div>
	<p class="card__value">{value}<span class="unit">{unit}</span></p>
	{#if description}
		<p class="card__description">{@render description()}</p>
	{/if}
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		padding: var(--spacing-small);
		background-color: var(--card-color);
		border-radius: var(--spacing-x-small);
		color: var(--color-text);
		width: 100%;
	}

	.card__header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: var(--spacing-xx-small);
		color: var(--color-text);
	}
	.card__header h3 {
		font-size: var(--font-size-body-normal);
		font-weight: var(--font-weight-regular);
		color: var(--color-text-muted);
	}

	.card .card__description {
		color: var(--color-text-muted);
		font-size: var(--font-size-body-small);
		font-weight: var(--font-weight-regular);
	}

	.card__value {
		padding-block: var(--spacing-medium);
		font-weight: var(--font-weight-regular);
		font-size: var(--font-size-heading-1);
	}

	.card :global(.card-icon-svg) {
		height: 24px;
		width: auto;
	}
</style>
