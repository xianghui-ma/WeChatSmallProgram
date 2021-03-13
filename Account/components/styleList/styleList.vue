<template>
	<view class="styleList">
		<view class="listItem" v-for="(item, index) in typeList" @click="selected(item, index)">
			<view class="img">
				<image class="image" v-bind:src="item.iconUrl"></image>
			</view>
			<view class="tip">
				<text v-bind:class="current === index ? 'slect' : ''">{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				// current: -1
			}
		},
		props: {
			typeList: {
				type: Array
			},
			current: {
				type: Number
			}
		},
		methods: {
			selected(item, index){
				/*该组件会触发一个selectIcon事件并将被点击的对象item传出来，你只需要在引入该组件的页面用uni.$on('selectIcon',callback)监听即可*/
				uni.$emit("selectIcon", {
					item: item,
					index: index
				});
				// this.current = index;
			}
		}
	}
</script>

<style>
	.styleList{
		display: flex;
		margin: 30rpx 20rpx 0rpx 20rpx;
		border-left: 6rpx solid #F0AD4E;
		border-right: 6rpx solid #F0AD4E;
		border-bottom: 6rpx solid #F0AD4E;
		border-bottom-right-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
		justify-content: space-around;
	}
	.styleList .listItem{
		font-size: 24rpx;
		line-height: 64rpx;
		text-align: center;
		padding-top: 10rpx;
		/* border-top: 6rpx solid #F0AD4E; */
	}
	.styleList .listItem .img,
	.styleList .listItem .img .image{
		width: 60rpx;
		height: 60rpx;
	}
	.styleList .listItem .img{
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.styleList .listItem .tip .slect{
		color: #F0AD4E;
	}
</style>
