// 封装歌曲类
/* 
用到的数据： 
albummid 专辑的id
albumname 专辑的名称
songmid 歌曲id
songname 歌曲名称
singer 唱歌的人
*/
export default class Song {
  constructor({albummid,albumname,songmid,songname,singer,interval},url){
    this.albummid = albummid
    this.albumname = albumname
    this.songmid = songmid
    this.songname = songname
    this.singer = format(singer)
    this.interval = interval
    this.url = url
  }
}

/**
 * 将数组格式的歌手信息格式化为字符串
 * xxx / xxx / xxx
 * @param {Array} singer 
 */
function format(singer){
  let names = []
  singer.forEach(val=>{
    names.push(val.name)
  })
  return names.join(' / ')
}