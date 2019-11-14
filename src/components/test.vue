<template>
  <div>
    <h2>test {{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: {
    msg: {
      type: String,
      default: '1111'
    }
  },
  methods: {

  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
</style>
