import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const STORE = {
  state: {
    data: {}, // this is for protosite

    appScroll: {
      win: {
        offset: 0,
        locked: false,
      },
      menu: {
        offset: 0,
      },
      studio: {
        offset: 0,
      },
      overlay: {
        offset: 0,
      },
      project: {
        offset: 0,
      },
    },
    activeScroll: 'win',
    appSize: {
      width: 0,
      height: 0,
      ratio: '',
      breakpoint: '',
    },
    header: {
      hieght: 0,
      transform: 0,
      mode: '',
      theme: 'dark',
      menu: '',
      section: '',
      transformMode: '',
    },
    bizPosition: '',
    overlay: {
      shown: false,
      kind: '',
      vimeoId: '',
    },
    transitionOrigin: '',
    pages: [],
  },
  actions,
  mutations,
  getters,
}
