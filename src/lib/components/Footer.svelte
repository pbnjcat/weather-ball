<script lang="ts">
	import BrandGithubFilled from 'virtual:icons/tabler/brand-github-filled';
	let currentDate = new Date().getFullYear();
</script>

<footer class="footer__wrapper">
	<div class="footer__links">
		<a href="/about">About &amp; Privacy</a>
		<a class="github-link" href="https://github.com/pbnjcat/weather-ball">
			<BrandGithubFilled height={20} width={20} />
			Support Project
		</a>
	</div>
	<p class="footer__copyright">© {currentDate} Weatherball</p>
</footer>

<style>
	.footer__wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-small);
		border-top: 1px solid var(--color-border);
		margin-top: var(--spacing-xx-large);
		padding-block: var(--spacing-medium);
	}

	.footer__links {
		display: flex;
		align-items: center;
		gap: var(--spacing-medium);
		font-size: var(--font-size-body-small);
	}

	.footer__links a:not(.github-link) {
		color: var(--color-text-muted);
		text-decoration: none;
	}

	.footer__links a:not(.github-link):hover {
		color: var(--color-text);
		text-decoration: underline;
	}

	.github-link {
		display: flex;
		align-items: center;
		gap: var(--spacing-xx-small);
		padding: var(--spacing-xx-small) var(--spacing-small);
		text-decoration: none;
		color: var(--color-text);
		background: var(--card-color);
		border: 1px solid var(--color-border);
		border-radius: var(--spacing-x-small);
		font-size: var(--font-size-body-small);
		font-weight: 500;
	}

	.footer__copyright {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-body-x-small);
	}

	@media (hover: hover) {
		.github-link:hover {
			background-color: var(--color-background-row-selected);
			cursor: pointer;
		}
	}
</style>