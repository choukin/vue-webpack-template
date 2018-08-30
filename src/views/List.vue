<template>
  <section class="list-warp">
    <transition-group name="list">
      <a class="list-item"  v-for="(item, key) in movies" :key="key">
        <h3 class="item-title">{{item.title}}</h3>
        <div class="info-warp">
          <div class="user-img" v-html="ReferrerKiller.imageHtml(item.images.small,{style:';width:1.35rem;height:2.01rem;'})">
          </div>
          <div class="item-detail">
            <div class="i">
              <span>{{item.directors[0].name}}</span>
              <span>{{item.year | splitTime}}上映</span>
            </div>
            <div class="g">
              <span>{{item.rating.average}}/{{item.rating.max}}</span>
              <span>{{item.collect_count }}</span>
            </div>
          </div>
        </div>
      </a>
      
    </transition-group>
  </section>
</template>

<script>
import { getTopics } from '../api/list'
import { mapActions } from 'vuex'
import ReferrerKiller from '../lib/referrer-killer.js'
export default {
  name: 'list',

  data () {
    return {
      ReferrerKiller: ReferrerKiller,
      style: {style: '.2rem'},
      movies: []
    }
  },
  mounted () {
    this.setLoading(true)
    getTopics(1, 'ask', 20)
    .then((res) => {
      this.setLoading(false)
      this.movies = res.subjects
      console.log(ReferrerKiller.imageHtml(this.movies[0].images.small))
    })
    .catch((error) => {
      this.setLoading(false)
      console.log(error)
    })
  },
  filters: {
    refer (src) {
      return src
    },
    referrerKiller (src) { 
      return ReferrerKiller.imageHtml(src)
    },
    // referrerKiller  = (src ) =>ReferrerKiller.imageHtml(src) {
    //   console.log('1231' + ReferrerKiller.imageHtml(src))
    //   return '<span>1234</span>'
    // },
    timeFormat (time) {
      let timeStr
      let minute = 1000 * 60
      let hour = minute * 60
      let day = hour * 24
      let month = day * 30
      let date = new Date(time)
      let curDate = new Date()
      let diffValue = curDate.getTime() - date.getTime()
      if (diffValue < 0) return
      let monthC = diffValue / month
      let weekC = diffValue / (7 * day)
      let dayC = diffValue / day
      let hourC = diffValue / hour
      let minC = diffValue / minute

      if (monthC >= 1) {
        timeStr = '' + parseInt(monthC) + '月前'
      } else if (weekC >= 1) {
        timeStr = '' + parseInt(weekC) + '周前'
      } else if (dayC >= 1) {
        timeStr = '' + parseInt(dayC) + '天前'
      } else if (hourC >= 1) {
        timeStr = '' + parseInt(hourC) + '小时前'
      } else if (minC >= 1) {
        timeStr = '' + parseInt(minC) + '分钟前'
      } else {
        timeStr = '刚刚'
      }
      return timeStr
    },

    splitTime (time) {
      return time.substring(0, 10)
    }
  },
  methods: {
    ...mapActions([
      'setLoading'
    ])
  }
}
</script>

<style lang="scss">
@import '../assets/style/base.scss';

@mixin text-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}

.list-item {
  text-align: left;
  display: block;
  margin: .2rem .1rem;
  padding: .2rem;
  background-color: #fff;
  /*box-shadow: 0 1px 5px #b2b2b2;*/
  @include border(1px, solid, #228025, '');
}

.item-title {
  font-size: .26rem;
  @include text-overflow;
  padding-bottom: .1rem;
  color: #333;
  text-align: left;
}

.info-warp {
  display: flex;
  .user-img {
    width: 2rem;
    height: 2rem;
    border-radius: .02rem;
    overflow: hidden;
    img {
      width: 1rem;
      height: auto;
    }
  }
  .item-detail {
    font-size: .24rem;
    flex: 1 1 auto;
    display: flex;
    padding-left: .2rem;
    justify-content: space-between;
    .i,.g {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color:#787878;
    }
    .g {
        align-items: flex-end;
    }
  }
}
</style>
