<template>
	<!-- content的背景URL要根据所点击的账本动态设置 -->
	<view class="content" v-bind:style="{backgroundImage: 'url(' + bgi + ')'}">
		<view class="header">
			<view class="calendar" @click="calendar">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/d178eaaa-7ceb-43f2-8951-bda5b0d42fb3.svg"></image>
			</view>
			<view class="totalSpend">
				<view>
					<text>收支状况(元)</text>
				</view>
				<view class="number">
					<text>{{ outplay > income ? '-' + (outplay - income) : '+' + (income - outplay) }}</text>
				</view>
			</view>
			<view class="spendDetail" @click="accountDetail">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/489081da-849f-411a-8808-a5eaf660deb1.svg"></image>
			</view>
		</view>
		<view class="spendList">
			<view class="spendIncome">
				<view class="today">
					<text>{{ createTime }}</text>
				</view>
				<view class="io">
					<view class="out">
						<view>
							<text>支出(元)</text>
						</view>
						<view>
							<text class="red">{{ '-' + outplay }}</text>
						</view>
					</view>
					<view class="in">
						<view>
							<text>收入(元)</text>
						</view>
						<view>
							<text class="green">{{ '+' + income }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="listItem" v-for="(item, index) in list">
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
			<view class="addButton" @click="outIn">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/9caae42f-1eb2-4d90-8a80-56185257bbc5.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import spendList from '@/common/js/spendList.js';
	export default {
		data() {
			return {
				bgi: '',
				accountId: '',
				createTime: '',
				list:[],
				outplay: 0,
				income: 0
			}
		},
		onLoad: function(option){
			spendList.reShow(this);
			spendList.onLoad(option.accountName, option.accountId, option.coverUrl, option.createTime, this);
			spendList.initList(this, option.accountId);
		},
		methods: {
			calendar(){
				spendList.calendar();
			},
			accountDetail(){
				spendList.accountDetail(this.createTime, this.outplay, this.income, this.accountId);
			},
			outIn(){
				spendList.outIn(this);
			}
		}
	}
</script>

<style>
	@import "@/common/css/spendList.css";
</style>
