<template>
  <div id="content" v-show="projects">
    <div id="content-inner">
      <p>Page: {{ discipline }}</p>
      <p>Next: <router-link v-bind:to="{ path: nextPageLink }">{{ nextPage }}</router-link></p>
      <p v-show="project_search">Search: {{ project_search }}</p>
      <div id='content-cells'>
        <project-cell-view v-for="project in projects" :key="project.slug" :project="project"></project-cell-view>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCellView from 'components/content-view/ProjectCellView.vue';
export default {
  name: 'content-view',
  components: {
    ProjectCellView
  },
  computed: {
    project_search () {
      return this.$route.params.project_search;
    },
    discipline () {
      return this.$route.params.discipline;
    },
    nextPage () {
      return this.$store.getters.nextPage;
    },
    nextPageLink () {
      return '/' + this.$store.getters.nextPage;
    },
    projects () {
      return this.$store.getters.projects;
    }
  },
  ssrInit ({ store, route }) {
    return store.dispatch('FETCH_PROJECTS');
  }
};
</script>

<style lang="sass" scoped>
@import "src/styles/global"

#content
  +grid
  padding-top: span(2, 24)

  #content-inner
    grid-column: 3 / span 20
    grid-row: 1

    #content-cells
      display: flex
      flex-direction: row
      justify-content: space-between
      flex-wrap: wrap
      margin-top: span(1, 20)
</style>
