<!--Interesting that a text here is ignored and thus can be used as *comment*.

actually you would need a base page template (see layouts) which contains structures which

TODO: concept: general API reader which automates the main categories and fills in references OR news OR offers in sub pages

TODO: find problem of not parsing body of *.md files (_posts/blog)
IDEA: combine blog entries from static _posts (netlify) and dynamic api content (Redaxo)

??? the component "blog list" doesn't help much if you like to generate static blog article pages
	you have to integrate the list of found blog entries in the custom routes definition (nuxt.config.js)
-->
<template>
	<main class="offers-page page">
		<h1>Leistungen</h1>
		<nav>
			<ul>
				<li v-for="r in categories" v-bind:key="r.id">
					<nuxt-link v-bind:to="'/leistungen/'+r.id">{{ r.name }}</nuxt-link>
				  </li>
			</ul>
		</nav>
	</main>
</template>

<script>
import axios from 'axios';

export default {
	async asyncData({params}) {
		let data = {}

		try {

			data  = await axios.get('https://www.kuehne-webdienste.de/api/articles/4/1').data // without body content
			if (!Array.isArray(data.categories)) data.categories = []

		}
		catch (e) {
			console.log(e)
			data.name = 'Keine Daten'
			data.categories = []
		}

		return data;
	},
	head () {
		return {
			title : 'Leistungen'
		}
	}
}</script>
