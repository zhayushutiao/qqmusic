<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner" @click="select">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      touches: {} // 存放触摸事件的数据
    }
  },
  methods: {
    touchstart(e){
      // 设置一个开关，记录触摸事件是否开始
      this.touches.start = true
      // 记录播放的进度
      this.touches.offsetWidth = this.$refs.progress.clientWidth
      // 记录开始点击的位置
      this.touches.startX = e.touches[0].pageX
    },
    touchmove(e){
      // 判断start是否为true
      if(this.touches.start){
        // 开始移动
        // 计算进度条按钮滑动的距离
        let current = e.touches[0].pageX // 滑动的当前位置
        // 移动距离=当前位置-开始位置
        let distance = current - this.touches.startX
        // 小圆点的实际的位移=移动的距离+初始的距离
        distance = distance + this.touches.offsetWidth
        // 判断小圆点有没有超出进度条的范围
        if(distance<0){
          distance = 0
        }
        if(distance>this.$refs.progressBar.clientWidth){
          distance = this.$refs.progressBar.clientWidth
        }
        this._offSet(distance)
      }
    },
    touchend(e){
      // 松开手指
      // 关闭开关
      this.touches.start = false
      this._setPercent()
    },
    _offSet(distance){
      // 修改位移
      this.$refs.progressBtn.style.transform = `translateX(${distance-8}px)`
      this.$refs.progress.style.width = `${distance}px`
    },
    _setPercent(){
      // 修改进度条
      let barWidth = this.$refs.progressBar.clientWidth // 进度条总长度
      let progressWidth = this.$refs.progress.clientWidth // 播放的进度
      let percent = progressWidth / barWidth // 计算比例
      // 将比例派发出去
      this.$emit('changePercent',percent)
    },
    select(e){
      this._offSet(e.offsetX)
      this._setPercent()
    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch:{
    percent(){
      // 监听percent的改变，实时修改进度条的长度
      // 当开始触摸/拖动进度条时，不再自动改变进度条的长度
      if(this.touches.start){
        return ;
      }
      // 自动移动播放进度
      // 播放进度=比例*总长度
      let barWidth = this.$refs.progressBar.clientWidth
      let offsetWidth = this.percent * barWidth
      this._offSet(offsetWidth)
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~@common/stylus/variable'
.progress-bar
  height 30px
  .bar-inner
    position relative
    top 13px
    height 4px
    background rgba(255, 255, 255, 0.5)
    .progress
      position absolute
      height 100%
      background $color-theme
    .progress-btn-wrapper
      position absolute
      left -8px
      top -13px
      width 30px
      height 30px
      .progress-btn
        position relative
        top 7px
        left 7px
        box-sizing border-box
        width 16px
        height 16px
        border 3px solid #fff
        border-radius 50%
        background #fff
</style>