<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		Icon: Component;
		label: string;
		value: number;
		unit?: string;
		description?: string;
	}

	let { Icon, label, value, unit, description }: Props = $props();
</script>

<div class="card-content">
	<div class="card-header">
		<Icon class="card-icon-svg" />
		<h3>
			<span>{label}</span>
		</h3>
	</div>
	<p class="card-value">
		{value}
		<span class="unit">{unit}</span>
	</p>
	{#if description}
		<p class="card-description">{description}</p>
	{/if}
</div>

<style>
	.card-content {
		padding: var(--spacing-small);
		background-color: var(--card-color);
		border-radius: var(--spacing-x-small);
		color: var(--color-text);
		width: 100%;
		box-sizing: border-box;
	}

	.card-header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: inherit;
	}

	.card-description {
		color: inherit;
	}

	.card-value {
		font-size: var(--font-size-heading-1);
	}
	
	.card-content :global(.card-icon-svg) {
		padding: var(--spacing-xx-small);
		height: 32px;
		width: auto;
	}
</style>
