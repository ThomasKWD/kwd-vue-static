<!--
Interesting that a text here is ignored and thus can be used as *comment*.

??? the whole page is redundant: list occurs on start page, in menu, ...
??? just makes sense if more content found on main page (article 4)

actually you would need a base page template (see layouts) which contains structures which
-->
<template>
	<main class="offers-page page">
		<h1>Leistungen</h1>
		<list-articles
			cat-type="leistungen"
			v-bind:article-data="articles"
		></list-articles>
		-- just need the .card-container here
	</main>
</template>

<script>
// ??? try to make api call in card
import {kwdApiGet} from '~/modules/kwdApi'
import ListArticles from '~/components/ListArticles.vue'

export default {
	asyncData : async () => ({articles : await kwdApiGet(4,'catList')}),
	components : {
		ListArticles
	},
	head () {
		return {
			title : 'Leistungen'
		}
	}
}</script>
