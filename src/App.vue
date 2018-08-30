<template>
  <div id="app">
    <loading :state="loadingState"></loading>
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { Loading } from './components/'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    components: {
      Debug: () => import('./components/common/debug/debug'),
      Loading
    },
    computed: {
      ...mapGetters([ 'loadingState' ]),
      isDebug () {
        return process.env.NODE_ENV === 'production'
      }
    }
  }
</script>

<style lang="scss">
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
