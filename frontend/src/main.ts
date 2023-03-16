import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'
import VueAxios from 'vue-axios'
const app = createApp(App).use(router).use(store).use(vuetify)

app.use(VueAxios, axios)

axios.defaults.baseURL = 'http://' + location.hostname + ':' + process.env.VUE_APP_BACKEND_PORT
axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
loadFonts()
app.mount('#app')
