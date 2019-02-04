??? read
<template>
	<main class="blog-page page">
		<article class="blog-post post">
			<h1>{{name}}</h1>
			<div class="post-body" v-html="body"></div>
		</article>
		<div class="warning">Kann nichts anzeigen, da <b>redaxo4_api_json</b> auf den neuesten Stand gebracht werden muss.</div>
	</main>
</template>

<script>
import {kwdApiGet} from '~/modules/kwdApiGet'
import constants from '~/modules/projectConstants'
var cmsPosts = require('extended-netlify-cms-loader?collection=blog!../../static/admin/config.yml')

var markDownIt = require('markdown-it')
var md = new markDownIt();

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
			console.log('context.payload found')
			console.log(`payload for blog ${data.id} found`)
		}
		else {
			if (context.params.id > constants.netlifyBlogStartId) {
				// console.log(`found constants.netlifyBlogStartId: ${context.params.id}`)
				// var data = BlogList.data().blogs[context.params.id - constants.netlifyBlogStartId -1 ]; // -1 because its an index
				data = cmsPosts[context.params.id - constants.netlifyBlogStartId -1];
				// // TODO: resolve missing body problem (worked before)
				// console.log(`postData.body: ${data.body}`)
				// if (typeof data.body !== 'undefined') data.body = md.render(data.body); // ! ovewrites itself with "Markdown" rendered content
				// else data.body = '<p>ww</p>';
				// // 	return {
				// 		title : postData.title,
				// 		markdownBlogHtml : md.render(postData.body),
				// 		// head : function () {
				// 		// 	return {
				// 		// 		title : postData.title // gets title property from returned data
				// 		// 	}
				// 		// }
				data.body = ''
			}
			else {
				// result = await axios.get(`https://www.kuehne-webdienste.de/api/articles/${context.params.id}/1/content`)
				data = kwdApiGet(context.params.id,'article');
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
	// components : {
	// 	BlogList
	// },
	head () {
		return {
			title : this.name
		}
	}
}
</script>


<style lang="scss">
@import '../../assets/_shapes';

// ??? you really should make a general page layout OR a mech to include all the styles
.page {
	@include blockShapeBottom;

	post {
		h1 {
			font-weight: normal;
			font-size: 200%;
			margin-bottom: 1em;
		}

		.referenz-illu {
			float: left;
			margin-right:30px;
			margin-bottom: 30px;
		}
	}
	post::after {
		content: " ";
		clear:both;
		float:none;
		display: table;
		width:1px;
		height:1px;
		opacity: 0.01;
	}
}

/* although better if code itself would be removed */
/* the cool thing is that these comments are not in the resulting css */
.blueimp-gallery {
	display:none;
}
</style>
