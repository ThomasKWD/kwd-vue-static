??? read
<template>
	<main class="page">
		<article class="blog-post">
			<h1>{{title}}</h1>
			<div class="post-body" v-html="markdownBlogHtml"></div>
			<h2>Alle Posts:</h2>
			<blog-list/>
		</article>
	</main>
</template>

<script>
import BlogList from '~/components/BlogList.vue' //you can use any name
import constants from '~/modules/projectConstants'

var markDownIt = require('markdown-it')
var md = new markDownIt();

export default {
	async asyncData({params}) {
		var postData = BlogList.data().blogs[params.id - constants.netlifyBlogStartId -1 ]; // -1 because its an index
		return {
			title : postData.title,
			markdownBlogHtml : md.render(postData.body),
			// head : function () {
			// 	return {
			// 		title : postData.title // gets title property from returned data
			// 	}
			// }
		}
	},
	components:
	{
		BlogList
	},
	head () {
		return {
			title : this.title
		}
	}
}
</script>
