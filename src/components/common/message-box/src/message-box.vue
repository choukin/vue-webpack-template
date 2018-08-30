<template>
  <div class="nb-msgbox-wrapper">
    <div class="nb-msgbox-bg" v-if="lock" v-show="lockState"></div>
    <transition name="msgbox-bounce">
      <div class="nb-msgbox" v-show="value">
        <div class="nb-msgbox-header" v-if="title !== ''">
          <div class="nb-msgbox-title">{{title}}</div>
        </div>
        <div class="nb-msgbox-content" v-if="message !== ''" :style="{'padding-top': title === '' ? '.5rem' : '.16rem'}">
          <div class="nb-msgbox-message" v-html="message"></div>
        </div>
        <div class="nb-msgbox-btns">
          <button type="button" class="nb-btn cancel" v-show="showCancelBtn" @click="cancelHandle">{{cancelText}}</button>
          <button type="button" class="nb-btn confirm" v-show="showOkBtn" @click="confirmHandle">{{okText}}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  
  export default {
    data () {
      return {
        title: '',
        message: '',
        showOkBtn: true,
        showCancelBtn: false,
        okText: '确定',
        cancelText: '取消',
        okClass: '',
        cancelClass: '',
        value: false,
        lockState: true,
        lock: true,
        cancel () {},
        ok () {}
      }
    },
  
    mounted () {
      this.$nextTick(() => {
        document.querySelector('.nb-msgbox-bg').addEventListener('touchmove', function (event) {
          event.preventDefault()
          event.stopPropagation()
        })
        // 禁止touch事件穿透
        document.querySelector('.nb-msgbox').addEventListener('touchmove', function (event) {
          event.preventDefault()
          event.stopPropagation()
        })
      })
    },
  
    methods: {
      cancelHandle () {
        this.value = false
        this.lockState = false
        setTimeout(() => {
          this.cancel && this.cancel()
        }, 200)
      },
  
      confirmHandle () {
        this.value = false
        this.lockState = false
        setTimeout(() => {
          this.ok && this.ok()
        }, 200)
      }
    }
  }
</script>

<style lang="scss">
@import '../../../../assets/style/base.scss';

.nb-msgbox-wrapper {
  z-index: 9999;
  position: relative;
}
.nb-msgbox-bg {
  background-color: rgba(0, 0, 0, .8);
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.nb-msgbox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 5.6rem;
  border-radius: .24rem;
  font-size: .26rem;
  -webkit-user-select: none;
  overflow: hidden;
  backface-visibility: hidden;
  transition: .2s;
  
  &-header {
    padding: 15px 0 0;
  }
  
  &-content {
    @include border(1px, solid, #EBEBEB, 'bottom');
    position: relative;
    padding: .4rem .4rem .4rem .4rem;
  }
  
  &-title {
    text-align: center;
    padding-left: 0;
    margin-bottom: 0;
    font-size: .34rem;
    color: #030303;
    padding-top: .36rem;
    height: .48rem;
    line-height: .48rem;
  }
  
  &-message {
    text-align: center;
    line-height: 150%;
    color: #030303;
  }
  
  &-btns {
    display: flex;
    height: .88rem;
    line-height: .88rem;
    font-size: .34rem;
  }
  
  &-btns .nb-btn {
    background-color: #fff;
    font-size: .34rem;
    flex: 1;
    &:focus {
      outline: none;
    }
    &:last-child{
      border: none;
    }
  }
  
  &-btns .cancel {
    @include border(1px, solid, #EBEBEB, 'right');
    color: #4093FF;
  }
  
  &-btns .confirm {
    color: #4093FF;
  }
}

.msgbox-bounce-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.msgbox-bounce-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>
