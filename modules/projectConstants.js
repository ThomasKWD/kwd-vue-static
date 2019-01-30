
function baseUrl() {
	return 'https://www.kuehne-webdienste.de/'
}

export default  {
	projectTitle : 'KÜHNE-Webseiten',
	netlifyBlogStartId : 1000,
	referencesPathName : 'referenzen',
	basePath : baseUrl(),
	basePathCategories : baseUrl() + 'api/categories/',
	pathExtensionArticles : '/articles',
	pathExtensionArticlesWithBody : '/articles/contents',
	mediaPath : baseUrl() + 'files/'
}
