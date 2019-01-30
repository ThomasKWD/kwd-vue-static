<template>
	<div>
		<page-header/>
		<nuxt/>
		<page-footer/>
	</div>
</template>

<script>
import PageHeader from '~/components/DefaultHeader.vue' //you can use any name
import PageFooter from '~/components/DefaultFooter.vue' //you can use any name

export default {
	// asyncData : function() {
	// 	return  {
	// 		projectTitle : 'KÜHNE-Webseiten.de',
	// 		// markdownBlog : cmsPosts[0].body
	// 		markdownBlogHtml : md.render(cmsPosts[0].body)
	// 	}
	// },
	components:
		{
			PageHeader,
			PageFooter
		}
}
</script>

<style lang="scss">
@import '../assets/_colors';

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.main-page-region,
.page {
	margin:30px;
	padding: 30px;
}

a {
	color: #0d63b4; // also cool as dark bg for logo
	text-decoration: none;

	&:hover {
		color:black;
		text-decoration: underline;
	}
}

.btn, .btn--default{
	display: inline-block;
	padding: 10px 15px;
	font-variant: small-caps;

	background-color: $colorKwdDark;
	color: white;
	border-radius: 3px;
	border-top-right-radius: 15px;
	transition: all 0.2s ease-out;
	outline:none;
	border: 1px solid $colorKwdDark;
	box-shadow: 0 5px 7px rgba(0,0,0,0.25);

	&:hover,
	&:focus {
		box-shadow: none;
		text-decoration: none;
		border-color:white;
	}
	&:active {
		box-shadow: 0 5px 7px rgba(0,0,0,0.25) inset;
	}
}
.btn--inverse {
	background-color: $colorKwdBlue;
	color: $colorKwdBlue;
}


</style>
