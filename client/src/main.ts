import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import axios from 'axios'
import './styles/style.scss'
import './styles/navbar.scss'
import 'bootstrap'
import App from './App.vue'
import Home from './views/Home.vue'

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home}
    ]
})

createApp(App)
    .use(router)
    .mount('#app')
