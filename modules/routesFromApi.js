var routes = []

export function generateNamedPath(articleData) {
	let pathName = ''

	if (typeof articleData.title === 'string') {
		pathName = articleData.title.toLowerCase().replace(/[\s]/g,'_')
		pathName = pathName.replace(/á/g,'a')
		pathName = pathName.replace(/ä/g,'ae')
		pathName = pathName.replace(/ö/g,'oe')
		pathName = pathName.replace(/ü/g,'ue')
		pathName = pathName.replace(/ß/g,'ss')
		pathName = pathName.replace(/[^\x00-\x7F]/g,'')
		pathName = pathName.replace(/[.,:;\/\\{}\[\]]/g,'')
		// console.log(`made pathName ${pathName} in module`)
	}
	else {
		pathName = ''+articleData.id
	}

	return pathName
}
// must return valid *array* of routes
