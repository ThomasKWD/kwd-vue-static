<!--

??? already get data in custom route, parse "redaxo://" links there and generate sub pages, eg. for license and privacy policy

-->
<template>
	<main class="contact-page page">
		<!-- <h1>{{name}}</h1> -->
		<div class="contact-body" v-html="body"></div>
	</main>
</template>

<script>
import {kwdApiGet} from '~/modules/kwdApi'

export default {
	asyncData : async () => await kwdApiGet(2,'article'),
	head () {
		return {
			// get from data which is been set by API call:
			title : this.name
		}
	}

}</script>

<style lang="scss">
@import '../../assets/_shapes';

h1,h2,ul,ol {
	font-weight: normal;
	margin-bottom: 30px;
}
// ! exception: make h2 like h1 here
h2 {
	font-size: 200%;
}
p {
	margin-bottom: 15px;
}

.page {
	@include blockShapeBottom;
}
</style>
