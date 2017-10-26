import Vue from 'vue';
import Router from 'vue-router';
import ContentView from '../views/ContentView.vue';
import BizWidgetView from '../views/BizWidgetView.vue';
import StyleGuide from '../views/StyleGuide.vue';

// Set Vue to use the Router
Vue.use(Router);

// Create the router and return
export function createRouter () {

  // Create the base router
  const _router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 })
  });

  // Based on environment special routes
  if( process.env.NODE_ENV != 'production' ){
    _router.addRoutes([
      { path: '/style', component: StyleGuide, props: true }
    ]);
  }

  // Default routes
  _router.addRoutes([
    { path: '/search', components: {ContentView, BizWidgetView}, props: true },
    { path: '/search/:project_search', components: {ContentView, BizWidgetView}, props: true },
    { path: '/:discipline', components: {ContentView, BizWidgetView}, props: true },
    { path: '/:discipline/:project', components: {ContentView, BizWidgetView}, props: true },
    { path: '/', components: {ContentView, BizWidgetView}, props: true }
  ]);

  return _router;
}
