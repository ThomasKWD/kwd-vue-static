import {resolve} from 'path'
import { Nuxt, Builder } from 'nuxt'
import { JSDOM } from 'jsdom'
import test from 'ava'
import testRoutesFromApi from './routesFromApi.test'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null


// ? how to do only when basic unit tests successful
// Init Nuxt.js and create a server listening on localhost:4000
test.before(async () => {
  const config = {
    dev: false,
    rootDir: resolve(__dirname, '..')
  }
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  await nuxt.server.listen(4000, 'localhost')
}, 30000)

testRoutesFromApi()

// Example of testing only generated html
test('Route / exits and render HTML', async (t) => {
  const context = {}
  const { html } = await nuxt.server.renderRoute('/', context)
  t.true(html.includes('<p> powered by:</p>'))
})

// test existing /referenzen/index.html
test('Route /referenzen/index.html exits and render HTML', async (t) => {
  const context = {}
  const { html } = await nuxt.server.renderRoute('/referenzen/', context)
  t.true(html.includes('<main class="references-page">'))
})
// test existing /referenzen/index.html
test('Route /kontakt/index.html exits and render HTML', async (t) => {
  const context = {}
  const { html } = await nuxt.server.renderRoute('/kontakt/', context)
  t.true(html.includes('<main class="contact-page">'))
})
// test existing /referenzen/index.html
test('Route /blog/index.html exits and render HTML', async (t) => {
  const context = {}
  const { html } = await nuxt.server.renderRoute('/blog/', context)
  t.true(html.includes('<main class="blog-page">'))
})

// Example of testing via dom checking
test('Route / exits and render HTML with CSS applied', async (t) => {
  const context = {}
  const { html } = await nuxt.server.renderRoute('/', context)
  const { window } = new JSDOM(html).window
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello world!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', (t) => {
  nuxt.close()
})
