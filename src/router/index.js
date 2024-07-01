import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// import Home from '../views/Home.vue'
// import About from '../views/About.vue'
/*上面为基本引入方式，如果使用下面的import方法，
                    webpack会对引入的组件进行分包处理*/
//路由的懒加载
// const Home = () => import(/* webpackChunkName: 'home' */"../views/Home.vue")
// const About = () => import(/* webpackChunkName: 'about' */"../views/About.vue")

// 创建一个路由： 映射关系
const router = createRouter({
    //指定采用的模式:hash
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            name: "home",
            path: "/home",
            component: () => import(/* webpackChunkName: 'home' */"../views/Home.vue"),
            meta: {
                name: "patrickstar",
                age: 23
            },
            children: [
                {
                    path: "/home",
                    redirect: "/home/recommend"
                },
                {
                    path: "recommend", // /home/recommend
                    component: () => import("../views/HomeRecommend.vue")

                },
                {
                    path: "ranking",
                    component: () => import("../views/HomeRanking.vue")
                }
            ]
        },
        {
            name: "about",
            path: "/about",
            component: () => import(/* webpackChunkName: 'about' */"../views/About.vue")

        },
        {
            path: "/user/:id",
            component: () => import("../views/User.vue")
        },
        {
            // 如果匹配到任何一个不存在的路径，那么就自动显示下面的这个组件
            path: "/:pathMatch(.*)",
            component: () => import("../views/NotFound.vue")
        }
    ]
})

export default router