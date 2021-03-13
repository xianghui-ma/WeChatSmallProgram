<template>
	<view class="content">
		<uni-calendar 
		    :insert="true"
		    :lunar="true"
			:showMonth="false"
		/>
	</view>
</template>

<script>
	import calendar from "@/components/uni-calendar/uni-calendar";
	export default {
	    components: {
	        calendar
	    },
	    data() {
	        return {
				
	        };
	    },
		onLoad: function(){
			uni.setNavigationBarTitle({
				title: "日期"
			})
		},
	    methods: {
			
	    }
	};
</script>

<style>
	.content{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
</style>
