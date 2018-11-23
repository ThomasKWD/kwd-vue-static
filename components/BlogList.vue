<!--
Displays preview list of blogs, which can be used on different pages
- Don't need sub component because just using text info (no html parsing or styling)
- or *if* some parsing needed do it right here
-->
<template>
<nav>
	<ul>
		<li v-for="b in blogs" v-bind:key="b.id">
		    <a href="/">{{ b.title }}</a>
		  </li>
	</ul>

	<!-- <pre>{{blogs}}</pre> -->
</nav>
</template>

<script>
// TODO: should provide separate module to have logic in one place
//       something like "blogReader", that can be used by BlogArticle or BlogList or other views
var cmsPosts = require('extended-netlify-cms-loader?collection=blog!../static/admin/config.yml')
// var markDownIt = require('markdown-it')
// var md = new markDownIt();
var i;
for (i=0; i < cmsPosts.length; i++) {
	cmsPosts[i].id = i+1;
}

export default {
	data : function() {
		return {
			blogs : cmsPosts,
		}
	}
}
</script>
