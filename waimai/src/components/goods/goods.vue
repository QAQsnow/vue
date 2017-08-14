<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'" @click="menuClick(index,$event)">
					<span class="text">
						<icon v-show="item.type>0" :item="item.type"></icon>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="food-wrapper" id="wrapper" ref="foodWrapper">
			<ul>
				<li class="food-list food-list-hook" v-for="item in goods">
					<h1>{{item.name}}</h1>
					<ul>
						<li class="food-item" v-for="food in item.foods" @click="goDetail(food)">
							<div class="food-photo">
								<img :src="food.icon" width="57">
							</div>
							<div class="food-desc">
								<div class="food-name">
									{{food.name}}
								</div>
								<div class="food-type" v-show="food.description">
									{{food.description}}
								</div>
								<div class="sell-info">
									<span class="sell-count">月售{{food.sellCount}}份</span>
									<span class="rating">好评率{{food.rating}}%</span>
								</div>
								<div class="sell-price">
									<span class="new-price">&yen;{{food.price}}</span>
									<span class="old-price" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<foodDetail :food="selectedFood" v-if="selectedFood" ref="myFood"></foodDetail>
		<shopCart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopCart>
	</div>
</template>

<script type="text/javascript">
	import Icon from '@/components/iconMap/iconMap'
	import Cartcontrol from '@/components/cartcontrol/cartcontrol'
	import foodDetail from '@/components/foodDetail/foodDetail'
	import shopCart from '@/components/shopCart/shopCart'
	import BScroll from 'better-scroll'
	import axios from 'axios' 
	export default({
		data(){
			return{
				goods:[],
				selectedFood:"",
				foodsScrollY:0,
				listHeight:[]
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			'icon':Icon,
			'cartcontrol':Cartcontrol,
			'foodDetail':foodDetail,
			'shopCart':shopCart
		},
		created(){
			axios.get("/static/data.json").then(response=>{
				this.goods=response.data.goods;
				this.$nextTick(()=>{
					this._initScroll();
					this._calculateHeight();
				});
			},(err)=>{
				console.log(err);
			})
		},
		computed: {
		    menuCurrentIndex() {
		      for (let i = 0, l = this.listHeight.length; i < l; i++) {
		        let topHeight = this.listHeight[i];
		        let bottomHeight = this.listHeight[i + 1];
		        if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
		          return i;
		        }
		      }
		      return 0;
		    },
		    selectFoods() {
		      let foods = []
		      //console.log(this.goods.toString());
		      this.goods.forEach((good) => {
		        good.foods.forEach((food) => {
		          if (food.count) {
		            foods.push(food);
		          }
		        })
		      })
		      return foods;
		    }
  		},
		methods:{
			_initScroll() {
			      this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
			        click: true
			      });
			      this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
			        click: true,
			        probeType: 3
     		 	   });
			       // 监控滚动事件
			      this.foodsScroll.on('scroll', (pos) => {
				       this.foodsScrollY = Math.abs(Math.round(pos.y))
				       console.log(this.foodsScrollY);
     			 })
			},
		    _calculateHeight() {
		      let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook');
		      let height = 0;
		      this.listHeight.push(height);
		      for (let i = 0, l = foodList.length; i < l; i++) {
		        let item = foodList[i];
		        height += item.clientHeight;
		        this.listHeight.push(height);
		      }
		      console.log(this.listHeight);
		    },
		    menuClick(index, event) {
		    	console.log(event._constructed);
		      if (!event._constructed) {
		        return;
		      }
		      this.foodsScroll.scrollTo(0, -this.listHeight[index], 300);
		    },
			goDetail(food){
				this.selectedFood=food;
				this.$nextTick(()=>{
					this.$refs.myFood.showToggle();				
				})			
			}
		}
	})
</script>

<style type="text/css">
	.goods{width:100%;overflow:hidden;position:absolute;top:3.49rem;display:flex;}
	.menu-wrapper{width:80px;height:auto;}
	.menu-wrapper li{width:56px;height:54px;display:table;line-height:14px;padding:0 12px;font-size:13px;overflow:hidden;border-bottom:1px solid #d7d7d7;background-color:#f3f5f7;}
	.menu-wrapper li.li-wrapper{background-color:#fff;}
	.menu-wrapper li.menu-item-selected{background-color:#fff;}
	.menu-wrapper .text{display:table-cell;vertical-align:middle;}
	.menu-wrapper .icon-logo{width:12px;height:14px;background-size:12px;margin:0 0rem 0 0;}
	.food-wrapper{flex:1;height:300px;}
	.food-list h1{height:26px;line-height:26px;font-size:12px;color:#93999f;background-color:#f3f5f7;border-left:2px solid #d9dde1;padding-left:12px;}
	.food-list ul li.food-item{display:flex;position:relative;padding:18px 0;margin:0 18px;border-bottom:1px solid #d7d7d7;}
	.food-list ul li.food-item:last-child{border:0 none;}
	li.food-item .food-photo{width:57px;height:57px;flex:0 0 57px;}
	li.food-item .food-desc{flex:1;margin-left:10px;}
	.food-desc .food-name{font-size:14px;font-weight:700;line-height:18px;}
	.food-desc .food-type,.food-desc .sell-info{font-size:12px;color:#93999f;line-height:16px;margin-top:5px;}
	.food-desc .sell-price{color:#f01414;font-size:14px;line-height:18px;}
	.sell-price .old-price{color:#93999f;padding-left:4px;text-decoration:line-through;font-size:12px;}
	.cartcontrol-wrapper{position:absolute;bottom:10px;right:0;}
</style>