<template>
  <div :id="tabSwiperId">
      <div class="tab-nav" :class="navClass">
        <swiper :options="navOption" ref="navSwiper">
          <slot name="tab-nav"></slot>
          <div class="tab-active-bar" ref="tabActiveBar"></div>
        </swiper>
      </div>

      <div class="tab-content" :class="contentClass">
        <swiper :options="contentOption" ref="contentSwiper">
          <slot name="tab-content"></slot>
        </swiper>
      </div>
  </div>
</template>

<script>
  
  /**
   * TabSwiper components.
   * @module components/common/TabSwiper
   * @param {Object} props
   * @param {String} props.swiperId  tab模块id
   * @param {Number} [props.barWidth=0.6]  滑块宽度, 取值[0,1]
   * @param {function} props.onSlideChangeEnd 滑动结束后回调函数
   * @param {Number} [props.contentHeight=300] 内容高度
   * @param {Boolean} [props.isContentHeight=false] 是否设置 slide 内容高度
   * @param {String} [props.contentClass=example-content]  内容样式
   * @param {String} [props.navClass=example-nav] nav 样式
   * @param {Object} slot
   * @param {Object} slot.tab-nav
   * @param {Object} slot.content
   */
import { swiper } from 'vue-awesome-swiper'
import { getPageViewHeight, setStyle, addClass, removeClass } from '@/plugins/utils/'

const swiperBox = {}
let tabW = 0
let barW = 0

