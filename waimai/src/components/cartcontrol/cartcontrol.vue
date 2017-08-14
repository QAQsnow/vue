<template>
	<div class="cartcontrol">
		<transition name="move">
			 <div class="cart-decrease" v-show="this.food.count>0"	 @click.stop.prevent="decreaseCart">
			 	 <i class="icon icon-decrease inner">-</i>
			 </div>
		</transition>
		<p class="cart-count" v-show="this.food.count>0">{{food.count}}</p>
		<div class="cart-add" @click.stop.prevent="addCart"><i class="icon icon-add">+</i></div>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	export default({
		props:{
			food:Object
		},
		methods:{
			decreaseCart(event){
				if(this.food.count){
					this.food.count--;
				}
			},
			addCart(event){
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++;
				}
				this.$root.eventHub.$emit('add',event.target);
			}
		}
	})
</script>

<style type="text/css">
	.cartcontrol{display:flex;}
	.cartcontrol i.icon{display:block;width:18px;height:18px;border-radius:50%;font-weight:700;font-family:Simsun;text-align:center;font-size:18px;border:2px solid #00a0dc;line-height:18px;}
	.icon-decrease{color:#00a0dc;}
	.cart-count{padding:0 12px;color:#93999f;font-size:12px;line-height:18px;}
	.icon-add{background-color:#00a0dc;color:#fff;}
	.move-enter-activce,.move-leave-active{
		transform:translate3d(0,0,0);
	}
	.move-enter-activce .inner,.move-leave-active .inner{
		transform: rotate(0deg);
	}
	.move-enter,.move-leave-active{
		opacity:0;
		transform: translate3d(10px,0,0);
	}
	.move-enter .inner,.move-leave-active .inner{
		transform:rotate(180deg);
	}
	.cart-decrease{opacity:1;transition:all .4s linear;}
	.cart-decrease .inner{transition:all .4s linear;}
</style>