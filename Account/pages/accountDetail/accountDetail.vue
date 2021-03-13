<template>
	<view class="content">
		<view class="tip">
			<view class="time">
				<text>{{ createTime }}</text>
			</view>
			<view class="total">
				<text class="out">支出{{ outplay }}元</text>
				<text class="in">收入{{ income }}元</text>
			</view>
		</view>
		<view class="detailList">
			<view class="listItem" v-for="(item, index) in list" @click="showTip(item)">
				<view class="typeIcon">
					<!-- image的url动态设置 -->
					<image v-bind:src="item.iconUrl"></image>
				</view>
				<view class="wrapper">
					<view class="name">
						<text>{{ item.text }}</text>
					</view>
					<view class="money">
						<text>{{ item.money }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import accountDetail from '@/common/js/accountDetail.js';
	export default {
		data() {
			return {
				outplay: 0,
				income: 0,
				createTime: '',
				list: [],
				accountId: ''
			}
		},
		onLoad: function(option){
			accountDetail.onLoad(option.outplay, option.income, option.createTime, option.accountId, this);
			accountDetail.initPage(this);
		},
		methods: {
			showTip(item){
				accountDetail.showTip(item);
			}
		}
	}
</script>

<style>
	@import "@/common/css/accountDetail.css";
</style>
