<template>
	<div class='project-cell'>
		{{ project.project_name }}
		<router-link v-bind:to="project.path">View</router-link>
	</div>
</template>

<script>
export default {
  name: 'project-cell-view',
  props: ['project']
}
</script>

<style lang='sass' scoped>
@import "src/styles/global"

.project-cell
	display: inline-block
	width: span(9, 20)
	height: 0
	padding-bottom: span(9, 20)
	background:
	  color: $gray
	  size: cover
	  position: center
	margin-bottom: span(2, 20)
</style>