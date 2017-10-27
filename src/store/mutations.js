export default {
  APP_SCROLL: (state, obj) => {
    state.appScroll = obj;
  },
  APP_SIZE: (state, obj) => {
    state.appSize = obj;
  },
  BIZ_POSITION: (state, { pos }) => {
    state.bizPosition = pos;
  },
  PROJECTS: (state, projects) => {
    state.pages = projects;
  }
};
