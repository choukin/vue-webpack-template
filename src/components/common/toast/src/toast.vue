<template>
  <transition name="nb-toast-pop">
    <div class="nb-toast" v-show="visible" :class="customClass" :style="{ 'padding': icon === '' ? '.1rem' : '.2rem' }">
      <i class="nb-toast-icon" :class="iconClass" v-if="icon !== ''"></i>
      <span class="nb-toast-text" :style="{ 'padding-top': icon === '' ? '0' : '.1rem' }">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        visible: false
      }
    },
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      icon: {
        type: String,
        default: ''
      }
    },
    computed: {
      customClass () {
        let classes = []
        switch (this.position) {
          case 'top':
            classes.push('is-placetop')
            break
          case 'bottom':
            classes.push('is-placebottom')
            break
          default:
            classes.push('is-placemiddle')
        }
        classes.push(this.className)

        return classes.join(' ')
      },
      
      iconClass () {
        let classes = ['iconfont']
        switch (this.icon) {
          case 'success':
            classes.push('icon-success')
            break
          case 'fail':
            classes.push('icon-delete')
            break
          case 'prompt':
            classes.push('icon-prompt')
            break
          case 'warning':
            classes.push('icon-warning')
            break
        }
        classes.push(this.className)
  
        return classes.join(' ')
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../../assets/font/base/iconfont.css";
  .nb-toast {
    position: fixed;
    max-width: 80%;
    border-radius: .05rem;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    transition: opacity .3s linear;
    
    .nb-toast-icon {
      display: block;
      text-align: center;
      font-size: 1rem;
      height: 1rem;
      line-height: 1rem;
      color: #fff;
    }
    
    .nb-toast-text {
      font-size: .28rem;
      display: block;
      text-align: center;
      padding: 0 .2rem;
    }
    
    .nb-toast-pop-enter, .nb-toast-pop-leave-active {
      opacity: 0;
    }
  }
  .is-placetop {
    top: 1rem;
    left: 50%;
    transform: translate(-50%, 0);
  }
  
  .is-placemiddle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  .is-placebottom {
    bottom: 1rem;
    left: 50%;
    transform: translate(-50%, 0);
  }

</style>
