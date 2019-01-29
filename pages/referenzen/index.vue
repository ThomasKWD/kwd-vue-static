- Interesting that a text here is ignored and thus can be used as *comment*.
<!--
- the "referenzen" come from kuehne-webdienste.de via axios
- you could make a sub component if the list is needed more often

TODO: preload custum routes as described in tutorial and pass already fetched content via "payload" into component

-->
<template>
	<main class="references-page page">
		<h1>{{name}}</h1>
		<nav>
			<ul>
				<li v-for="r in categories" v-bind:key="r.id">
					<nuxt-link v-bind:to="'/referenzen/'+r.id">{{ r.name }}</nuxt-link>
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
		let data

		try {
			let res = await axios.get('https://www.kuehne-webdienste.de/api/categories/3')
			data = res.data
			// ??? make api generate empty array?
			// check for empty array here
			if (!Array.isArray(data.categories)) data.categories = []
		}
		catch (e) {
			console.log(e)
			data = {

				/// stupid because equals to name read from api
				name : 'Referenzen',
				categories :  [] // prevents error
			}
		}
		return data;
	},
	head () {
		return {
			title : 'Referenzen'
		}
	}
}
</script>
