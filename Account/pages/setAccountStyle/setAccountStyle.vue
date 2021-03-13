<template>
	<view class="content">
		<view class="inputName">
			<input type="text" placeholder="账本名称..." v-model="accountName">
		</view>
		<view class="tip">
			<text>选择封面</text>
		</view>
		<view class="imgArea">
			<view class="img" v-for="(item, index) in cover" v-bind:style="{backgroundImage: 'url(' + item + ')'}" @click="onlyOne(index)">
				<image v-if="seen === index" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/dabc7d7a-c4f5-4b00-a9a8-d1fb381e4a2c.svg"></image>
			</view>
			<view class="img addImg" @click="chooseCover"><!--绑定点击事件，从相册选取封面-->
				<text>更多封面</text>
			</view>
		</view>
		<view class="button">
			<button type="primary" v-bind:disabled="(seen === -1) || (accountName === '')" @click="saveAccount">保存</button>
			<button type="warn" v-if="edit" @click="deleteAccount">删除</button><!--edit为true，表示是编辑已存在的账本，故可以显示删除按钮-->
		</view>
	</view>
</template>

<script>
	import setAccountStyle from '@/common/js/setAccountStyle.js';
	export default {
		data() {
			return {
				edit: true,
				accountId: '',
				seen: -1,
				accountName: '',
				cover: [
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/f2e44f0c-62a6-4d2d-b7b2-6b0840287f8b.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/c0def10f-6d48-489c-b4f0-c95d299335aa.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/448d0059-3ba9-4d83-ad65-04bba17d5aba.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/f1322604-0dcb-4cee-815e-69ba671d228d.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/3fcf829d-d7cf-4ca3-8202-652474c965f7.png'
				]
			}
		},
		onLoad: function(data){
			setAccountStyle.loadCover(this);
			setAccountStyle.onLoad(this, data);
		},
		methods: {
			onlyOne(index){
				setAccountStyle.onlyOne(this, index);
			},
			chooseCover(){
				setAccountStyle.chooseCover(this);
			},
			saveAccount(){
				setAccountStyle.saveAccount(this.seen, this.accountName, this.cover[this.seen], this.edit, this.accountId);
			},
			deleteAccount(){
				setAccountStyle.deleteAccount(this.accountId, this.accountName);
			}
		}
	}
</script>

<style>
	@import "@/common/css/setAccountStyle.css";
</style>
