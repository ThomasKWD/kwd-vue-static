<template>
	<content-card>
		<span slot="card-heading">{{cardTitle}} <span class="sub-title">{{sub_title}}</span></span>
		<figure v-if="imageLink"><img :src="imageLink"  /></figure>
		<!-- <div class="card-body" v-html="body"></div> -->
		<div class="links"><nuxt-link :to="continueLink">Mehr lesen</nuxt-link></div>
	</content-card>
</template>

<script>
import constants from '~/modules/projectConstants'
import ContentCard from '~/components/ContentCard.vue'

export default {
	data({previewContent}) {

		let pBody = previewContent.articles[0].body
		let firstParagraph = RegExp(/<p*?>[^]*?<\/p>/)
		let firstImageUrl = RegExp(/<img.*?src="(.*?)"/) // only for media_manager types

		let imageLinkCheck = firstImageUrl.exec(pBody);
		console.log(imageLinkCheck)
		let imageLink
		if (imageLinkCheck !== null && imageLinkCheck[1]) {
			imageLink = constants.basePath + imageLinkCheck[1].replace('&amp;','&')
		}
		else {
			imageLink = '';
		}

		// ??? better check data (json from eternal source could be malformed)
		return {
			// ! must follow internal structure of JSON from API
			// - contains list of articles and we choose the first
			// ! only valid if type == 'start article of sub category'
			cardTitle : previewContent.articles[0].name,
			// body : firstParagraph.exec(pBody)[0], // exec returns *first* occurance
			// cardTitle : 'previewContent.articles[0].name',
			// body : 'previewContent.articles[0].body',
			sub_title : '',
			continueLink : `/${constants.referencesPathName}/${previewContent.articles[0].id}`,
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
