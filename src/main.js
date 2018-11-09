
import 'bulma'
import 'font-awesome/scss/font-awesome.scss'
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import VueTimepicker from 'vue2-timepicker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus,faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import Airplane from './components/Airplane'
import Airport from './components/Airport'
import Flight from './components/Flight'

library.add(faPlus,faCalendar)
 
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(VueTimepicker)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('vue-timepicker', VueTimepicker)

axios.defaults.baseURL= "https://us-central1-airline-d7985.cloudfunctions.net/api"

const router = new VueRouter({
  routes: [
    { path: '/airplane', component: Airplane },
    { path: '/airport', component: Airport },
    { path: '/flight', component: Flight }
  ]
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
