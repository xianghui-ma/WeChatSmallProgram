<template>
	<view class="content">
		<button type="warn" class="start" @click="startAccount">开始记账</button>
	</view>
</template>

<script>
	import index from '@/common/js/index.js';
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {
			startAccount(event){
				index.startAccount(this, event);
			}
		}
	}
</script>

<style>
	@import "@/common/css/index.css";
</style>
