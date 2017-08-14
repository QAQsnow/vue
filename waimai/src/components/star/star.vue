<template>
	<div :class="['star',starType]">
		<span v-for="item in itemClasses"  :class="['item-star',item]"></span>
	</div>
</template>

<style type="text/css">
	.star{text-align:center;} 
	.star span{display:inline-block;background-repeat:no-repeat;background-position:0 0;margin:0 .05rem;}
	.star span:first-child{margin-left:0;}
	.star-lg .item-star{width:.30rem;height:.30rem;}
	.star-lg .item-star.on{background-image:url(../../assets/images/star24_on@3x.png);background-size:.25rem;}
	.star-lg .item-star.off{background-image:url(../../assets/images/star24_off@3x.png);background-size:.25rem;}
	.star-lg .item-star.half{background-image:url(../../assets/images/star24_half@3x.png);background-size:.25rem;}
	.star-sm .item-star{width:.25rem;height:.25rem;}
	.star-sm .item-star.on{background-image:url(../../assets/images/star24_on@3x.png);background-size:.25rem;}
	.star-sm .item-star.off{background-image:url(../../assets/images/star24_off@3x.png);background-size:.25rem;}
	.star-sm .item-star.half{background-image:url(../../assets/images/star24_half@3x.png);background-size:.25rem;}
	.star-xs .item-star{width:.20rem;height:.20rem;}
	.star-xs .item-star.on{background-image:url(../../assets/images/star24_on@3x.png);background-size:.20rem;}
	.star-xs .item-star.off{background-image:url(../../assets/images/star24_off@3x.png);background-size:.20rem;}
	.star-xs .item-star.half{background-image:url(../../assets/images/star24_half@3x.png);background-size:.20rem;}
</style>

<script type="text/javascript">
	const LENGTH=5
	const CLS_ON="on"
	const CLS_HALF="half"
	const CLS_OFF="off"
	export default({
		props:{
			size:{
				type:String
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType(){
				return 'star-'+this.size;
			},
			itemClasses(){
				let result=[];
				let score = Math.floor(this.score*2)/2;
				let half = score%1 !== 0;
				let inter = Math.floor(score);
				var offNum;
				for(var i=0;i<inter;i++){
					result.push(CLS_ON);
				}
				if(half){
					result.push(CLS_HALF);
					offNum = LENGTH-inter-1
				}else{
					offNum = LENGTH-inter;
				}
				for(var j=0;j<offNum;j++){
					result.push(CLS_OFF);
				}
				//console.log(result,inter,this.score,LENGTH);
				return result;
			}
		}
	})
</script>