/*
 * @Author: laijianghao
 * @Date: 2020-11-03 15:59:39
 * @FilePath: \newrongtong\src\components\viewPhoto\index.js
 * @Description : 
 */
import component from './components'
// 定义插件对象
const viewDarkphoto = {}

// vue的install方法，用于定义vue插件
viewDarkphoto.install = (Vue, opt) => {
  const ComponentBoxInstance = Vue.extend(component)

  let currentComponentBox

  const initInstance = () => {
    // 实例化vue实例
    currentComponentBox = new ComponentBoxInstance()

    let componentBoxEl = currentComponentBox.$mount().$el

    document.body.appendChild(componentBoxEl)
  }
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$ffViewPhoto = {
    show (opt) {
      // 下载
      initInstance()

      if (typeof opt === 'object') {
        Object.assign(currentComponentBox, opt)
      }

      return currentComponentBox.show()
    }
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  viewDarkphoto.install(window.Vue)
}
export default viewDarkphoto
