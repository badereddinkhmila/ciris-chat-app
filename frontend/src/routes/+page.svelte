<div class="main">
	<div class="logo"><b>w<span>el</span>co<span>m</span>e</b></div>
</div>

<style lang="scss">
	.main {
		@apply h-full m-0;
	}
	.logo {
		text-align: center;
		width: 65%;
		height: 250px;
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		user-select: none;
	}

	.logo b {
		font: 400 19vh 'Vibur';
		color: #fee;
		text-shadow:
			0 -40px 100px,
			0 0 2px,
			0 0 1em #00CAB1,
			0 0 0.5em #00CAB1,
			0 0 0.1em #00CAB1,
			0 10px 3px #000;
	}
	.logo b span {
		animation: blink linear infinite 2s;
	}
	.logo b span:nth-of-type(2) {
		animation: blink linear infinite 3s;
	}
	@keyframes blink {
		78% {
			color: inherit;
			text-shadow: inherit;
		}
		79% {
			color: #333;
		}
		80% {
			text-shadow: none;
		}
		81% {
			color: inherit;
			text-shadow: inherit;
		}
		82% {
			color: #333;
			text-shadow: none;
		}
		83% {
			color: inherit;
			text-shadow: inherit;
		}
		92% {
			color: #333;
			text-shadow: none;
		}
		92.5% {
			color: inherit;
			text-shadow: inherit;
		}
	}
</style>
