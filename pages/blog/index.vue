Interesting that a text here is ignored and thus can be used as *comment*.

actually you would need a base page template (see layouts) which contains structures which

TODO: concept: general API reader which automates the main categories and fills in references OR news OR offers in sub pages

IDEA: combine blog entries from static _posts (netlify) and dynamic api content (Redaxo)

??? the component "blog list" doesn't help much if you like to generate static blog article pages
	you have to integrate the list of found blog entries in the custom routes definition (nuxt.config.js)
<template>
	<main class="blog-page page">
		<h1>Blog</h1>
		<nav>
			<ul>
				<li v-for="r in sub_articles" v-bind:key="r.id">
					<nuxt-link v-bind:to="'/blog/'+r.id">{{ r.title }}</nuxt-link>
				  </li>
			</ul>
		</nav>
	</main>
</template>

<script>
import axios from 'axios';

export default {
	async asyncData({params}) {
		const { data } = await axios.get('https://www.kuehne-webdienste.de/api/articles/25/1') // without body content
		return data;
	},
	head () {
		return {
			title : 'Blog'
		}
	}
}</script>
