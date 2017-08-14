import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/header/header'
import Star from '@/components/star/star'
import Icon from '@/components/iconMap/iconMap'
import Goods from '@/components/goods/goods'
import Cartcontrol from '@/components/cartcontrol/cartcontrol'
import foodDetail from '@/components/foodDetail/foodDetail'
import shopCart from '@/components/shopCart/shopCart'
import rating from '@/components/rating/rating'
import seller from '@/components/seller/seller'

Vue.use(Router)

const router = new Router({
  mode:"history",
  routes: [
    {
      path:"/",
      name:'Goods',
      component:Goods,
      children:[
        
      ]
    },
    {
      path:'/header',
      name:'Header',
      component: Header
    },
    {
      path:"/star",
      name:"Star",
      component: Star
    },
    {
      path:"/iconMap",
      name:"Icon",
      component: Icon
    },
    {
      path:"/cartcontrol",
      name:"Cartcontrol",
      component:Cartcontrol
    },
    {
      path:"/foodDetail",
      name:"foodDetail",
      component:foodDetail
    },
    {
      path:'/shopCart',
      name:'shopCart',
      conponent:shopCart
    },
    {
      path:'/rating',
      name:'rating',
      component:rating
    },
    {
      path:'/seller',
      name:'seller',
      component:seller
    }
  ],
  linkActiveClass:'active'
})

router.beforeEach((to,from,next)=>{
		next();
})

export default router
