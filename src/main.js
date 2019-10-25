import Vue from 'vue'

// 导入自定义路由模块
import router from './router.js'

// 导入 vue-router 包
import VueRouter from 'vue-router'

// 通过 Vue.use() 明确地安装路由功能
Vue.use(VueRouter)
import app from './APP.vue'

// 按需导入 mint-ui
import { Header } from 'mint-ui'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入 MUI
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'


import VueResource from 'vue-resource'
Vue.use(VueResource)



var vm = new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(app)
    },

    router: router,
})