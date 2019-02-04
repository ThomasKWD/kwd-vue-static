<!--
??? this has almost identical code to /leistungen/index.vue - how to improve?
??? could you use ../_.vue with parameters

TODO: preload custum routes as described in tutorial and pass already fetched content via "payload" into component

-->
<template>
	<main class="references-page page">
		<list-articles
			cat-type="referenzen"
			v-bind:article-data="articles"
		></list-articles>
		-- just need the .card-container here
	</main>
</template>

<script>
import {kwdApiGet} from '~/modules/kwdApiGet'
import ListArticles from '~/components/ListArticles.vue'

export default {
	asyncData : async () => ({articles : await kwdApiGet(3,'catList')}),
	components : {
		ListArticles
	},
	head () {
		return {
			title : 'Referenzen'
		}
	}
}
</script>
