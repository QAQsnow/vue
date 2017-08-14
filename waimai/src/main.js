// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BScroll from 'better-scroll'
import axios from 'axios'
import './assets/css/index.css'

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  data:{
  	eventHub:new Vue()
  },
  router,
  template: '<App/>',
  components: { App },
  beforeCreate:function(){
		//if(window.navigator.userAgent.indexOf("Android")>=0||window.navigator.userAgent.indexOf("iPhone")){
		!function(win){
			var dc = win.document,
				dce = dc.documentElement,
				d = 750,
				bm = 750/100,
				o = "orientationchange" in win ? "orientationchange" : "resize",
				calc = function(){
					var sw=dce.clientWidth||320;if(sw>750)sw=750;
					dce.style.fontSize=sw/bm+"px";
					console.log(dce.clientWidth);
				};
				dc.addEventListener&&(win.addEventListener(o,calc,!0),dc.addEventListener("DOMContentLoaded",calc,!0));
			}(window)
		//}
		
  }
})