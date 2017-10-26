<template>
  <div id="power-tools">
  </div>
</template>

<script>
export default {
  name: 'power-tools-view'
};
</script>

<style lang="sass">
@import "src/styles/global"

#power-tools
  position: fixed
  top: 50%
  right: 0px
  width: span(1, 24)
  hieght: 0
  padding-bottom: span(4, 24)
  background-color: $gray
  transform: translate3d(100%, -50%, 0)
</style>
