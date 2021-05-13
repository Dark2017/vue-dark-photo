import Vue from 'vue'
import App from './App.vue'
import print from '../utils/print'
import viewPhoto from '../packages/viewPhoto'
import { Tooltip, Dialog, Icon } from 'element-ui';
Vue.config.productionTip = false

Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(print)
Vue.use(viewPhoto)

new Vue({
  render: h => h(App),
}).$mount('#app')
