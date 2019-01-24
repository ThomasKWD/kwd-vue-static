??? read
<template>
	<main class="page">
		<article class="blog-post">
			<h1>{{title}}</h1>
			<div class="post-body" v-html="body"></div>
		</article>
	</main>
</template>

<script>
import constants from '~/modules/projectConstants'
import axios from 'axios';

// var markDownIt = require('markdown-it')
// var md = new markDownIt();

export default {
	// async asyncData({params}) {
	// 	var postData = BlogList.data().blogs[params.id - constants.netlifyBlogStartId -1 ]; // -1 because its an index
	// 	return {
	// 		title : postData.title,
	// 		markdownBlogHtml : md.render(postData.body),
	// 		// head : function () {
	// 		// 	return {
	// 		// 		title : postData.title // gets title property from returned data
	// 		// 	}
	// 		// }
	// 	}
	// },
	async asyncData(context) {

		var result;
		// ! only working, if var is named 'data'
		var data = {};

		// ! payload is only for 'nuxt generate' you will need to access axios directly when "nuxt"
		if (context.payload) {
			// data = context.payload.sub_article;
			data = context.payload;
			console.log(`payload for blog ${data.id} found`)
			// console.log(context.payload)
		}
		else {
			if (context.params.id > constants.netlifyBlogStartId) {
				console.log(`found constants.netlifyBlogStartId: ${context.data.id}`)
			}
			else {
				result = await axios.get(`https://www.kuehne-webdienste.de/api/articles/${context.params.id}/1/content`)
				data = result.data;
			}
		}

		// TODO: provide this as a separate module to be used in several templates
		if (typeof data.body !== 'undefined') {
			// make img links complete (cross reference possible???)
			data.body = data.body.replace(/src="index.php/g,'src="https://www.kuehne-webdienste.de/index.php');
			// ... direct link to large img source
			data.body = data.body.replace(/href="files\//g,'href="https://www.kuehne-webdienste.de/files/');
			// ... redaxo link
			// - actually you must read to parent category, check which type it is (e.g. Referenz or News), then make link accordingly like /referenzen/2 or blog/48
			// - read article from redaxo link as json from kwd, check parent and decide (e.g. parent id == 3 then reference)

			// ??? actually you must parse the structure of the project to tell if link should be under blog, reference or other


			data.body = data.body.replace(/redaxo:\/\/12"/g,'/referenzen/12"');// shuri ryu test fake
			data.body = data.body.replace(/redaxo:\/\/(.*)"/g,'/blog/$1"');
		}
		return data; // ! data Object returned directly thus just include the fields e.g. {{title}}
	},
	head () {
		return {
			title : this.title
		}
	}
}
</script>

<style>
/* although better if code itself would be removed */
/* the cool thing is that these comments are not in the resulting css */
.blueimp-gallery {
	display:none;
}
</style>
