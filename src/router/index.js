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
                name: "patrick star",
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
            path: "/order",
            component: () => import("../views/Order.vue")
        },
        {
            path: "/login",
            component: () => import("../views/Login.vue")
        },
        {
            // 如果匹配到任何一个不存在的路径，那么就自动显示下面的这个组件
            path: "/:pathMatch(.*)",
            component: () => import("../views/NotFound.vue")
        },
    ]
})

//1.动态管理路由
let isAdmin = true
if (isAdmin) {
    //一级路由
    router.addRoute({
        path: "/admin",
        component: () => import("../views/Admin.vue")
    })

    //添加vip页面
    router.addRoute("home", {
        path: "vip",
        component: () => import("../views/HomeVip.vue")
    })
}

//获取router钟所有的映射路由对象
console.log(router.getRoutes())

// 2. 路由导航守卫
// 进行任何的路由跳转之前，传入顶多beforeEach中的函数都会被回调
// 需求： 进入到订单(order)页面时，判断用户是否登录(isLogin-> localStorage保存token)
// 情况一：用户没有登录，那么跳转到登录页面, 进行登录的操作
// 情况二：用户已经登录， 那么直接进入到订单页面
router.beforeEach((to, from) => {
    //1.进入到任何其他页面时，跳转到登录页面
    // if (to.path !== "/login") {
    //      return "/login"
    // }
    // console.log(to, from)
    
    //2. 进入到订单页面时，判断用户是否登录
    const token = localStorage.getItem("token")
    if (to.path === "/order" && !token) {
        return "/login"
    }
})

export default router