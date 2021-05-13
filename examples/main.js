import Vue from 'vue'
import App from './App.vue'
import viewPhoto from '../packages/viewPhoto'
Vue.config.productionTip = false

Vue.use(viewPhoto)
new Vue({
  render: h => h(App),
}).$mount('#app')
