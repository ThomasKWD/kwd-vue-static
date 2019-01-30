<template>
	<div class="MainPageFooter main-page-region">
	  <p>&copy; 2018-2019 by <a href="https://kuehne-webdienste.de">Kühne-Webdienste.de</a></p>

	</div>
</template>

<style lang="scss">
@import '../assets/_shapes';

.MainPageFooter {
	@include blockShape;

	background-color: #093f58;
	color: #b4dafd;
	border:1px solid white;
}
.MainPageFooter a {
	color:white;
}
.MainPageFooter a,
.MainPageFooter a:hover {
	color:white;
}
</style>
