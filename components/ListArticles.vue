<!--
Displays preview list with titles and links
- no data connection, this should be done by *derived* components
- removed surrounding <nav></nav> because  not needed semantically

- no real difference between ListArticlesOfCategory and ListSubCategories except creating the data
  -> could just pass a flag when used because we pass something anyway (api link or at least id of start point)
-->
<template>
	<content-card>
		<span slot="card-heading">{{cardTitle}} <span class="sub-title">{{sub_title}}</span></span>
		<ul>
			<li v-for="b in articles" v-bind:key="b.id">
				<!-- must provide leading slash OR pre generate link -->
				<nuxt-link v-bind:to="pathBase+b.id">{{ b.name }}</nuxt-link>
			</li>
		</ul>
	</content-card>
</template>

<script>
import ContentCard from '~/components/ContentCard.vue'
import axios from 'axios'
// you can have data AND asyncData, examine side effects (ssr)
export default {
	// ??? read: https://nuxtjs.org/faq/async-data-components/
	data({apiId, catType, listType}) { // ??? better read context and check fields for existence

		// ! mock data
		return {
			// you can also use this.<prop>
			sub_title : '', // currently unused
			apiList : listType,
			cardTitle : this.title, // ??? how to dispatch data to slot parent
			cType : ContentCard.data().componentType,
			pathBase: '/'+catType+'/',
			test : 'normal data()',
			articles : this.articleData
		}
	},
	components:  {
		ContentCard
	},
	props : [
		'catType',
		'subtitle',
		'listType',  // you can also write 'list-type'
		'articleData',
		'title'
	]
}

</script>
