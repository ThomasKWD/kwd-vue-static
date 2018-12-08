<template>
	<article class="reference-post">
		<h1>{{title}}</h1>
		<div class="post-body" v-html="referenceHtml"></div>
	</article>
</template>

<script>
// mock data
var refData = [
	{
		id : 1,
		title : 'Tolle Website 1 content view',
		body : '<p>Alles <b>klar</b> soweit!</p>'
	}
];

export default {
	async asyncData({params}) {
		var postData = refData[params.id - 1];
		return {
			title : postData.title,
			referenceHtml : postData.body + '-- param:'+params.id
		}
	},
}
</script>
