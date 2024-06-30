import { createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'

// 创建一个路由： 映射关系
const router = createRouter({
    //指定采用的模式:hash
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: Home },
        { path: "/about", component: About }
    ]
})

export default router