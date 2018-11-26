actually you would need a base page template (see layouts) which contains structures which
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
