import { init } from '../api';
export default {

  /*
  ------------------------------------------
  | FETCH_PROJECTS:void (-)
  |
  | Fetches data and projects
  ------------------------------------------ */
  FETCH_PROJECTS: ({ commit }) => {
    let _projects = [];
    
    return init()
      .then( (projects) => {
        _.each( projects, (projects, key) => {
          _projects.push({
            title: key,
            projects: projects
          });
        });
        commit('PROJECTS', _projects);
      });
  },

  SET_BIZ_POSITION: ({ commit }, obj) => {
    if(obj.delay === 0) {
      commit('BIZ_POSITION', obj);
    } else {
      setTimeout(() => commit('BIZ_POSITION', obj), obj.delay);
    }
  }
};
