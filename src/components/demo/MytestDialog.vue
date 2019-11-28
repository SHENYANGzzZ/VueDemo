<template>
  <div>
    <div class="unameCss"
         @click="change(userList, dialogVisible)">{{ msg }}</div>
    <two></two>
  </div>
</template>
<script>
import two from './UserDetils'
export default {
  name: 'first',
  data () {
    return {
      msg: '查看详情',
      dialogVisible: true,
      userList: {
        id: 1,
        name: '张三'
      }
    }
  },
  methods: {
    change (val, bool) {
      this.$root.bus.$emit('transmit', val)
      this.$root.bus.$emit('isShow', bool)
    }
  },
  components: {
    two
  }
}

</script>

<style lang="less" scoped>
.unameCss {
  color: rgb(25, 139, 231);
  cursor: pointer;
}
</style>
