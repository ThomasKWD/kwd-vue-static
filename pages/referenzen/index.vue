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

			<!-- <pre>{{blogs}}</pre> -->
		</nav>
	</main>
</template>

<script>
import axios from 'axios'
// mock data
var mockData = [
	{
		id : 1,
		title : 'Tolle Website 1 content view',
		body : '<p>Alles <b>klar</b> soweit!</p>'
	}
];

export default {
	async asyncData({params}) {
		// since there is no real marker (except checking the names of the root categories) we still need to hard code the id of entry point
		let { refData } = await axios.get('https://www.kuehne-webdienste/api/articles/3/1')
		console.log ('refData following...')
		console.log ('refData following...')
		return {
			// list contains subentries of article 3
			references : refData.list
		}
	}
}
</script>
