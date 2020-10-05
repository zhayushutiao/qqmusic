<template>
  <transition name="slide">
    <MusicList :title="diss.name" :avatar="diss.imgurl" :songs="songs"></MusicList>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import MusicList from '../../base/musicList/musicList'
import recom from '../../api/recommend'
import Song from '../../common/js/Song'

export default {
  data() {
    return {
      songs: []
    }
  },
  methods: {
    _getDissSongs(){
      // console.log(this.diss)
      recom.getDissSongs(this.diss.dissid).then(songs=>{
        // 遍历songs，将其封装成Song对象然后一个个添加进this.songs中
        console.log(songs)
        songs.forEach(val=>{
          this.songs.push(new Song(val,""))
        })
      })
    }
  },
  created() {
    this._getDissSongs()
  },
  computed: {
    ...mapGetters(['getSingerInfo']),
    diss(){
      return this.getSingerInfo
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus">
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>