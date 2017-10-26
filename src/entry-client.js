import Vue from 'vue';
import 'es6-promise/auto';
import { createApp } from './app';

// a global mixin that calls `ssrInit` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { ssrInit } = this.$options;
    if (ssrInit) {
      ssrInit({
        store: this.$store,
        route: to
      }).then(next).catch(next);
    } else {
      next();
    }
  }
});

const { app, router, store } = createApp();

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling ssrInit.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c));
    });
    const ssrInitHooks = activated.map(c => c.ssrInit).filter(_ => _);
    if (!ssrInitHooks.length) {
      return next();
    }

    Promise.all(ssrInitHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        next();
      })
      .catch(next);
  });

  // actually mount to DOM
  app.$mount('#app');
});
