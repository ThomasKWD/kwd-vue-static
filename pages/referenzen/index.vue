- Interesting that a text here is ignored and thus can be used as *comment*.
<!--
- the "referenzen" come from kuehne-webdienste.de via axios
- you could make a sub component if the list is needed more often

TODO: preload custum routes as described in tutorial and pass already fetched content via "payload" into component

-->
<template>
	<main class="blog-page">
		<h1>Referenzen</h1>
		<nav>
			<ul>
				<li v-for="r in references" v-bind:key="r.id">
					<nuxt-link v-bind:to="'/referenzen/'+r.id">{{ r.title }}</nuxt-link>
				  </li>
			</ul>
		</nav>
		<p>{{references}}</p>
	</main>
</template>

<script>
import axios from 'axios'

export default {
	mounted () {
		axios
			// .get('https://api.coindesk.com/v1/bpi/currentprice.json')
			.get('https://www.kuehne-webdienste.de/api/articles/3/1')
	        .then(response => (this.references = response.data.sub_articles))
	},
	data () {
		return {
			references : null
		}
	}
	// TODO: find out why below code not working:
	// async asyncData({params}) {
	// 	const { refData } = await axios.get('https://www.kuehne-webdienste.de/api/articles/3/1')
	// 	// since there is no real marker (except checking the names of the root categories) we still need to hard code the id of entry point
	//
	// 	console.log ('refData following...')
	// 	console.log ('refData following...')
	// 	return {
	// 		// list contains subentries of article 3
	// 		references : refData
	// 	}
	// }
}
</script>
