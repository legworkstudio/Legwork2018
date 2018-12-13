import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueProtosite from '@legwork/vue-protosite'

import {STORE} from './store'
import {ROUTES} from './util/routes'
import {RESOLVER} from './util/resolver'

import * as mixins from './util/mixins'
import * as filters from './util/filters'

import App from './views/app.vue'
import Page from './components/page.vue'
import StyleGuide from './views/style-guide.vue'

// tell vue what to use
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueProtosite, { resolver: RESOLVER, pageComponent: Page })

// register global utility mixins
Object.keys(mixins).forEach((key) => Vue.mixin(mixins[key]))

// register global utility filters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// setup protosite
async function createInterface(Vue, opts) {
  // TODO: this is what's used to create the admin interface, which isn't used on this project
  // const Protosite = await import(/* webpackChunkName: "protosite" */ '@legwork/vue-protosite')
  // Protosite.Interface(Vue, opts)
}

export function createApp(preload) {
  // setup vuex
  const store = new Vuex.Store(Object.assign({}, STORE))

  // setup the router
  const router = new VueRouter(ROUTES)
  if (process.env.NODE_ENV !== 'production') {
    router.addRoutes([{ path: '/style', component: StyleGuide, props: true }])
  }

  // let the entry point hook into things
  if (preload) preload({ router, store })

  // setup protosite
  const protosite = new VueProtosite({ store, router, logger: () => null })

  // create the app instance
  const app = new Vue({ router, store, protosite, render: (h) => h(App) })

  // expose the app, the router and the store
  return { app, router, store }
}
