export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
    // console.log('found base ' + config.baseUrl)
    // console.log('found base ' + config.browserBaseUrl)
	// only add base when not full url:
	if (config.url.indexOf('://') === -1) config.url = 'https://www.kuehne-webdienste.de/api/' + config.url
	return config
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })

  // $axios.onResponse(response => {
	//   response.articles[0].name = ' thomas hat das malt'
	//   // return response // + ' thomas hat das malt'
  // })
}
