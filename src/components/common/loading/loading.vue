<template>
  <transition name="scale">
    <div class="loading-view" id="loading-view" v-show="state">
      <div class="loading-warp">
        <div class="loading-img-warp">
        </div>
        <div class="loading-tips">正在加载</div>
      </div>
    </div>
  </transition>
</template>
<script>
  /**
   * Loading components.
   * @module components/common/Loading
   * @param {Object} props
   * @param {Boolean} [props.state=false] - 是否显示
   */
export default {
    name: 'loading',
    props: {
      state: {
        type: Boolean,
        default: false
      }
    }
}
</script>
<style>
.loading-view {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9000;
}

.loading-warp {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .7);
  border-radius: .25rem;
  -webkit-border-radius: .25rem;
  padding: .3rem .39rem;
}

.loading-warp img {
  position: relative;
  z-index: 100;
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.loading-img-warp {
  width: .74rem;
  height: .74rem;
  margin: 0 auto .15rem auto;
}

.loading-tips {
  font-size: .28rem;
  color: #fff;
  text-align: center;
}

.rotate {
  -webkit-animation: rotate 0.75s 0s linear infinite;
  animation: rotate 0.75s 0s linear infinite;
}

@keyframes rotate {
  0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
  }
  50% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
  }
  100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
  }
}
.scale-leave-active {
  -webkit-animation: scale .35s  ease-in;
    animation: scale .35s ease-in;
}

@keyframes scale {
  0% {
    -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
  }
  35%{
    opacity: .5;
  }
  70% {
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 0;
  }
}
</style>
