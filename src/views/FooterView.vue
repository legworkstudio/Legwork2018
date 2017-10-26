<template>
  <footer>
    <span>Up Next ...</span>
  </footer>
</template>

<script>
export default {
  name: 'footer-view'
};
</script>

<style lang="sass">
@import "src/styles/global"

footer
  +grid
  position: relative
  width: 100%
  height: 100%
  background-color: $gray

  span
    display: inline-block
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>
