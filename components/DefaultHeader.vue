<!--
<div>
	<nuxt-link to="/">Home</nuxt-link> |
	<nuxt-link to="/leistungen">Leistungen</nuxt-link> |
	<nuxt-link to="/referenzen">Referenzen</nuxt-link> |
	<nuxt-link to="/blog">Blog</nuxt-link> |
	<nuxt-link to="/kontakt">Kontakt</nuxt-link>
</div>
-->
<template>
	<div class="MainPageHeader main-page-region">
		<div class="brand">
			<a href="/" title="gehe zur Startseite">
				<span class="brand-name">{{title}}</span> by
				<img src="/kwd-4-title.png" alt="Logo Kühne-Webdienste.de">
			</a>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			title : process.env.projectTitle
		}
	}
}
</script>

<style lang="scss">
@import '../assets/_shapes';
@import '../assets/_colors';

.MainPageHeader {
	@include blockShape;

	background-color: $colorKwdBlue;
	background-image: linear-gradient(to bottom left, darken($colorKwdBlue,7%),lighten($colorKwdBlue,7%));
	border:1px solid white;

	.brand {
		overflow: hidden;

		a {
			color: #0d63b4;
			&:hover,
			&:focus {
				color: #0d63b4;
				text-decoration: none;
			}
		}

		.brand-name {
		display: inline-block;
			font-size: 40px;
			padding-right: 20px;
			// padding-left: 20px;
		}

		img {
			margin-left: -8px;
			vertical-align: bottom;
		}

	}
}
</style>
