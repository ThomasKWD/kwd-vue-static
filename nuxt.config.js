import axios from 'axios'

module.exports = {
	/*
	** Modules
	*/
	// modules: [
	//     // Simple usage
	//     "nuxt-netlify-cms"
	//   ],

	/*
	** Headers of the page
	*/
	head: {
		title: 'Hoome',
		titleTemplate: '%s - KÜHNE-Webseiten',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'kwd static website powered by vue' }
		],
		link: [
			{ rel: 'icon', type: 'image/png', href: '/kwd4-favicon-alpha.png' }
		],
		script: [
			{
				src: "https://identity.netlify.com/v1/netlify-identity-widget.js"
			}
		]
	},
	/*
	** Customize the progress bar color
	*/
	loading: { color: '#3B8070' },
	/* Custom static routes
	**
	*/
	generate : {
		routes: function () {
			// article 3 contains list of sub categories of "References"
			// ??? centralized const def. in project (also for pages generation)
			return axios.get('https://www.kuehne-webdienste.de/api/articles/3/content')
			.then((res) => {
				// var articles = res.data.sub_articles;
				// console.log('--'+typeof articles )
				// console.log(articles)
				// ??? why function map unknown
				return res.data.sub_articles.map((sub_article) => {
					return {
						route : '/referenzen/' + sub_article.id,
						payload : sub_article
					}
				})
			})
		}
	},


	/*
	** Build configuration
	*/
	build: {
		//   plugins: [
		//     new webpack.ProvidePlugin({
		//       '$': 'jquery',
		//       '_': 'lodash'
		//       // ...etc.
		//     })
		// ],
		/*
		** Run ESLint on save
		*/
		extend (config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/,
					exclude: /(node_modules)/
				})
			}
		}
	}
}
