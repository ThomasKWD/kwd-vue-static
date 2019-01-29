<!-- hope this is route for all unkonwn dynamic routes -->
<template>
	<main class=" page">
		<h1>{{name}}</h1>
		<!-- ??? no check of existing articles[0] -->
		<article class="post-body" v-html="articles[0].body"></article>

		<p>dynamischer article</p>
	</main>
</template>
<script>
import axios from 'axios'

export default {
	async asyncData(context) {

		var result;
		var data = {};

		// ! payload is only for 'nuxt generate' you will need to access axios directly when "nuxt"
		if (context.payload) {
			// data = context.payload.sub_article;
			data = context.payload;
			console.log(`payload for newcat ${data.id} found`)
			// console.log(context.payload)
		}
		else {
			data.name = 'no payload'
			data.articles = [
				{
					body : '<p>[Daten für diese Seite konnten nicht geladen werden.]</p>'
				}
			]
		}
		return data; // ! data Object returned directly thus just include the fields e.g. {{title}}
	},
	head () {
		return {
			title : this.name
		}
	}
}
</script>
