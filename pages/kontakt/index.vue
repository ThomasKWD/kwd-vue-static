<!--

??? already get data in custom route, parse "redaxo://" links there and generate sub pages, eg. for license and privacy policy

-->
<template>
	<main class="reference-page page">
		<h1>{{name}}</h1>
		<div class="contact-body" v-html="body"></div>
	</main>
</template>

<script>
// import axios from 'axios'
// import kwdApiReader from '~/kwdApiReader'
import {kwdApiGet} from '~/modules/kwdApiGet'


export default {
	async asyncData() {


// planned:
		// let {data} = await kwdApiGet('categories/2/articles/contents','body')
		// let {data} = await kwdApiGet(2,'body','content')
		// let {data} = await kwdApiGet({
		// 	id : 2,
		// 	type : 'catList',
		// 	includes : 'content'
		// })

		// return data.articles[0];
		return await kwdApiGet(2,'article')
	},
	head () {
		return {
			// get from data which is been set by API call:
			title : this.name
		}
	}

}</script>

<style lang="scss">
@import '../../assets/_shapes';

.reference-page {
	@include blockShapeBottom;
}
</style>
