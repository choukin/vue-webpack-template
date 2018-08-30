import Toast from '@/components/common/toast/'
import MessageBox from '@/components/common/message-box/'

/**
 * 获取Url参数
 * @param name 参数名称
 * @returns {string}
 */
export const getUrlParam = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let value = ''
  let arrHash = window.location.hash.split('?')
  let arrSearch = window.location.search.substr(1).split('?')
  
  arrHash.shift()
  let hrefstr = arrSearch[0] !== '' ? arrSearch : arrHash
  
  for (let i = 0; i < hrefstr.length; i++) {
    let r = hrefstr[i].match(reg)
    if (r !== null && r[2]) {
      value = r[2]
      break
    }
  }
  return value
}


/**
 * 深复制
 * @param {boolean} deep
 * @param {object} target 目标对象
 * @param {object} options 附加参数
 */
export const extend = (deep, target, options) => {
  for (let name in options) {
    let copy = options[name]
    if (deep && copy instanceof Array) {
      target[name] = extend(deep, [], copy)
    } else if (deep && copy instanceof Object) {
      target[name] = extend(deep, {}, copy)
    } else {
      target[name] = options[name]
    }
  }
  return target
}


// 吐司
export const toast = (payload) => {
  if (typeof payload === 'string') {
    Toast({
      message: payload
    })
  } else if (typeof payload === 'object' && payload.hasOwnProperty('message')) {
    Toast(payload)
  }
}


// 弹窗
export const messageBox = (payload) => {
  return new Promise((resolve, reject) => {
    if (typeof payload === 'string') {
      MessageBox({
        message: payload,
        cancel: () => {
          reject(payload)
        },
        ok: () => {
          resolve(payload)
        }
      })
    } else if (typeof payload === 'object' && payload.hasOwnProperty('message')) {
      MessageBox(Object.assign({}, payload, {
        cancel: () => {
          reject(payload)
        },
        ok: () => {
          resolve(payload)
        },
        showCancelBtn: payload.cancelText
      }))
    }
  })
}


/**
 * 根据rem高度计算实际高度
 * @param rem 设计稿rem高度值
 * @returns {number} 高度px值
 */
export const getPxHeight = (rem) => {
  let fontSize = document.documentElement.style.fontSize.split('p')[0]
  let wWidth = document.compatMode === 'BackCompat' ? document.body.clientWidth : document.documentElement.clientWidth
  return (wWidth * 2 / 750) * rem * fontSize
}
