<template>
	<div>
	<div class="shopCart">
		<div class="content">
			<div class="content-left" @click="listToggle">
				<div class="logo-wrapper">
					<div class="badge" v-show="totalCount">
						{{totalCount}}
					</div>
					<div class="logo" :class="{'active':totalPrice}">
						<i class="icon-sopping-cart"></i>
					</div>
				</div>
				<div class="price" :class="{'active':totalPrice}">￥{{totalPrice}}</div>
				<div class="con-desc">
					另需要费送费￥{{deliveryPrice}}元
				</div>
			</div>
			<div class="content-right" :class="{'enough':totalPrice>=minPrice}">
				{{payDesc}}
			</div>
			<div class="ball-container">
				<template v-for="ball in balls">
					<transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" >
						<div class="ball"   v-show="ball.show">
							<div class="inner inner-hook"></div>
						</div>
					</transition>
				</template>	
			</div>
			<transition name="transHeight">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-header clearfix">
						<h1 class="title f-l">购物车</h1>
						<span class="empty f-r" @click="setEmpty()">清空</span>
					</div>
					<div class="list-content" ref="foodlist">
						<ul>
							<li class="food" v-for="food in selectFoods">
								<span class="name">{{food.name}}</span>
								<div class="food-price">
									<span>￥{{food.price*food.count}}</span>
								</div>
								<cartcontrol :food="food"></cartcontrol>
							</li>
						</ul>	
					</div>
				</div>
			</transition>
		</div>
	</div>	
		<transition name="fade-backdrop">
			<div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
		</transition>
	</div>
</template>


