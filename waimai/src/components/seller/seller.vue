<template>
	<div class="seller-wrapper" ref="sellerWrapper">
		<div class="seller-content">
			<div class="info">
				<div class="title">
					<div class="text">
						{{seller.name}}
					</div>
					<div class="star-wrapper">
						<star :size="sm" :score="seller.score"></star>
						<span class="rate-count">{{seller.ratingCount}}</span>
						<span class="sell-count">月售{{seller.sellCount}}单</span>
					</div>
					<div class="collect" @click="isCollect=!isCollect">
						<i class="icon-collect" :class="{'on':isCollect}"></i>
						<span>{{isCollect?'已收藏':'收藏'}}</span>
					</div>
				</div>
				<div class="remark">
					<div class="remark-info">
						<h2>起送价</h2>
						<div class="content">
							<span class="num">{{seller.minPrice}}</span>元
						</div>
						
					</div>
					<div class="remark-info">
						<h2>商家配送</h2>
						<div class="content">
							<span class="num">{{seller.deliveryPrice}}</span>元
						</div>
						
					</div>
					<div class="remark-info">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="num">{{seller.deliveryTime}}</span>元
						</div>
						
					</div>
				</div>
			</div>
			
			<div class="divider"></div>
			<div class="activites">
				<h1>公告与活动</h1>
				<div class="content">
					{{seller.bulletin}}
				</div>
			</div>
			<div class="supports">
				<ul>
					<li v-for="item in seller.supports">
						<iconMap :item="item.type"></iconMap>
						<span class="description">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<div class="divider"></div>
			<div class="seller-imgs">
				<h1>商家实景</h1>
				<div class="img-wrapper" ref="picsWrapper">
					<div ref="picList">
						<img v-for="src in seller.pics" :src="src" width="120" height="90">
					</div>
				</div>
			</div>
			<div class="divider"></div>
			<div class="seller-info">
				<h1>商家信息</h1>
				<ul class="info-list">
					<li v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import star from '@/components/star/star'
	import iconMap from '@/components/iconMap/iconMap'
	import axios from 'axios'
	import BScroll from 'better-scroll'
	export default({
		data(){
			return {
				seller:{},
				sm:'sm',
				isCollect:false
			}
		},
		components:{
			'star':star,
			'iconMap':iconMap
		},
		created(){
			//请求后台数据
			axios.get('/static/data.json').then(res=>{
				//取出数据
				this.seller=res.data.seller;
				console.log(this.seller);
				this.$nextTick(()=>{
					this.scroll = new BScroll(this.$refs.sellerWrapper,{
						click:true
					})
				})
				this._initPicScroll();
			},(err)=>{
				console.log(err);
			})
		},
		methods:{
			_initPicScroll(){//初始化图片的如果超长x方向的滚动
				//判断是否存在滚动对象，如果存在返回
				if(this.picScroll){
					return
				}
				//定义图片长度、外边距的值
				const PIC_WIDTH = 120;
				const MARGIN = 6;
				//求出图片的数量
				let length =this.seller.pics.length;
				//计算出总长度，赋值给图片父元素的宽度
				this.$refs.picList.style.width=(PIC_WIDTH+MARGIN)*length+"px";
				//初始化滚动事件
				this.picScroll = new BScroll(this.$refs.picsWrapper,{
					scrollX:true
				})
			}
		}

	});
</script>

<style lang="stylus" scoped>
	.seller-wrapper
		position absolute
		top 3.49rem
		bottom 0
		left 0
		width 100%
		overflow hidden
		.info 
			padding 18px 0
			margin 0 18px
			.title
				padding-bottom 18px
				border-bottom 1px solid rgba(7,17,27,.1)
				position relative
				.text
					font-size 14px
					line-height 16px
					color #07111b
				.star-wrapper
					display flex
					line-height 20px
					padding-top 5px;
					span
						font-size 12px
						color #4d555d
					.rate-count
						padding 0 12px 0 8px	
				.collect
					position absolute
					bottom 18px
					right 0	
					text-align center
					.icon-collect
						display inline-block
						width 21px
						height 21px
						background url(../../assets/images/collect.png) no-repeat 0 0
					.icon-collect.on
						background url(../../assets/images/collect1.png) no-repeat 0 0
					span
						display block
						line-height 18px	
			.remark
				display flex
				.remark-info
					flex 1
					border-left 1px solid rgba(7,17,27,.1)
					margin-top 18px
					text-align center
					&:first-child
						border-left 0 none
					h2
						font-size 12px
						line-height 14px
						margin-bottom 4px
						color #93999f
					.content
						font-size 12px
						line-height 24px
						color #07111b
						.num
							font-size 24px
		.divider
			height 16px
			border-top 1px solid rgba(7,17,27,.1)
			border-bottom 1px solid rgba(7,17,27,.1)
			background-color #f3f5f7
		.activites
			padding-top 18px
			margin 0 18px
			border-bottom 1px solid rgba(7,17,27,.1)
			h1
				font-size 14px
				line-height 16px
				color #07111b
			.content
				font-size 12px
				line-height 24px
				color #f01414
				padding 8px 12px 16px
		.supports
			margin 0 18px
			li
				padding 16px
				border-bottom 1px solid rgba(7,17,27,.1)
				&:last-child
					border 0 none
				span.description
					font-size 12px
					color #07111b
					line-height 14px
		.seller-imgs
			margin 18px
			white-space nowrap
			overflow hidden
			h1
				font-size 14px
				line-height 16px
				margin-bottom 12px
			.img-wrapper
				img
					margin-right 6px		
		.seller-info
			h1
				margin 0 18px
				padding 18px 0 12px
				font-size 18px
				border-bottom 1px solid rgba(7,17,27,.1)
			.info-list
				margin 0 18px
				li
					font-size 12px
					line-height 16px
					padding 16px 12px
					color #07111b
					border-bottom 1px solid rgba(7,17,27,.1)
					&:last-child
						border 0 none
</style>