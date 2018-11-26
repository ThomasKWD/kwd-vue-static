<template>
	<article class="blog-post">
		<h1>{{title}}</h1>
		<div class="post-body" v-html="markdownBlogHtml"></div>
		<h2>Alle Posts:</h2>
		<blog-list/>
	</article>
</template>

<script>
import BlogList from '~/components/BlogList.vue' //you can use any name
var markDownIt = require('markdown-it')
var md = new markDownIt();

export default {
	async asyncData({params}) {
		var postData = BlogList.data().blogs[params.id - 1];
		return {
			title : postData.title,
			markdownBlogHtml : md.render(postData.body)
		}
	},
	components:
	{
		BlogList
	}

}
</script>
