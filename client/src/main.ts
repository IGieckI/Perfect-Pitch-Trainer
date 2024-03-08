import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import axios from 'axios'
import './styles/style.scss'
import 'bootstrap'
import App from './App.vue'
import Home from './views/Home.vue'
import SetOfNotes from './views/SetOfNotes.vue'

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home},
        { path: '/set-of-notes', component: SetOfNotes},
    ]
})

createApp(App)
    .use(router)
    .mount('#app')
