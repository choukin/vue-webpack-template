import Vue from 'vue'

const ToastConstructor = Vue.extend(require('./toast.vue'))
let toastPool = []

let getAnInstance = () => {
  if (toastPool.length > 0) {
    let instance = toastPool[0]
    toastPool.splice(0, 1)
    return instance
  }
  return new ToastConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    toastPool.push(instance)
  }
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

ToastConstructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
  returnAnInstance(this)
}
/**
 * @param {Object} options
 * @param {String} options.message - 提示文字
 * @param {String} [options.position=middle] - 位置，top、middle、bottom
 * @param {String} [options.duration=2000] - 多少时间消失
 * @param {String} options.className - 自定义样式
 * @param {String} options.icon - 自定义显示icon，success、fail、prompt、warning
 * @example
 *
 * Toast({
 *  message: '操作成功',
 *  icon: 'success',
 *  duration: 3000
 * })
 */
const Toast = (options = {}) => {
  let duration = options.duration || 2000

  let instance = getAnInstance()
  instance.closed = false
  clearTimeout(instance.timer)
  instance.message = typeof options === 'string' ? options : options.message
  instance.position = options.position || 'middle'
  instance.className = options.className || ''
  instance.icon = options.icon || ''

  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeDom)
    ~duration && (instance.timer = setTimeout(function () {
      if (instance.closed) return
      instance.close()
    }, duration))
  })
  return instance
}

export default Toast
