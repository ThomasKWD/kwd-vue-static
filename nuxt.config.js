import axios from 'axios'
import constants from './modules/projectConstants'
import {generateNamedPath} from './modules/routesFromApi'

module.exports = {
	/*
	** Modules
	*/
	// modules: [
	//     // Simple usage
	//     "~/modules/projectConstants"
	//   ],

	/*
	** Headers of the page
	*/
	head: {
		title: 'Home',
		titleTemplate: '%s - '+ constants.projectTitle,
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
		routes:  async function() {
			// article 3 contains list of sub categories of "References"
			// ??? centralized const def. in project (also for pages generation)
			// ??? you could build up the entire redaxo hierchy as routes
			// ??? try to use the titles for paths, not just ids, for this make own converter from title
			//     better: have a metainfo field in Redaxo which - if set - contains title for URL, otherwise build from normal title of article

			// ??? why does promise not work anymore
			// let referencesRoutes = axios.get('https://www.kuehne-webdienste.de/api/categories/3/articles/contents')
			// .then(({data}) => {
			// 	console.log('XXXXXXXXXXXXXXXX')
			// 	return data.categories.map((cat) => {
			// 		console.log(`cat ${cat.id}`)
			// 		// cat.namedPath = generateNamedPath(cat.id) // ! defined field not used...
			// 		return {
			// 			route : '/'+constants.referencesPathName+'/' + cat.id, //sub_article.namedPath
			// 			payload : {}
			// 		}
			// 	})
			// })
			// .catch((problem) => {
			// 	console.log(problem)
			// })

			let {data} = await axios.get('https://www.kuehne-webdienste.de/api/categories/3/articles/contents')

			let referencesRoutes = data.categories.map((cat) => {
				// cat.namedPath = generateNamedPath(cat.id) // ! defined field not used...
				return {
					route : '/'+constants.referencesPathName+'/' + cat.id, //sub_article.namedPath
					payload : cat
				}
			})

			referencesRoutes.push({
				route : '/newcat',
				payload : {
					id : 1234,
					name : "My new Base Cat",
					articles : [
						{
							id : 1234,
							name : 'Base Cat Article Name',
							body : '<p>Content of my dyn article<p>'
						}
					]
				}
			})

			return referencesRoutes
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
