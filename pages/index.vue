<!-- ??? what if there are  dozens of cards
-->
<template>
  <section class="container">
    <div>

      <h1 class="subtitle">
        Willkommen auf meiner neuen Website!
	</h1>

	  <div class="container-grid-3 list-row">

		  <list-articles
			  cat-type="blog"
			  v-bind:article-data="dataList[0]"
		  ></list-articles>

		  <list-articles
			  cat-type="leistungen"
			  v-bind:article-data="dataList[1]"
		  ></list-articles>

		  <list-articles
			  cat-type="referenzen"
			  v-bind:article-data="dataList[2]"
		  ></list-articles>

	</div>
		<div class="container-grid-3 preview-row">
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

	  <ul>
	  <li>
		  test: {{t}}
	  </li></ul>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import PageFooter from '~/components/DefaultFooter.vue' //you can use any name
import ListArticles from '~/components/ListArticles.vue'
import PreviewArticle from '~/components/PreviewArticle.vue'
import {kwdApiGet} from '~/modules/kwdApi'

export default {
	async asyncData() {

		let lists = [];

		// ??? try to make everything but the id + type inside cards
		// ??? params could even be saved as {id:21,type:'artList'}
		lists.push(await kwdApiGet(21,'artList'))
		lists.push(await kwdApiGet(4,'catList'))
		lists.push(await kwdApiGet(3,'catList'))

		// remove start article from news list: // ??? should kwd api_json do this?
		lists[0].articles.shift()

		// Preview of 3 references
		// ??? re-use api call of references with body
		let refPreviews = await kwdApiGet(3,'catList','content')

		// ??? to shorten the return list you could put all fetched data into object/array hence only in attribute(prop) selection e.g. listData.references.entries, listData.news.title
		// ??? the fetch goes to sub module
		// all the vars could also be generated (passed object)
		return  {
			t : process.env.t,
			dataList : lists,
			previews : refPreviews.articles,
			projectTitle : process.env.projectTitle,
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
