import VueRouter from 'vue-router'
import HomePage from './components/tabbar/Home.vue' 
import MemberPage from './components/tabbar/member.vue'
import ShopcartPage from './components/tabbar/Shopcart.vue'
import SearchPage from './components/tabbar/Search.vue'
import NewsListPage from './components/tabbar/NewsList.vue'
import NewsInfoPage from './components/tabbar/NewsInfo.vue'
import PhotosList from './components/photos/PhotosList.vue'
import Photoinfo from './components/photos/Photoinfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodDesc from './components/goods/GoodsDesc.vue'
import GoodComments from './components/goods/GoodComments.vue'
var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomePage },
        { path: '/member', component: MemberPage },
        { path: '/cart', component: SearchPage },
        { path: '/search', component: ShopcartPage },
        { path: '/home/newslist', component: NewsListPage },
        { path: '/home/newslist/newsinfo/:id', component: NewsInfoPage },
        { path: '/home/photoslist', component: PhotosList },
        { path: '/home/photoslist/photoinfo/:id', component: Photoinfo },
        { path: '/home/goodslist', component: GoodsList },
        { path: '/home/goodslist/goodinfo/:id', component: GoodsInfo },
        { path: '/home/goodslist/goodinfo/gooddesc/:id', component: GoodDesc, name: 'gooddesc'},
        { path: '/home/goodslist/goodinfo/goodcomments/:id', component: GoodComments, name: 'goodcomments'},
    ],
    linkActiveClass: 'mui-active'   //覆盖默认的路由高亮的类 router-link-active
})

 
export default router