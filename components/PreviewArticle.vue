<template>
	<content-card>
		<span slot="card-heading">{{cardTitle}} <span class="sub-title">{{sub_title}}</span></span>
		<figure v-if="imageLink"><img :src="imageLink"  /></figure>
		<!-- <div class="card-body" v-html="body"></div> -->
		<div class="links"><nuxt-link :to="continueLink">Mehr lesen</nuxt-link></div>
	</content-card>
</template>

<script>
import ContentCard from '~/components/ContentCard.vue'

export default {
	data({previewContent}) {

		let pBody = previewContent.body
		let firstParagraph = RegExp(/<p*?>[^]*?<\/p>/)
		let firstImageUrl = RegExp(/<img.*?src="(.*?)"/) // only for media_manager types

		let imageLinkCheck = firstImageUrl.exec(pBody);
		let imageLink
		if (imageLinkCheck !== null && imageLinkCheck[1]) {
			imageLink = process.env.basePath + imageLinkCheck[1].replace('&amp;','&')
		}
		else {
			imageLink = '';
		}

		// ??? better check data (json from eternal source could be malformed)
		return {
			// ! must follow internal structure of JSON from API
			// - contains list of articles and we choose the first
			// ! only valid if type == 'start article of sub category'
			cardTitle : previewContent.name,
			// body : firstParagraph.exec(pBody)[0], // exec returns *first* occurance
			// cardTitle : 'previewContent.articles[0].name',
			body : previewContent.body,
			sub_title : '',
			continueLink : `/${process.env.referencesPath}${previewContent.id}`,
			// ??? actually want to download images
			imageLink : imageLink
		}
	},
	components:  {
		ContentCard
	},
	props : [
		'catType',
		'previewContent' // you can also write 'preview-content'
	]
}
</script>
<style lang="scss">
@import '../assets/_shapes';

.preview-row {
	.card {
		@include blockShapeBottom;
	}
}

</style>
