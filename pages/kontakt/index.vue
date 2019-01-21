??? already get data in custom route, parse "redaxo://" links there and generate sub pages, eg. for license and privacy policy

<template>
	<main class="contact-page">
		<h1>{{title}}</h1>
		<div class="contact-body" v-html="body"></div>
	</main>
</template>

<script>
import axios from 'axios'

export default {
	async asyncData({params}) {
		// - with this code you can access original field names of JSON in template above
		const { data } = await axios.get('https://www.kuehne-webdienste.de/api/articles/2/1/content') // without body content
		return data;
	}
}</script>
