<!--Interesting that a text here is ignored and thus can be used as *comment*.

actually you would need a base page template (see layouts) which contains structures which

TODO: concept: general API reader which automates the main categories and fills in references OR news OR offers in sub pages

TODO: find problem of not parsing body of *.md files (_posts/blog)
IDEA: combine blog entries from static _posts (netlify) and dynamic api content (Redaxo)

??? the component "blog list" doesn't help much if you like to generate static blog article pages
	you have to integrate the list of found blog entries in the custom routes definition (nuxt.config.js)
-->
<template>
	<main class="reference-page page">
		<h1>Blog</h1>
		<nav>
			<ul>
				<li v-for="r in articles" v-bind:key="r.id">
					<nuxt-link v-bind:to="'/blog/'+r.id">{{ r.name }}</nuxt-link>
				  </li>
			</ul>
		</nav>
	</main>
</template>

<script>
import {kwdApiGet} from '~/modules/kwdApiGet';

export default {
	async asyncData({params}) {
		let data = await kwdApiGet(21,'artList') // without body content
		data.articles.shift() // remove start article fro News
		return data
	},
	head () {
		return {
			title : 'Blog'
		}
	}
}</script>


<style lang="scss">
@import '../../assets/_shapes';

// ??? you really should make a general page layout OR a mech to include all the styles
.page {
	@include blockShapeBottom;

	h1 {
		font-weight: normal;
		font-size: 200%;
		margin-bottom: 1em;
	}
}

/* although better if code itself would be removed */
/* the cool thing is that these comments are not in the resulting css */
.blueimp-gallery {
	display:none;
}

	</style>
