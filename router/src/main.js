import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
// 导入router实例，并将router加入Vue根实例options
new Vue({
  name: 'ii',
  router,
  render: h => h(App)
}).$mount('#app')
