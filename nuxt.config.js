module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'KÜHNE-Webseiten',
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
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
