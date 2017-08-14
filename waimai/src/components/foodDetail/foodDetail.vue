<template>
	<transition name="move">
		<div class="detail-wrapper" ref="detailWrapper" v-show="showDetail">
			<div class="foodDetail">
				<div class="back" @click="showToggle()">
					<i class="icon-ltarrow"><=</i>
				</div>
				<img :src="food.image" height="425" width=100% alt="">
				<div class="info">
					<div class="title" >
						 {{food.name}}
					</div>
					<div class="desc">
						<span>月售{{food.sellCount}}</span>
						<span>好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="unit"><span>&yen;</span>{{food.price}}</span>
						<span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="shopcart">
						<transition name="">
							<div class="text" @click="addCart($event)" v-show="!food.count">
								加入购物车
							</div>

						</transition>
            <cartcontrol :food="food" v-show="food.count"></cartcontrol>
					</div>
          </div>
					<div class="divider"></div>
					<div class="desc">
						<div class="title">商品介绍</div>
						<div class="content">{{food.info}}</div>
					</div>
					<div class="divider"></div>
					<div class="evaluation">
						<div class="title">
							商品评价
						</div>
						<div class="classify">
							<span v-for="(item,index) in classfyArr" class="item" :class="{'active':item.active,'bad':index==2,'badActive':item.active&&index==2}" @click="filterEvel(item)">
							{{item.name}}<span class="count">{{item.count}}</span>
							</span>
						</div>
						<div class="switch" @click="evelflag=!evelflag">
							<span class="icon-check_circle" :class="{'on':evelflag}">√</span>
							<span class="text">只看有内容的评价</span>
						</div>
						<div class="evel-list">
							<ul>
								 <li class="evel" v-for="evel in evelArr">
								 	<div class="userInfo">
								 		<div class="time">{{evel.rateTime|time}}</div>
										<div class="user">
											<span>{{evel.username}}</span>
											<span class="avatar"><img :src="evel.avatar" width="12" height="12"></span>
										</div>
								 	</div>
								 	<div class="content">
								 		 <span class="icon" :class="evel.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                  	 <span class="text">{{evel.text}}</span>
								 	</div>
								 </li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import BScroll  from 'better-scroll'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import '../../filter/time.js'
	export default({
		props:{
			food:{
				type:Object
			}
		},
    components:{
      'cartcontrol':cartcontrol
    },
		data(){
			return{
				showDetail:false,
				classfyArr:[
					{
						name:"全部",
						count:this.food.ratings.length,
						active:true
					},
					{
						name:"推荐",
						count:this.food.ratings.filter(data=>{return data.rateType===0}).length,
						acitve:false
					},
					{
						name:"吐槽",
						count:this.food.ratings.filter(data=>{return data.rateType}).length,
						active:false
					}
				],
				evelflag:true
			}
		},
    /*filters:{
        formatDate(date,formatString){
          formatString=formatString||'YYYY-MM-DD HH:mm';
          return moment(date).format(formatString);
        }
    },*/
		computed:{
			evelArr(){//实时计算根据用户的选择(全部、推荐、吐槽)，筛选出对应的评论内容
        //设置当前用户选择的类型的下标，给一个初始值0
				let selectIndex=0;
        //遍历classfyArr数组，找出当前用户的选择
				this.classfyArr.forEach((data,index)=>{
          //判断用户的选择active
					if(data.active){
            //把用户选择的(全部、推荐、吐槽)的下标赋值给selectIndex
						selectIndex=index;
					}
				});
        //判断是否存在this.detailWrapper元素
				if(this.detailWrapper){
          //在元素的操作之后做处理
					this.$nextTick(()=>{
            //对详情页的滚动进行刷新
						this.detailWrapper.refresh();
					})
				}

        //返回根据用户选择的当前下标，用户选择是否只选择显示评论进行筛选的评论内容
				return selectIndex ? this.food.ratings.filter((data) => {return this.evelflag ? data.rateType == selectIndex - 1 && data.text : data.rateType == selectIndex - 1}) : this.food.ratings.filter((data) => {return this.evelflag ? data.text : true});
			}
		},
		methods:{
			showToggle(){
				this.showDetail=!this.showDetail;
				if(this.showDetail){
					this.$nextTick(()=>{
						this._initScroll();
					})
				}
			},
      _initScroll(){
        if(!this.detailWrapper){
          this.detailWrapper=new BScroll(this.$refs.detailWrapper,{
            click:true
          })
        }else{
          this.detailWrapper.refresh();
        }
      },
      addCart(event){
        if(!event._constructed){
          return;
        }
        this.$set(this.food,'count',1);
        this.$root.eventHub.$emit('add',event.target);
      },
      filterEvel(item){
        this.classfyArr.forEach(data=>{
            data.active=false;
        });
        item.active=true;
        console.log(item);
      }
		}

	});
</script>

