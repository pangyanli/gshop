<template>
  <div>
    {{shopInfo}}
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    computed: {
      ...mapState(['shopInfo'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
