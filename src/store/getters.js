export default {
  nextPage: (state) => {
    if( state.pages.length > 0 ){
      let _current = _.find(state.pages, {title: state.route.params.discipline});
      let _currentIndex = _.indexOf(state.pages, _current);
      let _nextIndex = _currentIndex < state.pages.length - 1 ? _currentIndex + 1 : 0;

      return state.pages[_nextIndex].title;
    }
  },
  projects: (state) => {
    let _projects = [];
    
    // If on a discipline
    if( state.route.params.discipline ){
      let _current = _.find(state.pages, {title: state.route.params.discipline});
      let _currentIndex = _.indexOf(state.pages, _current);
      _projects = _currentIndex < 0 ? null : state.pages[_currentIndex].projects;
    }

    // If search
    if( state.route.params.project_search ){
      let _search = state.route.params.project_search.split('+');
      _.each(_search, (term) => {
        _.each( state.pages, (page) => {
          let _project = _.find(page.projects, {title: term});
          if( _project ){
            _projects.push(_project);
          }
        });
      });
    }

    _projects = _projects.length == 0 ? null : _projects;

    return _projects;
  }
};
