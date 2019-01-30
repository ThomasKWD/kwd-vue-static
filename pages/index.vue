<!-- ??? what if there are  dozens of cards
-->
<template>
  <section class="container">
    <div>

      <h1 class="subtitle">
        Willkommen auf meiner neuen Website!
	</h1>

	  <div class="container-grid-3">

		  <list-articles
			  v-bind:title="newsTitle"
			  list-type="sub-articles"
			  cat-type="blog"
			  v-bind:article-data="newsList"
		  ></list-articles>

		  <list-articles
			  v-bind:title="offersTitle"
			  list-type="sub-categories"
			  cat-type="leistungen"
			  v-bind:article-data="offersList"
		  ></list-articles>

		  <list-articles
			  v-bind:title="referencesTitle"
			  list-type="sub-categories"
			  cat-type="referenzen"
			  v-bind:article-data="referencesList"
		  ></list-articles>

	</div>
		<div class="container-grid-3">
		  <preview-article
			  cat-type="referenzen"
			  v-bind:preview-content="previews[0]"
		  ></preview-article>

		  <preview-article
			  cat-type="referenzen"
			  v-bind:preview-content="previews[1]"
		  ></preview-article>

		  <preview-article
			  cat-type="referenzen"
			  v-bind:preview-content="previews[3]"
		  ></preview-article>
	  </div>

	  <p style="display:none">cross link: <nuxt-link to="/newcat">Dyn Cat</nuxt-link>  - jetzt noch link dynamisch setzen aus Daten</p>

	  <p> powered by:</p>
	  ...
    </div>
  </section>
</template>

<script>
import constants from '~/modules/projectConstants'
import AppLogo from '~/components/AppLogo.vue'
import PageFooter from '~/components/DefaultFooter.vue' //you can use any name
import ListArticles from '~/components/ListArticles.vue'
import PreviewArticle from '~/components/PreviewArticle.vue'
import axios from 'axios';

export default {
	async asyncData() {
		// shorten axios get call by pre defining axios.create like in:
		// https://github.com/davidroyer/nuxt-api-example/
		// ??? how to automate fetch of data (sub module function)

		let url = '';

		// list of "Referenzen"
		url = constants.basePathCategories + 3 + constants.pathExtensionArticles
		let data = null;
		try {
			let res  = await axios.get(url)
			data = res.data
		}
		catch(e) {
			console.log(e)
			data = {
				// ??? how to provide such a graphical grey bar instead of text
				name : 'Kategorie',
				categories : []
			}
		}

		// list of "Leistungen"
		url = constants.basePathCategories + 4 + constants.pathExtensionArticles
		let dataOffers = null;
		try {
			let res  = await axios.get(url)
			dataOffers = res.data
		}
		catch(e) {
			console.log(e)
			dataOffers = {
				// ??? how to provide such a graphical grey bar instead of text
				name : 'Kategorie',
				categories : []
			}
		}

		// list of "News"
		url = constants.basePathCategories + 21 + constants.pathExtensionArticles
		let dataNews = null;
		try {
			let res  = await axios.get(url)
			dataNews = res.data
			// now remove first article (start article) if present
		}
		catch(e) {
			console.log(e)
			dataNews = {
				// ??? how to provide such a grey bar instead of text
				name : 'Kategorie',
				categories : []
			}
		}

		// Preview of reference 1
		// ??? re-use api call of references with body
		url = constants.basePathCategories + 3 + constants.pathExtensionArticlesWithBody
		let refPreviews = null;
		let testarticle
		try {
			let res  = await axios.get(url)
			refPreviews = res.data
			testarticle = refPreviews.categories[0].articles[0].name // trying to cause error
		}
		catch(e) {
			console.log(e)
			refPreviews = {
				categories : [
					{
						name : 'no data for preview',
						articles : [
							{
								name : 'no data',
								body : 'no content'
							}
						]
					}
				]
			}
		}

		// console.log('IN INDEX')
		// console.log(url)
		// console.log(refPreviews)

		// ??? to shorten the return list you could put all fetched data into object/array hence only in attribute(prop) selection e.g. listData.references.entries, listData.news.title
		// ??? the fetch goes to sub module
		// all the vars could also be generated (passed object)
		return  {
			referencesList : data.categories,
			referencesTitle : data.name,
			offersList : dataOffers.categories,
			offersTitle : dataOffers.name,
			newsList : dataNews.articles,
			newsTitle : dataNews.name,
			previews : refPreviews.categories,

			projectTitle : constants.projectTitle,
			otherIndexSubHeading : 'This must become a list of arts'
			// markdownBlog : cmsPosts[0].body
			// markdownBlogHtml : md.render(cmsPosts[0].body)
			// us like: <div class="blog-post" v-html="markdownBlogHtml"></div>
		}
	},
	components : {
		AppLogo,PageFooter,ListArticles,PreviewArticle
	}
}
</script>

<style lang="scss">
@import '../assets/_container';

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

/* how to use sass or JS-styles ?? */
.blog-post blockquote {
	border-left: 2px solid #080;
	padding-left: 1em;
}
</style>
