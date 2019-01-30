<template>
	<div class="MainPageFooter main-page-region">
		<div class="contact">
			<p>
				<nuxt-link to="/kontakt" class="btn">Kontakt</nuxt-link>
			</p>
		</div>
		<div class="copyright">
			<p>&copy; 2018-2019 by <a href="https://kuehne-webdienste.de">Kühne-Webdienste.de</a></p>
		</div>

	</div>
</template>

<style lang="scss">
@import '../assets/_shapes';

.MainPageFooter {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	@include blockShape;

	background-color: #093f58;
	color: #b4dafd;
	border:1px solid white;


	a,a:hover {
		color:white;
	}
}
.MainPageFooter>contact {
}
.MainPageFooter>copyright {
}
</style>
