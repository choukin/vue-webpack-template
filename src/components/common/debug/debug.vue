<template>
  <div class="debug-wrap" ref="debug">
    <button class="debug-button" @click="openUrl">app内打开</button>
  </div>
</template>

<script>
  let flag = false
  let cur = {
    x: 0,
    y: 0
  }
  let nx, ny, dx, dy, x, y
  
  export default {
    name: 'debug',
    mounted () {
      this.$nextTick(() => {
        const debug = this.$refs.debug
        debug.addEventListener('mousedown', () => {
          this.down(debug)
        }, false)
  
        debug.addEventListener('touchstart', () => {
          this.down(debug)
        }, false)
  
        debug.addEventListener('mousemove', () => {
          this.move(debug)
        }, false)
  
        debug.addEventListener('touchmove', () => {
          this.move(debug)
        }, false)
  
        debug.addEventListener('mouseup', () => {
          this.end()
        }, false)
  
        debug.addEventListener('touchend', () => {
          this.end()
        }, false)
      })
    },
    methods: {
      openUrl () {
        try {
          window.location.href = 'jfwallet://JFWebViewModelProtocol?startPageUrl=' + window.location.href
        } catch (e) {
          alert(e.message)
        }
      },
      down (target) {
        flag = true
        let touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        cur.x = touch.clientX
        cur.y = touch.clientY
        dx = target.offsetLeft
        dy = target.offsetTop
      },
      move (target) {
        if (flag) {
          let touch
          if (event.touches) {
            touch = event.touches[0]
          } else {
            touch = event
          }
          nx = touch.clientX - cur.x
          ny = touch.clientY - cur.y
          x = dx + nx
          y = dy + ny
          target.style.left = x + 'px'
          target.style.top = y + 'px'
  
          // 阻止页面的滑动默认事件
          document.addEventListener('touchmove', this.preventDefault, false)
        }
      },
      end () {
        flag = false
        document.removeEventListener('touchmove', this.preventDefault, false)
      },
      preventDefault (event) {
        event.preventDefault()
      }
    }
  }

</script>

<style lang="scss" scoped>
  .debug-wrap {
    position: fixed;
    left: .2rem;
    bottom: .2rem;
    z-index: 999;
    box-sizing: border-box;
    width: 1.9rem;
    .debug-button {
      box-sizing: border-box;
      height: .64rem;
      padding: 0 .35rem;
      font-size: .24rem;
      text-align: center;
      background-color: #3A72EF;
      color: #fff;
      border-radius: .08rem;
    }
  }
</style>
