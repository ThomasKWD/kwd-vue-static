<!--
- TODO: get already fetched data (if so) via payload
-->
<template>
	<article class="reference-post">
		<h1>{{title}}</h1>
		<div class="post-body" v-html="body"></div>
	</article>
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

	async asyncData({params}) {
		// console.log('trying to request: ');
		// console.log(`https://www.kuehne-webdienste.de/api/articles/${params.id}/1/content`)
		// ! construct only working, if var is named 'data'
		const { data } = await axios.get(`https://www.kuehne-webdienste.de/api/articles/${params.id}/1/content`)
		// since there is no real marker (except checking the names of the root categories) we still need to hard code the id of entry point

		// we should:
		// - extract and copy images
		// - find and convert internal links, actually redaxo:// links are better to recognize than index.php?article_id links

		if (typeof data.body !== 'undefined') {
			// make img links complete (cross reference possible???)
			data.body = data.body.replace(/src="index.php/g,'src="https://www.kuehne-webdienste.de/index.php');
			// ... direct link to large img source
			data.body = data.body.replace(/href="files\//g,'href="https://www.kuehne-webdienste.de/files/');
			// ... redaxo link
			// - actually you must read to parent category, check which type it is (e.g. Referenz or News), then make link accordingly like /referenzen/2 or blog/48
			// - read article from redaxo link as json from kwd, check parent and decide (e.g. parent id == 3 then reference)
			data.body = data.body.replace(/redaxo:\/\/(.*)"/g,'/blog/$1"');
		}
		return data; // ! data Object returned directly thus just include the fields e.g. {{title}}
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