<style >
.detail-wrapper{
  position:fixed;
  left: 0;
  top: 0;
  z-index: 100;
  bottom:48px;
  width: 100%;
  height:100%;
  background: white;
  transition: all 0.4s ease;}
  .move-enter-avtive,.move-leave-active{
    transform:translate3d(0,0,0);

  }
  .move-enter,.move-leave-active{
    transform:translate3d(100%,0,0);
  }
 .divider{
  height:16px;
  border-top:1px solid rgba(7,17,27,.1);
  border-bottom:1px solid rgba(7,17,27,.1);
  background-color:#f3f5f7;
 } 
.foodDetail  .back{
    position:absolute;
    color:#ddd;
    top:12px;
    left: 6px;
    font-size: 20px;
    padding: 10px;}
 
.foodDetail  .info{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding:0 18px;
    margin:18px 0;
  }
  .info .title{  
      font-size: 14px;
      font-weight: 700;
      color: rgb(7,17,27);
      line-height: 14px;}
  .info  .desc{
      display: flex;
      padding: 0;
      padding-top: 8px;
      font-size: 10px;
      color: rgb(147,153,159);
      line-height: 10px;}
    .desc span:last-child{
        padding-left: 12px;
    }
  .info  .price{
      display: flex;
      font-size:14px;
      font-weight: 700;
      color: rgb(240,20,20);
      line-height: 24px;}
    .price  .unit{
        font-size: 14px;
        font-weight: normal;}
    .price  .unit span{
      font-size:12px;
    }
    .price  .oldPrice{
        padding-left: 12px;
        font-size: 10px;
        font-weight: normal;
        color: rgb(147,153,159);
        line-height: 24px;}
  .info  .shopcart{
      position: absolute;
      right: 18px;
      bottom: -5px;
      width:84px;
      height: 24px;
      text-align: center;
      z-index: 2;}
   .info   .text{
        position:absolute;
        right:0;
        box-sizing:border-box;
        height: 100%;
        line-height: 24px;
        color: white;
        font-size: 10px;
        padding: 0 12px;
        border-radius: 12px;
        background: rgb(0,160,220);}
        .fade-enter-active,.fade-leave-active{
          transition: opacity .2s;
        }
        .fade-enter,.fade-leave-active{
          opacity: 0;
        }
    .cartcontrol{
      position: absolute;
      right:12px;
      bottom: 12px;}
    .shopcart .cartcontrol{
      bottom:0;
    }
  .desc{
    padding:18px;}
  .desc .title{
      font-size: 14px;
      font-weight: 500;
      color: #07111b;
      margin-bottom: 6px;}

   .desc .content{
      font-size: 12px;
      font-weight: 200;
      color: rgb(77,85,93);
      line-height: 24px;
      padding: 0 8px;}

  .evaluation{
    padding: 18px 0;
    position: relative;}
  .evaluation  .title{
      padding-left: 18px;
      font-size: 14px;
      font-weight: 500;
      color: #07111b;}
  .evaluation  .classify{
      padding: 18px 0;
      margin: 0 18px;
      border-bottom: 1px solid rgba(7,17,27,0.1);}
    .classify  .item{
        display: inline-block;
        font-size: 12px;
        padding:8px 12px;
        line-height: 16px;
        background: rgba(0,160,220,0.2);
        color: rgb(77,85,95);
        margin-right: 8px;}
    .item    .count{
          font-size: 8px;
          padding-left: 2px;}


    .item.active{
          color: white;
          background: rgb(0,169,220);}

    .item.bad{
          background: rgba(77,85,93,0.2); }


     .item.badActive{
          background: #4d555d;  }


    .switch{
      font-size: 12px;
      width: 100%;
      padding: 12px 0 12px 18px;
      color: rgb(147,153,159);
      border-bottom: 1px solid rgba(7,17,27,0.1);}


      .icon-check_circle{
        display:inline-block;
        font-size: 12px;
        vertical-align: middle;
        width:18px;
        height:18px;
        color:#fff;
        text-align:center;
        line-height:18px;
        background-color:#93999f;
        border-radius:50%;
      }


        .icon-check_circle.on{
          background-color: #00c850;}


    .evel-list{
      margin: 0 18px;}


      .evel{
        padding: 16px 0;
        border-bottom: 1px solid rgba(7,17,27,0.1);}


        .userInfo{
          display: flex;
          color: rgb(147,153,159);
          font-size: 10px;
          line-height: 12px;}


          .time{
            flex: 1;}

          .user{
            flex: 1;
            text-align: right;}


            .avatar img{
                padding-left: 6px;
                border-radius:50%;}


          .icon{
            font-size: 12px;
            line-height: 24px;}


            .icon-thumb_up{
              color: rgb(0,160,220);
            }


            .icon-thumb_down{
              color: rgb(147,153,159);
            }
          .text{
            font-size: 12px;
            color: rgb(7,17,27);
            line-height: 16px;
            padding-left: 4px;}
</style>