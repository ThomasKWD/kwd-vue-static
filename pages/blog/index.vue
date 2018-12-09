Interesting that a text here is ignored and thus can be used as *comment*.

actually you would need a base page template (see layouts) which contains structures which

TODO: concept: general API reader which automates the main categories and fills in references OR news OR offers in sub pages

<template>
	<main class="blog-page">
		<h1>Blog</h1>
		<blog-list/>
	</main>
</template>

<script>
import BlogList from '~/components/BlogList.vue' //you can use any name
export default {
	components:
		{
			BlogList
		}
}</script>
