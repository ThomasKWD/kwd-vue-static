
function baseUrl() {
	return 'https://www.kuehne-webdienste.de/'
}

// TODO: find usage and change to 'process.env'

export default  {
	projectTitle : 'KÜHNE-Webseiten',
	netlifyBlogStartId : 1000,
	referencesPathName : 'referenzen',
	referencesPathName : 'referenzen',
	offersPathName : 'leistungen',
	blogsPathName : 'leistungen',
	basePath : baseUrl(),
	basePathCategories : baseUrl() + 'api/categories/',
	pathExtensionArticles : '/articles',
	pathExtensionBody : '/contents',
	pathExtensionArticlesWithBody : '/articles/contents',
	mediaPath : baseUrl() + 'files/'
}
