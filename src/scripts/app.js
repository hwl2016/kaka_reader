import Vue from 'vue';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import App from './app.vue';
import router from './router/index';
import fastclick from 'fastclick'
// import './assert/stylus/style.styl'
// import './assert/style/font-icon/iconfont.css'

fastclick.attach(document.body);

Vue.use(Mint);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});