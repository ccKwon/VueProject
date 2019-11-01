import Vue from 'vue'

// 导入自定义路由模块
import router from './router.js'

// 导入 vue-router 包
import VueRouter from 'vue-router'



// 通过 Vue.use() 明确地安装路由功能
Vue.use(VueRouter)
import app from './APP.vue'

import MinUi from 'mint-ui'
Vue.use(MinUi)
import 'mint-ui/lib/style.css'

// 导入 MUI
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
// import './lib/mui/css/mui.min.css'

// 导入 vuex 
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.store({
    state: {
      cart: []  
    },

    mutations: {
        addToCart(state, goodsinfo) {

            var flag = false;
            // 如果购物车中有这个商品 则只增加数量
            state.cart.some(item => {
                if(item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })

            if( !flag ) {
                state.cart.push(goodsinfo);
            }


        }
    },


    getters: {  //类似于 computed
        getAllCount(state) {
            var sum = 0;
            state.cart.forEach(goods => {
                sum += goods.count;
            });
            return sum;
        }
    },
})



// 导入 Vue-Resource
import VueResource from 'vue-resource'
// 安装 Vue-Resource
Vue.use(VueResource)

import 'moment'
import moment from 'moment'

// 导入 Vue_Preview 插件
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)

// 定义全局过滤器
Vue.filter('dateFormat', function(dataStr, parent = "YYYY-MM-DD HH:mm:ss"){
   return moment(dataStr).format(parent)
})

// 全局设置请求的根路径
Vue.http.options.root = "http://www.liulongbin.top:3005"
Vue.http.options.emulateJSON = "true"



var vm = new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(app)
    },

    router: router,

    store:store
})