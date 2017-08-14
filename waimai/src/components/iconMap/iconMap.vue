<template>
	<i class="icon-logo" :class="'icon-'+iconClassMap[item]"></i>
</template>

<script type="text/javascript">
	export default({
		props:{
			item:{
				type:Number
			}
		},
		created(){
			this.iconClassMap=["decrease","discount","special","invoice","guarantee"];
		}
	});
</script>

<style type="text/css">
	.icon-logo{display:inline-block;width:.24rem;height:.24rem;margin:0 .12rem 0 0;background:url(../../assets/images/decrease_1@2x.png) no-repeat 0 0;background-size:.24rem;position:relative;top:.03rem;}
	.icon-decreace{}
	.icon-discount{background:url(../../assets/images/discount_1@2x.png) no-repeat 0 0;background-size:.24rem;}
	.icon-special{background:url(../../assets/images/special_1@2x.png) no-repeat 0 0;background-size:.24rem;}
	.icon-invoice{background:url(../../assets/images/invoice_1@2x.png) no-repeat 0 0;background-size:.24rem;}
	.icon-guarantee{background:url(../../assets/images/guarantee_1@2x.png) no-repeat 0 0;background-size:.24rem;}
</style>