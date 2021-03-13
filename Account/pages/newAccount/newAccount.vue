<template>
	<view class="content">
		<view class="switchStyle" @click="switchStyle"></view><!--显示风格切换按钮，控制listStyle为true/false-->
		<template v-if="listStyle"><!--listStyle为true时显示-->
			<image class="switchStyleButton" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/f5e07af3-5d8d-41ad-99b5-17007bdfd9d9.svg"></image>
			<swiper :indicator-dots="false" :autoplay="false" :previous-margin="20" :next-margin="20" :current="now" @change="setNow">
				<template>
					<swiper-item v-for="(item, index) in allAccount">
						<view class="desc" v-bind:style="{backgroundImage: 'url(' + item.coverUrl + ')'}" @click="spendList(item)"><!--动态获取封面图片作为其背景图-->
							<view class="operation">
								<view class="accountName">
									<text>{{ item.accountName }}</text><!--动态获取账本名字-->
								</view>
								<view class="createDate">
									<text>{{ item.createTime }}</text><!--动态获取账本创建时间-->
								</view>
								<view class="updateButton" @click.stop="updateAccount(item)">
									<view class="update"></view>
									<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/990fbb1a-4a6b-4290-9eb1-0d5b6dab3e83.svg"></image>
								</view>
							</view>
						</view>
					</swiper-item>
				</template>
				<swiper-item>
					<view class="createNewAccount" @click="setAccount">
						<view class="motto">
							<text>旅行中的每一笔开支都有独特的意义</text>
						</view>
						<view class="createButton">
							<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/9caae42f-1eb2-4d90-8a80-56185257bbc5.png"></image>
						</view>
						<view class="tip">
							<text>创建一个新帐本</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</template>
		<template v-if="!listStyle"><!--listStyle为false时显示-->
			<image class="switchStyleButton" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/3c6a63de-d282-402f-90fc-dcfc278a59b8.svg"></image>
			<view class="showArea">
				<view class="accountList">
					<view class="addNewAccount" @click="setAccount">
						<view class="year">
							<text>{{ new Date().getFullYear() }}</text><!--获取当前年份-->
						</view>
						<view class="circlePoint"></view>
						<view class="addButton">
							<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/9caae42f-1eb2-4d90-8a80-56185257bbc5.png"></image>
						</view>
						<view class="addTip">
							<text>创建一个新帐本</text>
						</view>
						<view class="currentTime">
							<text>{{ new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() }}</text><!--获取当前时间-->
						</view>
					</view>
					<template>
						<view class="listItem" v-for="(item, index) in allAccount" v-bind:style="{backgroundImage: 'url(' + item.coverUrl + ')'}"><!--动态获取封面图作为其背景图-->
							<view class="circlePoint"></view>
							<view class="buildDate">
								<text>{{ item.createTime }}</text><!--动态获取账本创建日期-->
							</view>
							<view class="wrapper" @click="spendList(item)">
								<view class="AccountInfo">
									<view class="name">
										<text>{{ item.accountName }}</text><!--动态获取账本名字-->
									</view>
									<view class="edit" @click.stop="updateAccount(item)">
										<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/990fbb1a-4a6b-4290-9eb1-0d5b6dab3e83.svg"></image>
									</view>
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import newAccount from '@/common/js/newAccount.js';
	export default {
		data() {
			return {
				listStyle: true,
				allAccount: [],
				now: 1
			}
		},
		onLoad() {
			newAccount.getNewAccountInfo(this);
			newAccount.onLoad();
			newAccount.initAccountList(this);
		},
		methods: {
			setAccount(){
				newAccount.setAccount();
			},
			switchStyle(){
				newAccount.switchStyle(this);
			},
			updateAccount(item){
				newAccount.updateAccount(item);
			},
			setNow(event){
				newAccount.setNow(this, event);
			},
			spendList(item){
				newAccount.spendList(item);
			}
		}
	}
</script>

<style>
	@import "@/common/css/newAccount.css";
</style>
