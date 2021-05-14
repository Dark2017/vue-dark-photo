import Vue from 'vue'
import App from './App.vue'
import VDPhoto from '../packages'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(VDPhoto)

new Vue({
  render: h => h(App),
}).$mount('#app')
