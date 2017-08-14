<template>
	<div class="rating-wrapper" ref="ratingWrapper">
		<div class="rating-content">
			<div class="rating-info">
				<div class="rating-mark">
					<div class="num">
						{{seller.score}}
					</div>
					<div class="text">
						综合评分
					</div>
					<div class="contrast">
						高于周边商家{{seller.rankRate}}%
					</div>
				</div>
				<div class="stars">
					<div class="serviceScore">
						<span class="text">服务态度</span>
						<star :size="lg" :score="seller.serviceScore"></star>
						<span class="num">{{seller.serviceScore}}</span>
					</div>
					<div class="foodScore">
						<span class="text">商品评分</span>
						<star :size="lg" :score="seller.foodScore"></star>
						<span class="num">{{seller.foodScore}}</span>
					</div>
					<div class="deliveryTime">
						<span class="text">送达时间</span>
						<span class="time">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<div class="divider"></div>
			<div class="evaluation">
				<div class="classify">
					 <span class="item" v-for="(item,index) in classify" :class="{'active':item.active,'bad':index==2,'badActive':item.active&&index==2}" @click="evelFilter(item)">{{item.name}}{{item.count}}</span>
				</div>
				<div class="switch" @click="test">
					<span class="icon-right" :class="{'on':evelflag}">√</span>
					<span class="text">只看有评论的内容</span>
				</div>
				<ul class="eval-list">
					<li v-for="item in evelArr">
						<div class="avatar">
							<img :src="item.avatar" width="28" height="28">
						</div>
						<div class="content">
							<div class="user clearfix">
								<span class="f-l">{{item.username}}</span>
								<span class="rateTime f-r">{{item.rateTime|time}}</span>
							</div>	
							<div class="star-wrapper">
								<star :size="xs" :score="item.score"></star>
								<span class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
							</div>
							<div class="text">
               					 {{item.text}}
							</div>
							<div class="recommend">
								<span class='like' v-show="item.recommend.length"></span>
								<span class="dish" v-for="name in item.recommend">{{name}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>	
		</div>
	</div>
</template>

<script type="text/javascript">
	import '../../filter/time.js'
	import star from '@/components/star/star'
	import axios from 'axios'
	import BScroll from 'better-scroll'
	import moment from 'moment'
	export default({
		data(){
			return {
				lg:'lg',
				xs:"xs",
				seller:{},
				ratings:[],
				classify:[
					{
						name:"全部",
						count:0,
						active:true
					},
					{
						name:"推荐",
						count:1,
						active:false
					},
					{
						name:"吐槽",
						count:2,
						active:false
					}
				],
				evelflag:true
			}
		},
		components:{
			'star':star
		},
		
		created(){
			this._init();
		},
		/*filters:{
			formatDate(value,formatString){
				formatString=formatString||'YYYY-MM-DD HH:mm';
				return moment(value).format(formatString);
			}
		},*/
		computed:{
			evelArr(){//实时记录用户选择查看的类型(全部、推荐、吐槽)
				var selectIndex=0;
				//遍历classify,找出当前用户选择查看的类型
				this.classify.forEach((data,index)=>{
					if(data.active){
						selectIndex=index;
					}
				});
				console.log(35434);
				//实时刷新页面滚动
				if(this.scroll){
					this.$nextTick(()=>{
						this.scroll.refresh();
					});	
				}
				//根据用户选择查看的类型，返回对应的筛选数据
				return selectIndex?this.ratings.filter(data=>{
					return this.evelflag?data.text&&selectIndex-1===data.rateType:selectIndex-1===data.rateType;
				}):this.ratings.filter(data=>{
					return this.evelflag?data.text:true;
				});
			}
		},
		methods:{
			_init(){
				//加载后台数据
				axios.get('../static/data.json').then(res=>{
					this.ratings=res.data.ratings;
					this.seller=res.data.seller;
					this._initClassifyArr();
					//初始化评论滚动
					this.$nextTick(()=>{
						this.scroll=new BScroll(this.$refs.ratingWrapper,{
							click:true
						})
					});
				})
			},
			_initClassifyArr(){//初始化全部、推荐、吐槽的记录条数
				//遍历classify
				this.classify.forEach((data,index)=>{
					if(index){//根据下标计算出对应的记录条数
						data.count=this.ratings.filter(data=>{
							return data.rateType===index-1;
						}).length;
					}else{
						data.count=this.ratings.length;
					}
				})
			},
			evelFilter(item){
				//遍历classify,把active全部设置为false
				this.classify.forEach(data=>{
					data.active=false;
				})
				item.active=true;
				console.log(item);
			},
			test(){
				this.evelflag=!this.evelflag;
				console.log(this.ratings,this.evelflag);
			}
		}
	});
</script>

<style type="text/css">
	.rating-wrapper{position:absolute;top:3.49rem;left:0;bottom:0;width:100%;overflow:hidden;}
	.rating-info{display:flex;}
	.rating-info .rating-mark{flex:0 0 139px;text-align:center;margin:18px 0;border-right:1px solid rgba(7,17,27,.1);}
	.rating-mark .num{font-size:24px;color:#f90;line-height:28px;}
	.rating-mark .text{font-size:12px;color:#07111b;padding:6px 0 8px;}
	.rating-mark .contrast{font-size: 12px;color:#07111b;line-height:14px;}
	.rating-info .stars{padding:18px 24px;font-size:12px;}
	.stars>div{display:flex;line-height:18px;margin-bottom:4px;}
	.stars .star{margin:0 7px;}
	.deliveryTime .time{margin-left:7px;color:#93999f;}
	.rating-content .divider{height:16px;border-top:1px solid rgba(7,17,27,.1);border-bottom:1px solid rgba(7,17,27,.1);background-color:#f3f5f7 ;}
	.evaluation{padding:18px 0;}
	.evaluation .classify{margin:0 18px;padding-bottom:18px;border-bottom:1px solid rgba(7,17,27,.1);}
	.classify .item{display:inline-block;font-size:12px;padding:8px 12px;line-height:16px;color:#4d555f;margin-right:8px;background-color:rgba(0,160,220,.2);}
	.classify .active{color:#fff;background-color:rgb(0,169,220);}
	.classify .bad{background:rgba(77,85,93,0.2);}
	.classify .badActive{background:#4d555d;}
	.switch{padding:12px 0 12px 18px;border-bottom:1px solid rgba(7,17,27,.1);}
	.switch span.icon-right{display:inline-block;width:25px;height:24px;border-radius:50%;text-align:center;line-height:24px;font-size:14px;color:#fff;background-color:#93999f;}
	.switch span.icon-right.on{background-color:#00c850;}
	.switch .text{font-size:12px;color:#93999f;}
	.eval-list li{display:flex;padding:18px 0;margin:0 18px;border-bottom:1px solid rgba(7,17,27,.1);}
	.eval-list .avatar{flex:0 0 28px;margin-right:18px;}
	.avatar img{border-radius:50%;}
	.eval-list .user{font-size:12px;line-height:14px;}
	.eval-list .content{flex:1;}
	.user .rateTime{color:#93999f;}
	.star-wrapper{display:flex;padding:4px 0 6px;}
	.star-wrapper .deliveryTime{font-size:12px;margin-left:10px;color:#93999f;}
	.eval-list .text{font-size:12px;color:#07111b;line-height:18px;}
	.recommend{margin-top:5px;font-size:0;letter-spacing:0;}
	.recommend .like{display:inline-block;width:16px;height:16px;background:url(../../assets/images/dianzan.png) no-repeat 0 0;vertical-align:top;margin-right:5px;}
	.recommend .dish{font-size:12px;line-height:16px;color:#93999f;padding:2px 6px;margin:4px 8px 5px 0;border:1px solid rgba(7,17,27,.1);}
</style>