import Vue from 'vue'
import Router from 'vue-router'
// let config = {
//     isLogin: true,
//     access_token: 'asdf1234',
//     uuid: 'qwer7890'
// }
// localStorage.setItem('appStatus', JSON.stringify(config));
// let appStatus = JSON.parse(localStorage.getItem('appStatus'));
// let isLogin = appStatus.isLogin

Vue.use(Router)

const Home = (resolve) => {
    import('../pages/home.vue').then((module) => {
        resolve(module)
    })
}

export default new Router({
    routes: [
        {
            path: '/',  // 首页
            component: Home
        }
    ]
})


