<!--
Displays preview list of blogs, which can be used on different pages
- Don't need sub component because just using text info (no html parsing or styling)
- or *if* some parsing needed do it right here
-->
<template>
<nav>
	<ul>
		<li v-for="b in blogs" v-bind:key="b.id">
		    <nuxt-link v-bind:to="'/blog/'+b.id">{{ b.title }}</nuxt-link>
		  </li>
	</ul>

	<!-- <pre>{{blogs}}</pre> -->
</nav>
</template>

<script>
import projectConstants from '~/modules/projectConstants'

console.log(`found ID base ${projectConstants().netlifyBlogStartId}`)

// TODO: should provide separate module to have logic in one place
//       something like "blogReader", that can be used by BlogArticle or BlogList or other views
var cmsPosts = require('extended-netlify-cms-loader?collection=blog!../static/admin/config.yml')
// var markDownIt = require('markdown-it')
// var md = new markDownIt();
var i;

for (i=0; i < cmsPosts.length; i++) {
	// TODO: make ids > 10000 to be distinguished from redaxo articles
	cmsPosts[i].id = projectConstants().netlifyBlogStartId+1+i;
}

export default {
	data : function() {
		return {
			blogs : cmsPosts,
		}
	}
}
</script>
