<template>
  <div id="hero">
    <span>Hero {{ discipline }}</span>
  </div>
</template>

<script>
export default {
  name: 'hero-view',
  computed: {
    discipline () {
      return this.$route.params.discipline;
    }
  }
};
</script>

<style lang="sass">
@import "src/styles/global"

#hero
  +grid
  position: relative
  width: 100%
  height: 100%
  background-color: $color-bg-yellow

  span
    display: inline-block
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>
