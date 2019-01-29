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
		  <list-articles list-type="sub-categories" apirequest="referenzen/3" v-bind:subtitle="indexSubHeading"></list-articles>
		  <list-articles list-type="category-articles" apirequest="blog/21" v-bind:subtitle="otherIndexSubHeading"></list-articles>
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

export default {
	asyncData : function(context) {
		console.log('here comes context of index page')
		console.log(context)
		return  {
			projectTitle : constants.projectTitle,
			indexSubHeading : 'Influenced by index page',
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
