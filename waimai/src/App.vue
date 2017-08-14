<template>
  <div id="app">
       <v-header :seller="seller"></v-header>
       <div class="tag">
            <div class="item-tag" >
                <router-link to="/" >商品</router-link>
            </div>
            <div class="item-tag" >
                <router-link to="/rating" >评论</router-link>
            </div>
            <div class="item-tag" >
                <router-link to="/seller" >商家</router-link>
            </div>
       </div>
       <keep-alive>
           <router-view :seller="seller"></router-view>
       </keep-alive>
  </div>
</template>

<script>
import header from '@/components/header/header'
import axios from 'axios'
export default {
  name: 'app',
  data (){
    return {
      seller:{},
      index:0
    }
  },
  created(){
    axios.get('../static/data.json').then(response=>{
        this.seller=response.data.seller;
    },(err)=>{
       console.log(err);
    });
  
  },
  components:{
    'v-header':header
  }
}

</script>

<style>
   .tag{height:.80rem;color:rgb(77,85,93);font-size:.28rem;display:-webkit-box;display:box;display:-webkit-flex;display:flex;border-bottom:1px solid rgba(7,17,27,.1);}
   .tag .item-tag{flex:1;text-align:center;line-height:.80rem;} 
   .item-tag a{display:block;color:rgb(77,85,93);}
   .item-tag a.router-link-exact-active{color:rgb(240,20,20);}
</style>
