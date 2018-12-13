export default {
  windowDim: (state, obj) => Object.assign(state.windowDim, obj),
  scrollPos: (state, obj) => Object.assign(state.scrollPos, obj),

  WIN_SCROLL: (state, obj) => {
    Object.assign(state.appScroll.win, obj)
  },

  MENU_SCROLL: (state, obj) => {
    Object.assign(state.appScroll.menu, obj)
  },

  STUDIO_SCROLL: (state, obj) => {
    Object.assign(state.appScroll.studio, obj)
  },

  OVERLAY_SCROLL: (state, obj) => {
    Object.assign(state.appScroll.overlay, obj)
  },

  PROJECT_SCROLL: (state, obj) => {
    Object.assign(state.appScroll.project, obj)
  },

  ACTIVE_SCROLL: (state, str) => {
    state.activeScroll = str
  },

  APP_SIZE: (state, obj) => {
    state.appSize = obj
  },

  HEADER: (state, { settings }) => {
    Object.assign(state.header, settings)
  },

  BIZ_POSITION: (state, { pos }) => {
    state.bizPosition = pos
  },

  OVERLAY: (state, { settings }) => {
    Object.assign(state.overlay, settings)
  },

  TRANSITION_ORIGIN: (state, origin) => {
    state.transitionOrigin = origin
  },
}