import axios from 'axios'
// ??? different languages not yet supported
// - gets env passed when used inside nuxt.config.js for routes; avoiding a closure
export async function kwdApiGet(id,type,includes,env) {

	let data,req;

	// ??? consider try catch
	// ! strange construction due to 'process.env' NOT being a real object but parsed during render
	//   hence we can only handle sub fields of process.env
	let myEnv = env ? env.api : process.env.api
	if (!myEnv) throw new Error('my env is needed for api')

	if (!includes) includes = ''; // in case invalid string passed
	let requestContent = (includes.indexOf(myEnv.types.includeContent) > -1) ? true : false;
	let requestMetaData = (includes.indexOf(myEnv.types.includeMeta) > -1) ? true : false;

	req = myEnv.basePathCategories
	if (type === myEnv.types.article) req = myEnv.basePathArticles

	req += id || '' // prevent 'undefined' or other useless things

	// ??? you can write this shorter
	if (type ===  myEnv.types.catList) {
		if (requestContent) req += myEnv.pathExtensionArticlesWithBody
	}
	else if (type === myEnv.types.artList) {
		if (requestContent) req += myEnv.pathExtensionArticlesWithBody
		else req += myEnv.pathExtensionArticles
	}
	else /* if (type === 'article') */ req += myEnv.pathExtensionBody


	// console.log(`built uri: ${req}, type:${type}`)
	// console.log(`env: ${myEnv.basePathCategories}`)

	try {
		let res = await axios.get(req)
		data = res.data
	}
	catch(e) {
		console.log(e)
		console.log('...catched error and set default data ')
		data = {
			id : id,
			name : 'error',
			body : e.message + 'request:' + req
		}
	}

	if (!data) {
		data = {
			id : id,
			name : `try id:${id}`,
			body : `not found in ${req}`
		}
	}
	else {
		if (typeof data.body === 'undefined') data.body = `body not found in ${req}`
	}

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
		return data
		// return data.articles[0]
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
