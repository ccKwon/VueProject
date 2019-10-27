import VueRouter from 'vue-router'
import HomePage from './components/tabbar/Home.vue' 
import MemberPage from './components/tabbar/member.vue'
import ShopcartPage from './components/tabbar/Shopcart.vue'
import SearchPage from './components/tabbar/Search.vue'
import NewsListPage from './components/tabbar/NewsList.vue'
import NewsInfoPage from './components/tabbar/NewsInfo.vue'
var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomePage },
        { path: '/member', component: MemberPage },
        { path: '/cart', component: SearchPage },
        { path: '/search', component: ShopcartPage },
        { path: '/home/newslist', component: NewsListPage },
        { path: '/home/newslist/newsinfo/:id', component: NewsInfoPage },
    ],
    linkActiveClass: 'mui-active'   //覆盖默认的路由高亮的类 router-link-active
})

 
export default router