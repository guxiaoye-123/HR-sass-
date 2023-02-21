//  负责管理所有的自定义指令

export const imageerror = {
  // 指令对象
  inserted(dom, options) {
    // dom 表示当前指令的dom对象
    // dom 认为此时就是图片
    // 当图片有地址， 但是地址没有加载成功的时候，会触发图片的一个事件 -> onerror
    dom.onerror = () => {
      dom.src = options.value
    }
  }
}
