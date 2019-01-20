- Interesting that a text here is ignored and thus can be used as *comment*.
<!--
- the "referenzen" come from kuehne-webdienste.de via axios
- you could make a sub component if the list is needed more often

TODO: preload custum routes as described in tutorial and pass already fetched content via "payload" into component

-->
<template>
	<main class="blog-page">
		<h1>{{title}}</h1>
		<nav>
			<ul>
				<li v-for="r in sub_articles" v-bind:key="r.id">
					<nuxt-link v-bind:to="'/referenzen/'+r.id">{{ r.title }}</nuxt-link>
				  </li>
			</ul>
		</nav>
	</main>
</template>

<script>
import axios from 'axios'

export default {
	// ! this approach does NOT lead to static content page index.html
	// mounted () {
	// 	axios
	// 		// .get('https://api.coindesk.com/v1/bpi/currentprice.json')
	// 		.get('https://www.kuehne-webdienste.de/api/articles/3/1')
	//         .then(response => {
	// 			this.references = response.data.sub_articles;
	// 			this.referencesPageTitle = response.data.title
	// 		})
	// },
	// data () {
	// 	return {
	// 		references : null,
	// 		referencesPageTitle : ''
	// 	}
	// }

	// - with this code you can access original field names of JSON in template above
	async asyncData({params}) {
		const { data } = await axios.get('https://www.kuehne-webdienste.de/api/articles/3/1') // without body content
		return data;
	}
}
</script>
