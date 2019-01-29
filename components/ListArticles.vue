<!--
Displays preview list with titles and links
- no data connection, this should be done by *derived* components
- removed surrounding <nav></nav> because  not needed semantically

- no real difference between ListArticlesOfCategory and ListSubCategories except creating the data
  -> could just pass a flag when used because we pass something anyway (api link or at least id of start point)
-->
<template>
	<content-card>
		<span slot="card-heading">{{title}} <span class="sub-title">{{sub_title}}</span></span>
		<ul>
			<li v-for="b in articles" v-bind:key="b.id">
				<!-- must provide leading slash OR pre generate link -->
				<nuxt-link v-bind:to="pathBase+b.id">{{ b.name }}</nuxt-link>
			</li>
		</ul>
		Pfad: {{pathBase}}, Request : {{apipath}}, type : {{apiList}}, cType: {{cType}}
	</content-card>
</template>

<script>
import ContentCard from '~/components/ContentCard.vue'

export default {
	// you can have data AND asyncData, examine side effects (ssr)
	data : function({subtitle, apirequest, listType}) { // ??? better read context and check fields for existence!

		// ! mock data
		return {

			sub_title : subtitle,
			apipath : apirequest,
			apiList : listType,
			title : 'hurray i come from list', // ??? how to dispathc data to slot parent
			cType : ContentCard.data().componentType,
			pathBase: '/'+apirequest.substr(0, apirequest.indexOf('/'))+'/',
			articles : [
				{
					id : 1,
					name : 'Artikcle 1'
				},
				{

					id : 2,
					name : 'Artikcle 2'
				},
				{

					id : 3,
					name : '3rd one'
				}
			]
		}
	},
	components:  {
		ContentCard
	},
	props : [
		'apirequest',
		'subtitle',
		'listType'  // you can also write 'list-type'
	]
}

</script>
