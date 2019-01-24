- Interesting that a text here is ignored and thus can be used as *comment*.
<!--
- the "referenzen" come from kuehne-webdienste.de via axios
- you could make a sub component if the list is needed more often

TODO: preload custum routes as described in tutorial and pass already fetched content via "payload" into component

-->
<template>
	<main class="references-page page">
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
	// - with this code you can access original field names of JSON in template above
	async asyncData({params}) {
		const { data } = await axios.get('https://www.kuehne-webdienste.de/api/articles/3/1') // without body content
		return data;
	},
	head () {
		return {
			title : 'Referenzen'
		}
	}
}
</script>