<script type="text/javascript">
	import cartcontrol from '@/components/cartcontrol/cartcontrol'
	import BScroll from 'better-scroll'
	export default({
		data(){
			return{
				listShow:false,
				balls:[
					{show:false},
					{show:false},
					{show:false},
					{show:false},
					{show:false}
				],
				dropBalls:[]
			}
		},
		components:{
			'cartcontrol':cartcontrol
		},
		props:{
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			},
			selectFoods:{
				type:Array,
				default:[]
			}
		},
		created(){
			this.$root.eventHub.$on('add',this.drop);
		},
		computed:{
			totalCount(){
				let count=0;
				this.selectFoods.forEach((food)=>{
					count+=food.count;
				})
				return count;
			},
			totalPrice(){
				let price=0;
				this.selectFoods.forEach((food)=>{
					if(food.count){
						price +=food.price*food.count;
					}
				})
				return price;
			},
			payDesc(){
				let diff=this.minPrice-this.totalPrice;
				if(!this.totalPrice){
					return `￥${this.totalPrice}起送`;
				}else if(diff>0){
					return `还差￥${diff}元`;
				}else{
					return '去结算';
				}
			},
			showBackdrop(){
				if(this.listShow&&this.totalPrice){
					return true
				}
				this.listShow=false;
				return false;
			}
		},
		methods:{
			drop(el){
				for(let i=0,l=this.balls.length;i<l;i++){
					let ball=this.balls[i];
					if(!ball.show){
						ball.show=true;
						ball.el=el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeEnter(el){//小球运动之前的定位
				//求出全部小球的数量

				let count = this.balls.length;
				//遍历每个小球
				while(count--){
					//取出对应的小球
					let ball=this.balls[count];
					//定位只显示的小球
					if(ball.show){
						//获取添加订餐食物的小球位置getBoungdingClientRect();
						let rect = ball.el.getBoundingClientRect();
						//计算小球到订餐食物的小球的位置距离(x,y)
						let x=rect.left-32;
						let y=-(window.innerHeight-rect.top-22);
						el.style.display='';
						var inner=el.querySelector(".inner-hook");
						//设置小球的位置样式
						el.style.webkitTransform=`translate3d(0,${y}px,0)`;
						el.style.transform=`translate3d(0,${y}px,0)`;
						inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
						inner.style.transform=`translate3d(${x}px,0,0)`;
					}
				}
			},
			enter(el){//当小球进入动画之后的动作
				//触发浏览器的重绘el.offsetHeight\el.offsetTop...
				el.offsetHeight;
				//确保dom操作有效nextTick()
				this.$nextTick(()=>{
					let inner=el.querySelector(".inner-hook");
					//设置小球的样式
					el.style.webkitTransform=`translate3d(0,0,0)`;
					el.style.transform=`translate3d(0,0,0)`;
					inner.style.webkitTransform=`translate3d(0,0,0)`;
					inner.style.transfrom=`translate3d(0,0,0)`;
				});
			},
			afterEnter(el){
				let ball=this.dropBalls.shift();
				if(ball.show){
					ball.show=false;
					el.style.display="none";
				}
			},
			/*drop(el) {
			      for (let i = 0, l = this.balls.length; i < l; i++) {
			        let ball = this.balls[i]
			        if (!ball.show) {
			          ball.show = true
			          ball.el = el
			          this.dropBalls.push(ball)
			            console.log(el);
			          return
			        }
			      }
    		},
			beforeEnter(el) {
			      let count = this.balls.length
			     // console.log(count,el);
			      while (count--) {
			        let ball = this.balls[count]
			        if (ball.show) {
			          let rect = ball.el.getBoundingClientRect()
			          let x = rect.left - 32;
			          let y = -(window.innerHeight - rect.top - 22)
			          el.style.display = ''
			          console.log(x,y,rect,ball.el,el,ball);
			          el.style.webkitTransform = `translate3d(0,${y}px,0)`
			          el.style.transform = `translate3d(0,${y}px,0)`
			          let inner = el.querySelector('.inner-hook')
			          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
			          inner.style.transform = `translate3d(${x}px,0,0)`
			        }
			      }
   			 },
		    enter(el) {
			      el.offsetHeight //触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
			      this.$nextTick(() => {
			        el.style.webkitTransform = 'translate3d(0,0,0)'
			        el.style.transform = 'translate3d(0,0,0)'
			        let inner = el.querySelector('.inner-hook')
			        inner.style.webkitTransform = 'translate3d(0,0,0)'
			        inner.style.transform = 'translate3d(0,0,0)'
			      })
		    },
		    afterEnter(el) {
			      let ball = this.dropBalls.shift()
			      if (ball) {
			        ball.show = false
			        el.style.display = 'none'
			      }
		 	 },*/
			hideBackdrop(){
				this.listShow=false;
			},
			_initScroll(){
				this.foodlistScroll=new BScroll(this.$refs.foodlist,{
					click:true
				})
			},
			listToggle(){
				if(!this.selectFoods.length){
					return;
				}
				this.listShow=!this.listShow;	
				if(this.listShow){
					if(!this.foodlistScroll){
						this._initScroll();
					}else{
						this.foodlistScroll.refresh();
					}
				}
			},
			setEmpty(){
				this.selectFoods.forEach(food=>{
					food.count=0;
				})
			}
		}
	})
</script>

<style>
	.shopCart{
		position:fixed;
		bottom:0;
		left:0;
		z-index:50;
		width:100%;
	}
	.shopCart .content{
		display:flex;
		background-color:#141d27;
	}
	.content-left{
		flex:1;
		height:48px;
	}
	.logo-wrapper{
		display:inline-block;
		width:56px;
		height:56px;
		position:relative;
		top:-10px;
		margin:0 12px;
		padding:6px;
		box-sizing:border-box;
		border-radius:50%;
		background-color:#141d27;
	}
	.logo-wrapper .badge{
		position:absolute;
		top:0;
		right:0;
		width:24px;
		height:16px;
		color:#fff;
		background-color:#f01414;
		font-size:12px;
		text-align:center;
		line-height:16px;
		box-shadow:0 4px 8px 0 rgba(0,0,0,.4);
		font-weight:700;
		border-radius:16px;
	}
	.logo{
		width:100%;
		height:100%;
		border-radius:50%;
		background-color:#2b343c;
		color:#80858a;
	}
	.logo::after,.logo::before{
		display:table;
		content:'';
	}
	  .food .cartcontrol{
    position:absolute;
    top:12px;
    right:12px;
  }
	.logo.active{background-color:rgb(0,160,220);}
	.logo i{
		display:inline-block;
		margin:10px 0 0 9px;
		width:25px;
		height:24px;
		background:url(../../assets/images/shopping.png) no-repeat 0 0;
		background-size:25px 24px;
	}
	.logo.active i{
		background:url(../../assets/images/shopping1.png) no-repeat 0 0;
		background-size:25px 24px;
	}
	.price{
		display:inline-block;
		vertical-align:top;
		color:hsla(0,0%,100%,.4);
		font-size:16px;
		margin-top:12px;
		font-weight:700;
		line-height:24px;
		border-right:1px solid hsla(0,0%,100%,.1);
		padding-right:12px;
	}
	.price.active{color:#fff;}
	.content-left .con-desc{display:inline-block;vertical-align:top;color:hsla(0,0%,100%,.4);
		margin:12px 0 0 12px;
		font-size:12px;
		line-height:24px;
		font-weight:700;
	}
	.content-right{
		flex:0 0 105px;
		background-color:#2b343c;
		line-height:48px;
		text-align:center;
		font-size:12px;
		color:hsla(0,0%,100%,.4);
		font-weight:700;
	}
	.content-right.enough{
		background-color:#00b43c;
		color:#fff;
	}
	.shopcart-list{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		background-color:#fff;
		transform:translate3d(0,-100%,0);

		z-index:-1;
	}
	.list-header{
		height:40px;
		line-height:40px;
		background-color:#f3f5f7;
		border-bottom:1px solid rgba(7,17,27,.1);
		padding:0 18px;
	}
	.list-header .title{font-size:14px;color:#07111b;}
	.list-header .empty{
		font-size:12px;
		color:#00a0dc;
	}
	.food{
		height:48px;
		position:relative;
		line-height:48px;
		margin:0 18px;
		border-bottom:1px solid rgba(7,17,27,.1);
		display:flex;
	}
	.food .name{
		flex:1;
	}
	.food .food-price{
		position:absolute;
		right:90px;
		padding:0 12px 0 18px;
		font-weight:700;
		font-size:14px;
		color:#f01414;
	}
	.food  .cartcontrol-box{
		position:relative;
		line-height:48px;
		font-size: 14px;
		margin-top:13px;
	}
	.transHeight-enter-active,.transHeight-leave-active{
      transition: all 0.5s;
	}
    .transHeight-enter,.transHeight-leave-active{
      transform: translate3d(0,0,0);
    }
    .backdrop{
    	position:fixed;
    	top:0;
    	left:0;
    	right:0;
    	bottom:0;
    	background-color:rgba(7,17,27,.6);
    	z-index:40;
    }
    .fade-backdrop-enter-active,.fade-backdrop-leave-active{
    transition: opacity 0.5s;}
  .fade-backdrop-enter,.fade-backdrop-leave-active{
    opacity:0}
	.ball{
		position:fixed;
		bottom:32px;
		left:32px;
		z-index:200;
	}
	.drop-enter,.drop-enter-active{
        transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
	}
	.drop-enter .inner,.drop-enter-active .inner{
		width:16px;
		height:16px;
		border-radius:50%;
		background-color:rgb(0,160,220);
		transition:all .4s linear;
	}
</style>

