<!--
- TODO: get already fetched data (if so) via payload
-->
<template>
	<main class="page reference-page">
		<article class="reference-post">
			<h1>{{name}}</h1>
			<div class="post-body" v-html="body"></div>
		</article>
	</main>
</template>

<script>
import axios from 'axios'

export default {
	// mounted ({params}) {
	// 	axios
	// 		// .get('https://api.coindesk.com/v1/bpi/currentprice.json')
	// 		.get('https://www.kuehne-webdienste.de/api/articles/'+params.id+'/content') // default language
	//         .then(response => (reference = response.data))
	// },
	// data () {
	// 	return {
	// 		reference : null
	// 	}
	// }

	// async asyncData({params}) {
	async asyncData(context) {

		var result;
		// ! only working, if var is named 'data'
		var data = {};

		// ! payload is only for 'nuxt generate' you will need to access axios directly when "nuxt"
		if (context.payload) {
			// data = context.payload.sub_article;
			data = context.payload;
			console.log(`payload for reference ${data.id} found`)
			// console.log(context.payload)
		}
		else {
			try {

				result = await axios.get(`https://www.kuehne-webdienste.de/api/categories/${context.params.id}/0/articles/contents`)
				data = result.data;
				data.body = data.articles[0].body // ! articles[0] could be undefined
			}
			catch (e) {
				data.categories = []
				data.name = 'Referenz'
				data.body = '<p>[Daten für diese Seite konnten nicht geladen werden.]</p>'
			}
		}

		// const {data} = null;
		// var data;
		// }
		// console.log(context);
		// since there is no real marker (except checking the names of the root categories) we still need to hard code the id of entry point

		// we should:
		// - extract and copy images

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
			data.body = data.body.replace(/redaxo:\/\/(.*)"/g,'/blog/$1"');
		}

		return data; // ! data Object returned directly thus just include the fields e.g. {{title}}
	},
	head () {
		return {
			title : this.name // must also be renamed when data has 'name'
		}
	}
}
</script>

<style lang="scss">
@import '../../assets/_shapes';

.reference-page {
	@include blockShapeBottom;

	.reference-post {
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
	.reference-post::after {
		content: " ";
		clear:both;
		float:none;
	}
}

/* although better if code itself would be removed */
/* the cool thing is that these comments are not in the resulting css */
.blueimp-gallery {
	display:none;
}
</style>
