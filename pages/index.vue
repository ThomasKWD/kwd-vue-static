<!-- ??? what if there are  dozens of cards
-->
<template>
  <section class="container">
    <div>

      <h1 class="title">
        {{projectTitle}}
      </h1>
      <h2 class="subtitle">
        Willkommen auf meiner neuen Website!
      </h2>

	  <section class="card-container">

		  <list-articles
		  v-bind:title="referencesTitle"
		  list-type="sub-categories"
		  cat-type="referenzen"
		  v-bind:article-data="referencesList"
		  ></list-articles>

		  <list-articles
		  v-bind:title="referencesTitle"
		  list-type="sub-articles"
		  cat-type="blog"
		  v-bind:article-data="newsList"
		  ></list-articles>

		  <ul>1
			  <li>ereter punkt</li>
		  </ul>
	  </section>

	  <p>cross link: <nuxt-link to="/newcat">Dyn Cat</nuxt-link>  - jetzt noch link dynamisch setzen aus Daten</p>
	  <p> powered by:</p>
      <div class="links">
		  <a
            href="https://nuxtjs.org/"
			target="_blank"
			class="button--green">Nuxt</a>
			<a
			href="https://vuejs.org/"
			target="_blank"
			class="button--green">Vue</a>
			<a
          href="https://github.com/ThomasKWD/kwd-vue-static"
          target="_blank"
          class="button--grey">GitHub</a>
		  <a
		href="https://redaxo.org"
		target="_blank"
		class="button--grey">Redaxo</a>
      </div>

    </div>
  </section>
</template>

<script>
import constants from '~/modules/projectConstants'
import AppLogo from '~/components/AppLogo.vue'
import PageFooter from '~/components/DefaultFooter.vue' //you can use any name
import ListArticles from '~/components/ListArticles.vue'
import axios from 'axios';

export default {
	async asyncData() {
		// shorten axios get call by pre defining axios.create like in:
		// https://github.com/davidroyer/nuxt-api-example/
		// ??? how to automate fetch of data (sub module function)
		let url = constants.basePathCategories + 3 + constants.pathExtensionArticles
		let data = null;
		try {
			let res  = await axios.get(url)
			data = res.data
		}
		catch(e) {
			console.log(e)
			data = {
				// ??? how to provide such a grey bar instead of text
				name : 'Kategorie',
				categories : []
			}
		}

		url = constants.basePathCategories + 21 + constants.pathExtensionArticles
		let dataNews = null;
		try {
			let res  = await axios.get(url)
			dataNews = res.data
		}
		catch(e) {
			console.log(e)
			dataNews = {
				// ??? how to provide such a grey bar instead of text
				name : 'Kategorie',
				categories : []
			}
		}

		// ??? to shorten the return list you could put all fetched data into object/array hence only in attribute(prop) selection e.g. listData.references.entries, listData.news.title
		// ??? the fetch goes to sub module
		return  {
			referencesList : data.categories,
			referencesTitle : data.name,
			newsList : dataNews.articles,
			projectTitle : constants.projectTitle,
			otherIndexSubHeading : 'This must become a list of arts'
			// markdownBlog : cmsPosts[0].body
			// markdownBlogHtml : md.render(cmsPosts[0].body)
			// us like: <div class="blog-post" v-html="markdownBlogHtml"></div>
		}
	},
	components : {
		AppLogo,PageFooter,ListArticles
	}
}
</script>

<style>
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