export default {
    data  () {
      return {
        // tab条swiper数据
        navOption: {
          slidesPerView: 'auto'
        },
        // 内容swiper数据
        contentOption: {
          onProgress: function (swiper, progress) {
            let tabRoot = document.getElementById(swiperBox.tabSwiperId)
            if (!tabRoot) return false
            
            let tabActiveBar = tabRoot.querySelector('.tab-active-bar')
            let slideAmount = tabRoot.querySelectorAll('.tab-nav .swiper-slide').length
            let index = swiper.activeIndex || 0
            setStyle(tabActiveBar, 'transition-duration', '0s')
            
            const slideFullProgress = 1 / (slideAmount - 1) // 单个分页进度总值
            let slideProgress = progress % slideFullProgress / slideFullProgress // 分页进度，范围[0,1]
            let willActiveIndex = Math.floor(progress / slideFullProgress) // 将要处于显示状态的分页的序号
            
            if (progress >= 0 && progress <= 1) {
              // 大于4个tab页
              if (slideAmount >= 3) {
                if (slideProgress <= 0.5) {
                  setStyle(tabActiveBar, 'width', (barW + tabW * slideProgress * 2) + 'px')
                } else {
                  setStyle(tabActiveBar, {
                    'left': (tabW * willActiveIndex + tabW * (slideProgress - 0.5) * 2) + 'px',
                    'width': (barW + tabW - tabW * (slideProgress - 0.5) * 2) + 'px'
                  })
                }
              } else {  // 小于4个tab页
                if (swiper.previousIndex < index) {
                  setStyle(tabActiveBar, 'left', (tabW * index - tabW * Math.abs(1 - progress)) + 'px')
                } else if (swiper.previousIndex > index) {
                  setStyle(tabActiveBar, 'left', (tabW * index + tabW * Math.abs(progress)) + 'px')
                }
              }
            }
          },
          onSetTransition: function (swiper) {
            const tabRoot = document.querySelector(`#${swiperBox.tabSwiperId}`)
            const tabActiveBar = tabRoot.querySelector('.tab-active-bar')
            
            setStyle(tabActiveBar, 'transition-duration', '0.25s')
            setStyle(tabActiveBar, {
              'left': tabW * swiper.activeIndex + 'px',
              'width': barW + 'px'
            })
          },
          onSlideChangeStart: function (swiper) {
            let activeIndex = swiper.activeIndex
            const tabRoot = document.querySelector(`#${swiperBox.tabSwiperId}`)
            const navSlide = tabRoot.querySelectorAll('.tab-nav .swiper-slide')
            
            for (let i = 0; i < navSlide.length; i++) {
              if (activeIndex === i) {
                addClass(navSlide[i], 'active')
              } else {
                removeClass(navSlide[i], 'active')
              }
            }
            
            if (swiperBox.navSwiper) {
              if (swiper.previousIndex < swiper.activeIndex) {
                swiperBox.navSwiper.slideTo(swiper.activeIndex - 2)
              } else {
                swiperBox.navSwiper.slideTo(swiper.activeIndex - 1)
              }
            }
          },
          onSlideChangeEnd: function (swiper) {
            swiperBox.onSlideChangeEnd && swiperBox.onSlideChangeEnd(swiper)
          }
        }
      }
    },
    props: {
      swiperId: {
        type: String,
        required: true,
        default: 'example'
      },
      onSlideChangeEnd: {
        type: Function
      },
      // 滑条宽度 = tab宽度 * barWidth
      barWidth: {
        type: Number,
        default: 0.4  // [0,1]
      },
      // 内容slide高度
      contentHeight: {
        type: Number,
        default: 300
      },
      // 是否设置内容slide高度
      isContentHeight: {
        type: Boolean,
        default: false
      },
      contentClass: {
        type: String,
        default: 'example-content'
      },
      navClass: {
        type: String,
        default: 'example-nav'
      }
    },
    components: {
      swiper
    },
    computed: {
      tabSwiperId () {
        return 'tabSwiper-' + this.swiperId
      },
      navSwiper () {
        return this.$refs.navSwiper.swiper
      },
      contentSwiper () {
        return this.$refs.contentSwiper.swiper
      },
      tabActiveBar () {
        return this.$refs.tabActiveBar
      },
      contentSwiperHeight () {
        let viewHeight = getPageViewHeight()
        let tabs_warpHeight = document.querySelector('.tab-nav').offsetHeight
        return this.isContentHeight ? this.contentHeight : (viewHeight - tabs_warpHeight)
      }
    },
    mounted () {
      this.init()
      this.tanNavSwiper()
      this.setcontentSwiperHeight()
    },
    methods: {
      init () {
        const tabRoot = document.querySelector(`#${this.tabSwiperId}`)
        // 获取tabW宽度
        tabW = tabRoot.querySelector('.tab-nav .swiper-slide').offsetWidth
        barW = tabW * this.barWidth

        // 暴露数据到swiperBox命名空间下、方便全局访问
        setTimeout(() => {
          swiperBox.navSwiper = this.navSwiper
          swiperBox.contentSwiper = this.contentSwiper
          swiperBox.tabActiveBar = this.tabActiveBar
          swiperBox.tabSwiperId = this.tabSwiperId
          swiperBox.onSlideChangeEnd = this.onSlideChangeEnd || null
        }, 0)

        // 设置tabBar宽度位置
        setStyle(tabRoot.querySelector('.tab-active-bar'), {
          'width': barW + 'px',
          'margin-left': (tabW - barW) * 0.5 + 'px'
        })
        addClass(tabRoot.querySelector('.tab-nav .swiper-slide'), 'active')
      },
      tanNavSwiper () {
        const tabRoot = document.querySelector(`#${this.tabSwiperId}`)
        const naSwiperSlide = tabRoot.querySelectorAll('.tab-nav .swiper-slide')
        
        for (let i = 0; i < naSwiperSlide.length; i++) {
          naSwiperSlide[i].addEventListener('click', function () {
            swiperBox.contentSwiper.slideTo(i)
          }, false)
        }
      },
    /**
     * 设置contentSwiper容器的高度
     * @inner
     * @function
     * @name setcontentSwiperHeight
     */
      setcontentSwiperHeight () {
        try {
          const tabRoot = document.querySelector(`#${this.tabSwiperId}`)
          const contentSwiperSlide = tabRoot.querySelectorAll('.tab-content .swiper-slide')
          console.log(contentSwiperSlide.length)
          for (let i = 0; i < contentSwiperSlide.length; i++) {
            contentSwiperSlide[i].style.height = this.contentSwiperHeight + 'px'
          }
        } catch (e) {
          console.log(e.message)
        }
      }
    }
}

</script>

<style lang="scss">
.tab-nav {
  overflow-x: hidden;
  position: relative;
  width: 100%;

  .swiper-container{
    height: .9rem;
    width: 100%;
    display: flex;
    background-color: #fff;

    .swiper-slide{
      text-align: center;
      font-size: .28rem;
      flex: 1 0 1.8rem;
      line-height: .9rem;
      color: #B2B4C6;
    }
    .swiper-slide.active {
      color: #2D2F46;
      font-weight: bold;
    }
  }

  .tab-active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: .06rem;
    background-color: #2D2F46;
    border-radius: 2px;
    transition-property: all;
  }
}

.tab-content {
  .swiper-slide {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
