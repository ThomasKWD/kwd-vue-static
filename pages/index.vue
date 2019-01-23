<!-- test comment paul -->
<template>
  <section class="container">
    <div>

      <app-logo/>
      <h1 class="title">
        {{projectTitle}}
      </h1>
      <h2 class="subtitle">
        Willkommen auf der neuen Website im Material Design!
      </h2>
	  <p> powered by:</p>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Nuxt</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>

		<page-footer/>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import PageFooter from '~/components/DefaultFooter.vue' //you can use any name
// const cmsPosts = require('extended-netlify-cms-loader?collection=blog!../static/admin/config.yml')
// var markDownIt = require('markdown-it')
// var md = new markDownIt();

var projectTitle = 'KÜHNE-Webseiten.de';

export default {
	asyncData : function() {
		return  {
			projectTitle : projectTitle
			// markdownBlog : cmsPosts[0].body
			// markdownBlogHtml : md.render(cmsPosts[0].body)
			// us like: <div class="blog-post" v-html="markdownBlogHtml"></div>
		}
	},
	components : {
		AppLogo,PageFooter
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
