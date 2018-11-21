# KWD website

The proof of concept: Using VueJS, Nuxt, Github and NetlifyCMS to deploy my website.

Deployed at https://loving-kowalevski-d056fa.netlify.com/ -- changed to https://kuehne-webseiten.netlify.com/
by [KUEHNE-Webdienste.de](https://kuehne-webdienste.de)

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

### Implementation understanding

The file [./package-lock.json](./package-lock.json) seems to be used to track the exact state of all locally installed npm packages, thus the folder 'node_modules' can be kept off the git repo.
