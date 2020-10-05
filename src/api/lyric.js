// 获取歌词
import axios from 'axios'

function getLyric(songmid){
  let url = '/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  let data = {
    "-": "MusicJsonCallback_lrc",
    pcachetime: new Date().getTime(),
    songmid: songmid,
    g_tk_new_20200303: 5381,
    g_tk: 5381,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }

  return axios.get(url,{
    params: data
  }).then(res=>{
    return Promise.resolve(res.data.lyric)
  }).catch(err=>{
    console.log(err)
  })
}


export {
  getLyric
}
