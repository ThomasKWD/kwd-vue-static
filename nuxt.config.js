import constants from './modules/projectConstants'
import {generateNamedPath} from './modules/routesFromApi'
import {kwdApiGet,kwdApiInit} from './modules/kwdApi'

/** global constants
* - very simple concept to prevent juggling around with NODE_ENV
*   but at the same time constants can already be used in helper functions *inside* 'nuxt.config.js'
*/
let env = {
	referencesPath : 'referenzen/',
	offersPath : 'leistungen/',
	blogsPath : 'blog/',
	t : 'thomas'
}

kwdApiInit(env)

async function getRoutesFromkwdApi(path,id,type) {
	return (await kwdApiGet(id,type,'content')).articles.map((cat) => {
		// cat.namedPath = generateNamedPath(cat.id) // ! defined field not used...
		return {
			// route : '/'+path+'/' + cat.id, //sub_article.namedPath
			route : `/${path}${cat.id}`, //sub_article.namedPath
			payload : cat
		}
	})
}

module.exports = {
	/*
	** Modules
	*/
	// modules: [
	// 	'~/modules/kwdApi',
	// 	'@nuxtjs/axios'
	// ],
	// plugins: [
	// 	'~/plugins/axios'
	// ],
	env: env, // ! cool code; just means assign local closure var -- see start of this file
	/*
	** api presets go into $axios
	*/
	// axios: {
	// 	// proxyHeaders: false
	// 	baseUrl : 'https://www.kuehne-webdienste.de/api/categories/',
	// 	browserBaseUrl : 'https://www.kuehne-webdienste.de/api/categories/'
	// 	//Environment variable API_URL can be used to override baseURL.
	// },

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
			// ??? you could build up the entire redaxo hierchy as routes -- and have just 1 '_.vue' file
			// ??? try to use the titles for paths, not just ids, for this make own converter from title
			//     better: have a metainfo field in Redaxo which - if set - contains title for URL, otherwise build from normal title of article

			let routes = await getRoutesFromkwdApi(env.referencesPath,3,'catList') // internally 'content' by default
			routes = routes.concat(await getRoutesFromkwdApi(env.offersPath,4,'catList'))
			routes = routes.concat(await getRoutesFromkwdApi(env.blogsPath,21,'artList'))

			routes.push({
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

			return routes
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
