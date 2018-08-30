<template>
  <div class="opened_list">
    <ul id="vRollList">
      <slot></slot>
    </ul>    
  </div>
</template>

<script>
export default {
  name: 'vRoll',
  created () {
    this.$nextTick(() => {
      this.rollAnimate()
    })
  },
  methods: {
    // 头部纵向滚动效果
    rollAnimate () {
      let that = this
      setTimeout(function () {
        const vRollList = document.getElementById('vRollList')
        const LI = vRollList.querySelectorAll('li')
        const len = LI.length
        if (len === 0) return false
        if (len >= 1) {
          setInterval(() => {
            that.scrollList(vRollList, 0.36)
          }, 1000)
          vRollList.addEventListener('webkitTransitionEnd', () => {
            that.endScroll(vRollList, vRollList.getElementsByTagName('li')[0])
          }, false)
        }
      }, 200)
    },
    // 滚动某元素指定高度
    scrollList (element, height) {
      element.style.webkitTransform = 'translate3d(0,-' + height + 'rem,0)'
      element.style.webkitTransition = '1s ease'
    },
    // 结束滚动后把第一个li放到最后面
    endScroll (element, item) {
      element.appendChild(item)
      element.style.webkitTransform = 'translate3d(0,0,0)'
      element.style.webkitTransition = '0s ease'
    }
  }
}

</script>

<style lang="scss" scoped>
.opened_list{
  width: 5.2rem;
  height: .36rem;
  line-height: .36rem;
  -webkit-border-radius: .36rem;
  border-radius: .36rem;
  background-color: #461a7f;
  text-align: center;
  margin: 0 auto;
  overflow-y: hidden;
  color: #fff;
  ul{
    margin-left: -.1rem;
    li{
      width: 5.2rem;
      height: 0.36rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  i{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display:inline-block;
  }
}
</style>
