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
		console.log('trying to request: ');
		console.log(`https://www.kuehne-webdienste.de/api/articles/${params.id}/1/content`)
		// ! construct only working, if var is named 'data'
		const { data } = await axios.get(`https://www.kuehne-webdienste.de/api/articles/${params.id}/1/content`)
		// since there is no real marker (except checking the names of the root categories) we still need to hard code the id of entry point

		return data; // ! data Object returned directly thus just include the fields e.g. {{title}}
	}
}
</script>
