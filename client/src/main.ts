import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import './styles/style.scss'
import 'bootstrap'
import App from './App.vue'
import Home from './views/Home.vue'
import SetOfNotes from './views/SetOfNotes.vue'
import Infinite from './views/Infinite.vue'
import Sandbox from './views/Sandbox.vue'
import Stats from './views/Stats.vue'

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/set-of-notes', component: SetOfNotes },
        { path: '/infinite', component: Infinite },
        { path: '/sandbox', component: Sandbox },
        { path: '/stats', component: Stats }
    ]
})

createApp(App)
    .use(router)
    .mount('#app')
