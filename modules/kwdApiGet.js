import axios from 'axios'
// ?? remove constants when env works
import constants from '~/modules/projectConstants'
// ??? use env??
// ??? different languages not yet supported

// ??? cannot work for article from news because it is article from an artList
export async function kwdApiGet(id,type,includes) {
	// ??? consider try catch

	// ! planned
	if (!includes) includes = ''; // in case invalid string passed
	let requestContent = (includes.indexOf('content') > -1) ? true : false;
	let requestMetaData = (includes.indexOf('meta') > -1) ? true : false;

	// this.options contains nuxt.config.js
	//req = 'categories/articles/contents' // test
	let req = constants.basePathCategories
	req += id || '';
	// don't need articles if list of cats:
	if (requestContent || type === 'article') req += constants.pathExtensionArticlesWithBody;
	else if (type === 'artList') req += constants.pathExtensionArticles;

	// console.log(`built uri: ${req}`)
			//
			// try {
			//
			// 	data  = await axios.get('https://www.kuehne-webdienste.de/api/articles/4/1').data // without body content
			// 	if (!Array.isArray(data.categories)) data.categories = []
			//
			// }
			// catch (e) {
			// 	console.log(e)
			// 	data.name = 'Keine Daten'
			// 	data.categories = []
			// }

	// shorten axios get call by pre defining axios.create like in:
	// https://github.com/davidroyer/nuxt-api-example/
	let {data} = await axios.get(req)

	// now reduce data
	if (type === 'catList') {
		// make it flat
		return {
			id : data.id,
			name : data.name,
			articles : data.categories.map((cat) => {
				return {
					id : cat.id,
					name : cat.name,
					body : requestContent ? cat.articles[0].body : ''
				}
			})
		}
	}
	else if (type === 'article') {
		// only first article
		return data.articles[0]
	}

	// catch(e) {
	// 	console.log(e)
	// 	refPreviews = {
	// 		categories : [
	// 			{
	// 				name : 'no data for preview',
	// 				articles : [
	// 					{
	// 						name : 'no data',
	// 						body : 'no content'
	// 					}
	// 				]
	// 			}
	// 		]
	// 	}
	// }

	// Set the function directly on the context.app object
    // app.myInjectedFunction = (string) => console.log('Okay, another function', string)
	return data
}
