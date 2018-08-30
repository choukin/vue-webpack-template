import Vue from 'vue'
import msgboxVue from './message-box.vue'

let defaults = {
  title: '',
  message: '提示内容',
  showOkBtn: true,
  showCancelBtn: false,
  okText: '确定',
  cancelText: '取消',
  okClass: '',
  cancelClass: '',
  lock: true,
  cancel: () => {},
  ok: () => {}
}

// 合并
const merge = function (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i]
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

// 构建MessageBox实例
let instance
let MessageBoxConstructor = Vue.extend(msgboxVue)

const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  })
}

/**
 * 弹出框
 * @param {Object} options
 * @param {String} options.title - 标题
 * @param {String} [options.message=提示内容] - 消息
 * @param {String} [options.showOkBtn=true] - 是否显示确定按钮
 * @param {String} [options.showCancelBtn=false] - 是否显示取消按钮
 * @param {String} [options.okText=确定] - 自定义确定按钮文字
 * @param {String} [options.cancelText=取消] - 自定义取消按钮文字
 * @param {String} options.okClass - 自定义确定按钮class
 * @param {String} options.cancelClass - 自定义取消按钮class
 * @param {String} [options.lock=true] - 是否锁屏
 * @param {Function} options.ok - 确定回调
 * @param {Function} options.cancel - 取消回调
 * @example
 *
 * MessageBox({
 *  title: '操作成功',
 *  message: '玖富钱包打开',
 *  ok: () => {}
 * })
 */
const MessageBox = (options) => {
  if (!instance) {
    initInstance()
  }
  let opts = merge({}, defaults, options)
  for (let prop in opts) {
    if (instance.hasOwnProperty(prop)) {
      instance.$set(instance, prop, opts[prop])
    }
  }
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.lockState = true
    instance.value = true
  })
}

export default MessageBox
