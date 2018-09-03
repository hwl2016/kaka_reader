import Vue from 'vue'
import Router from 'vue-router'

// import HomePage from '../pages/home.vue'
// import SearchPage from '../pages/search.vue'
// let config = {
//     isLogin: true,
//     access_token: 'asdf1234',
//     uuid: 'qwer7890'
// }
// localStorage.setItem('appStatus', JSON.stringify(config));
// let appStatus = JSON.parse(localStorage.getItem('appStatus'));
// let isLogin = appStatus.isLogin

Vue.use(Router)

const HomePage = (resolve) => {
    import('../pages/home.vue').then((module) => {
        resolve(module)
    })
}

const SearchPage = (resolve) => {
    import('../pages/search.vue').then((module) => {
        resolve(module)
    })
}

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',  // 首页
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/search',
            name: 'SearchPage',
            component: SearchPage
        }
    ]
})


