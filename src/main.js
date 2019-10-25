import Vue from 'vue'

// 导入自定义路由模块
import router from './router.js'

// 导入 vue-router 包
import VueRouter from 'vue-router'

// 通过 Vue.use() 明确地安装路由功能
Vue.use(VueRouter)

// 按需导入 mint-ui
import { Header } from 'mint-ui'

//  导入 MUI
import '../lib/mui/css/mui.css'

Vue.component(Header.name, Header)

import app from './APP.vue'

console.log('ok');

var vm = new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(app)
    },

})