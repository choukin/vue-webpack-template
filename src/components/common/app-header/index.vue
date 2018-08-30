<template>
  <div class="app-header-wrap">
    <div class="app-header"
      :style="{
        backgroundColor: bgColor,
        color: bgColor === '#fff' ? '#2d2f46' : '#fff'
      }"
      ref="header"
    >
      <div class="ios-status-bar-placeholder" :style="{ height: `${(isIphoneX ? 44 : 20) * dpr}px` }" v-if="isIOS && isAppEnv"></div>

      <div class="app-header-bar"
        :class="{ 'shadow-border': borderShow }"
        :style="{ height: `${44 * dpr}px`, lineHeight: `${44 * dpr}px` }"
      >
        <div class="app-header-left" :style="{ fontSize: `${16 * dpr}px` }">
          <button type="button" class="btn-back" @click="navBack" v-if="!backBtnHide">
            <i class="icon-base icon-biaotifanhui"></i>
          </button>
          <button type="button" class="btn-close" @click="closeWebView" v-if="closeBtnShow">
            <i class="icon-base icon-biaotiguanbi"></i>
          </button>
        </div>

        <div class="app-header-center" :style="{ fontSize: `${17 * dpr}px` }">
          <slot>
            <p class="title">{{title}}</p>
          </slot>
        </div>

        <div class="app-header-right" :style="{ fontSize: `${17 * dpr}px` }" v-if="rightBtnText">
          <button type="button" @click="rightBtnFnHandle">{{rightBtnText}}</button>
        </div>
      </div>
    </div>

    <div :style="{ height: `${(isIphoneX ? 44 : 20) * dpr}px`, backgroundColor: bgColor || '#fff' }" v-if="isIOS && isAppEnv"></div>
    <div :style="{ height: `${44 * dpr}px`, backgroundColor: bgColor || '#fff' }"></div>
  </div>
</template>

<script>
  /**
   * @desc App Header
   * @module components/app-header/index
   * @param {Object} props
   * @param {String} [props.bgColor=#fff] - 头部背景色，接受css支持的颜色字符串
   * @param {String} [props.title] - 头部Title
   * @param {String} [props.rightBtnText] - 右侧按钮文字
   * @param {Function} [props.rightBtnFn] - 右侧按钮方法
   * @param {Function} [props.backBtnFn] - 返回按钮方法，默认为有路由则go(-1)，没有使用路由则关闭WebView
   * @param {Boolean}[props.backBtnHide=false] - 隐藏返回按钮
   * @param {Boolean}[props.closeBtnShow=false] - 显示关闭按钮
   * @param {Boolean}[props.borderShow=false] - 显示下边线
   * @param {Object} slot
   * @param {Object} slot.default - 替换默认title位置内容
   * @example
   * <app-header title="标题" bgColor="#f15b5a" :closeBtnShow="true" rightBtnText="按钮" />
   */
  export default {
    name: 'app-header',
    props: {
      bgColor: {
        type: String,
        default: '#fff'
      },
      title: String,
      rightBtnText: String,
      rightBtnFn: Function,
      backBtnFn: Function,
      backBtnHide: {
        type: Boolean,
        default: false
      },
      closeBtnShow: {
        type: Boolean,
        default: false
      },
      borderShow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      isIOS: () => /iphone/i.test(window.navigator.userAgent),
      isAppEnv: () => /jfwallet/i.test(navigator.userAgent),
      dpr: () => document.documentElement.dataset.dpr,
      isIphoneX: () => /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    },
    methods: {
      navBack () {
        this.backBtnFn && this.backBtnFn()
        this.closeWebView()
      },
      closeWebView () { 
        window.history.go(-1)
      },
      rightBtnFnHandle (evt) {
        this.$emit('rightBtnFn', evt)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/font/base/iconfont.css";
  @import "../../../assets/style/base.scss";

  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    .icon-base {
      font-size: inherit;
    }
  }
  .app-header-bar {
    position: relative;
    &.shadow-border {
      /*box-shadow: 0 1px 0 #f7f6f8;*/
      @include border(1px, solid, #EBEBEB, bottom);
      box-sizing: border-box;
    }
    .app-header-left {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      height: inherit;
      button {
        display: block;
        height: inherit;
        color: inherit;
        font-size: inherit;
        padding: 0 .3rem;
        background-color: transparent;
        appearance: none;
      }
      .btn-back {
        padding-right: .15rem;
      }
    }
    .app-header-center {
      position: absolute;
      left: 50%;
      bottom: 0;
      height: inherit;
      line-height: inherit;
      transform: translateX(-50%);
    }
    .app-header-right {
      position: absolute;
      right: 0;
      bottom: 0;
      height: inherit;
      button {
        display: block;
        height: inherit;
        color: inherit;
        font-size: inherit;
        padding: 0 .3rem;
        background-color: transparent;
        appearance: none;
      }
    }
  }
</style>
