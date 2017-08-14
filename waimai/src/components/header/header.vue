<template>
	<header class='header'>
		<div class="top-header clearfix">
			<div class='logo-header f-l'>
				<img src="../../assets/images/logo.jpg" width="100%">
			</div>
			<div class="intro-header f-l">
				<div class="name-header">
					{{seller.name}}
				</div>
				<div class="delinfo-header">
					{{seller.description+" / "+seller.deliveryTime+"分钟到达"}}
				</div>
				<div class="discount-header" v-if="seller.supports">
					{{seller.supports[0].description}}
				</div>
			</div>
			<div class="del-header" v-if="seller.supports" @click="showDetail()">{{seller.supports.length}}个<i class="icon-ltarrow">></i></div>
		</div>
		<div class="tips-header" @click="showDetail();">
			{{seller.bulletin}}
			<i class="icon-ltarrow">></i>
		</div>
		<div class="bg-header">
			<img src="../../assets/images/logo.jpg" width="100%" height="100%">
		</div>
		<transition name="slide">
			<div class="detail" v-if="detailShow">
				<h1 class="name-detail">{{seller.name}}</h1>
				<star :size="seller.size" :score="seller.score"></star>
				<div class="tit-detail">
					<span>优惠信息</span>
					<i class="icon-line lt"></i>
					<i class="icon-line rt"></i>
				</div>
				<ul class="infolist-detail" v-if="seller.supports">
					<li v-for="item in seller.supports">
						<icon :item="item.type"></icon>
						{{item.description}}
					</li>
				</ul>
				<div class="tit-detail">
					<span>商家公告</span>
					<i class="icon-line lt"></i>
					<i class="icon-line rt"></i>
				</div>
				<div class="tips-detail" >		
					{{seller.bulletin}}
				</div>
				<div class="close-detail" @click="hideDetail()">
					x
				</div>
			</div>
		</transition>
	</header>
</template>

<style>
	.header{position:relative;color:#fff;background-color:rgba(7,17,27,.5);}
	.header .top-header{position:relative;padding:.48rem 0 0 .48rem;}
	.top-header .logo-header{width:1.28rem;height:1.28rem;border-radius:4px;overflow:hidden;}
	.top-header .intro-header{margin-left:.32rem;}
	.intro-header .name-header{height:.36rem;line-height:.36rem;font-size:.32rem;padding:0 0 0 .72rem;background:url(../../assets/images/brand@2x.png) no-repeat 0 0;background-size:.6rem .36rem;font-weight:700;}
	.intro-header .delinfo-header{font-size:.24rem;line-height:.24rem;padding:.16rem 0 0 0;}
	.intro-header .discount-header{height:.24rem;padding:0 0 0 .32rem;font-size:.2rem;line-height:.24rem;margin-top:.2rem;background:url(../../assets/images/decrease_1@2x.png) no-repeat;background-size:.24rem;}
	.top-header .del-header{position:absolute;bottom:-.07rem;right:0.24rem;height:.48rem;line-height:.48rem;padding:0 .16rem;background-color:rgba(0,0,0,0.2);font-size:.2rem;border-radius:.28rem;cursor:default;}
	.del-header i.icon-ltarrow{margin-left:.1rem;}
	.header .tips-header{position:relative;height:.56rem;padding:0 .4rem 0 .76rem;line-height:.56rem;background:rgba(7,17,27,.2) url(../../assets/images/bulletin@2x.png) no-repeat .24rem center;background-size:.44rem .24rem;margin-top:.36rem;font-size:.2rem;overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis;}
	.tips-header i.icon-ltarrow{position:absolute;right:.24rem;top:0;font-size:.18rem;}
	.header .bg-header{position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;filter:blur(11px);}
	.detail{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(7,17,27,.8);z-index:101;}
	.detail .star{margin-top:.25rem;}
	.detail .name-detail{padding:1.28rem 0 0 0;text-align:center;font-size:.32rem;font-weight:700;line-height:.32rem;}
	.detail	.tit-detail{position:relative;line-height:.28rem;font-size:.28rem;font-weight:700;text-align:center;margin-top:.56rem;}
	.tit-detail span{display:inline-block;padding:0 .2rem;position:relative;z-index:1}
	.tit-detail .icon-line{position:absolute;top:.13rem;width:2.24rem;border:.01rem solid rgba(255,255,255,.2);z-index:-1;}
	.tit-detail i.lt{left:.72rem;}
	.tit-detail i.rt{right:.72rem;}
	.detail .infolist-detail{padding:0 .96rem;margin-top:.48rem;}
	.infolist-detail li{margin-top:.12rem;}
	.detail .tips-detail{margin-top:.48rem;padding:0 .96rem;font-size:.24rem;line-height:.48rem;}
	.detail .close-detail{display:block;position:absolute;bottom:.64rem;font-size:.5rem;text-align:center;width:100%;}
	 .fade-enter-active, .fade-leave-active {
        transition: opacity .4s
    }
    .fade-enter,.fade-leave-active {
        opacity: 0}
    .slide-enter-active, .slide-leave-active {
        transition: opacity .4s
    }
    .slide-enter,.slide-leave-active {
        opacity: 0}
</style>


<script type="text/javascript">
	import star from '@/components/star/star'
	import Icon from '@/components/iconMap/iconMap'
	export default({
		data(){
			return {
				detailShow:false

			}
		},
		components:{
			'star':star,
			'icon':Icon
		},
		props:{
			seller:{
				type:Object
			}
		},	
		created(){
			this.iconClassMap = ['decreace','discount','special','invoice','guarantee'];
			},
		methods:{
			hideDetail(){
				this.detailShow=false;
			},
			showDetail(){
				this.detailShow=true;
			}		
		}
	})
</script>