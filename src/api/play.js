import axios from 'axios'

function getPlayKey(songmid) {
  let url = '/cgi-bin/musicu.fcg'
  let data = {
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    "-": "getplaysongvkey9120510439364251",
    g_tk: 1594360937,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      "req": {
        "module": "CDN.SrfCdnDispatchServer",
        "method": "GetCdnDispatch",
        "param": {
          "guid": "7695483805",
          "calltype": 0,
          "userip": ""
        }
      },
      "req_0": {
        "module": "vkey.GetVkeyServer",
        "method": "CgiGetVkey",
        "param": {
          "guid": "7695483805",
          "songmid": [songmid],
          "songtype": [0],
          "uin": "1105053841",
          "loginflag": 1,
          "platform": "20"
        }
      },
      "comm": {
        "uin": 1105053841,
        "format": "json",
        "ct": 24,
        "cv": 0
      }
    }
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    let purl = res.data.req_0.data.midurlinfo[0].purl
    if(purl==''){
      return Promise.reject('获取资源失败')
    }else{
      return Promise.resolve(purl)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

export {
  getPlayKey
}