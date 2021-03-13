<template>
	<view class="content">
		<van-tabs active="1" @click="inOrOut" animated="false" lazy-render="false" duration="0" line-width="0" line-height="0" title-active-color="#ee0a24">
			<van-tab title="支出" name="1">
				<van-tabs @click="reset" active="1" swipe-threshold="7" title-active-color="#F0AD4E" animated="false" lazy-render="false" duration="0" line-width="0" line-height="0">
					<van-tab title="食" name="1">
						<styleList :typeList="foods" :current="cur"></styleList>
					</van-tab>
					<van-tab title="住">
						<styleList :typeList="house" :current="cur"></styleList>
					</van-tab>
					<van-tab title="行">
						<styleList :typeList="transport" :current="cur"></styleList>
					</van-tab>
					<van-tab title="嗨">
						<styleList :typeList="happy" :current="cur"></styleList>
					</van-tab>
					<van-tab title="买">
						<styleList :typeList="shop" :current="cur"></styleList>
					</van-tab>
					<van-tab title="其他">
						<styleList :typeList="other" :current="cur"></styleList>
					</van-tab>
				</van-tabs>
			</van-tab>
			<van-tab title="收入">
				<van-tabs @click="reset" active="1" title-active-color="#F0AD4E" animated="false" lazy-render="false" duration="0" line-width="0" line-height="0">
					<van-tab title="资本性收入" name="1">
						<styleList :typeList="capital" :current="cur"></styleList>
					</van-tab>
					<van-tab title="劳动性收入">
						<styleList :typeList="labor" :current="cur"></styleList>
					</van-tab>
				</van-tabs>
			</van-tab>
		</van-tabs>
		<view class="setText">
			<view class="money">
				<input focus placeholder="￥0.00" class="input" v-model="money"/>
			</view>
			<view class="tip">
				<textarea placeholder="备注(不超过20个字)..." class="textarea" v-model="tip" maxlength="20"/>
			</view>
			<!-- <view class="location">
				<image class="image" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/72623b06-3295-480b-97c6-e4d498f89fba.png"></image>
				<text class="text">点击此处mark一下定位吧</text>
			</view> -->
			<view class="save">
				<button type="primary" v-bind:disabled="money === '' || text === ''" @click="saveSpend">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import outIn from '@/common/js/outIn.js';
	export default {
		data() {
			return {
				cur: -1,
				money: '',
				accountId: '',
				tip: '',
				iconUrl: '',
				type: 0,
				text: '',
				foods: [
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/69817c75-767a-4753-8c5e-29a35854e3aa.png',
						text: '早餐'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/073c7e35-1008-42ff-87e8-664dc8c559f2.png',
						text: '午餐'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/2523f3ba-974d-49b6-8559-29e4b5824bb0.png',
						text: '晚餐'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/e3e65a62-6c3e-44f6-b822-c4769f73b2a3.png',
						text: '饮料'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/50ff5a7c-a4e4-489c-b229-e3bf9a16ff3b.png',
						text: '水果零食'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/bcbdbcc3-57f6-4d05-b63f-25244b1fe5da.png',
						text: '其他食物'
					}
				],
				house: [
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/333524fa-e1da-47ac-9df1-310457dc498d.png',
						text: '酒店'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/789276f5-faec-4511-b996-29b3a88cff61.png',
						text: '青年旅舍'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/5cda04e8-7891-4c71-a7a8-82d55d4ba311.png',
						text: '民居'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/45b06e44-2a26-4612-be2d-88b8ad486a1d.png',
						text: '其他住宿'
					}
				],
				transport: [
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/795aa664-5376-4b40-86c7-25d3e6bf126b.png',
						text: '飞机'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/e31f3a5e-e6c4-44b1-935b-b7cf2bb97f7e.png',
						text: '公交地铁'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/cc309a1e-583d-4ce8-9eb9-4299c5c4fcaf.png',
						text: '火车'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/56cefeda-15b3-4509-847a-0b4a15212fd0.png',
						text: '轮船'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/e433935c-e0b9-4dee-9c8c-da91fc1dd318.png',
						text: '汽车'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/e574c59b-492b-419e-b110-c88adab7e1e6.png',
						text: '其他交通'
					}
				],
				happy: [
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/17521797-2701-4dde-8776-4733aff3595c.png',
						text: '旅游'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/fe31bc87-6241-4963-8f1f-868c3d5a1b18.png',
						text: '夜店'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/6b5b9847-884d-4578-b168-75174ea3b258.png',
						text: '棋牌'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/1a7291fe-ab4d-476a-bf91-3783302b6e89.png',
						text: '其他娱乐'
					}
				],
				shop: [
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/a03bc3fc-77e1-4a2c-a7df-f521a41a8110.png',
						text: '服装'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/336b8a5d-e8c0-430a-8522-45efb3be6dab.png',
						text: '美妆'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/ac8b05aa-98e1-4efb-b94b-2374e343adee.png',
						text: '数码'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/9431c32a-0e47-4c00-9e7c-59d46c3462d5.png',
						text: '玩具'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/74fc29b8-b20a-41aa-b201-88a693ed9c6a.png',
						text: '其他物品'
					}
				],
				other: [
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/aeb2b677-aa12-43a3-8693-05bb5592c5d8.png',
						text: '教育'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/a4d42873-f148-4b28-82dd-b1fbe6845c46.png',
						text: '医疗卫生'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/e30665c3-008e-43e1-8f7c-63d837396476.png',
						text: '签证注册'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/3324bedf-028f-4e46-b259-cb349b0dc077.png',
						text: '其他支出'
					}
				],
				capital: [
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/6af38bdc-54bb-4636-abcb-92b663244204.png',
						text: '收租'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/d65b69d3-692c-4364-8487-13bc4b39c405.png',
						text: '炒股'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/240d7705-9e17-4cf5-96c8-26152dcdbcbd.png',
						text: '经营'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/5764e68e-73e9-4267-b992-127eccbdf7a6.png',
						text: '投资理财'
					}
				],
				labor: [
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/5ea63e22-3e06-4b3c-b9c8-431642bdc220.png',
						text: '工资'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/21c78847-6f98-4ca2-8f20-5f7678683be7.png',
						text: '副业'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/f9268cb1-25fb-4532-8a63-bf25d7a6004e.png',
						text: '补助'
					},
					{
						iconUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-69daef55-e76d-404d-9c03-fedd338d3f3d/222d4e7e-81b4-4cc8-acf0-dfc81e75697b.png',
						text: '转账'
					}
				]
			}
		},
		onLoad: function(option){
			outIn.onLoad(option.accountId, this);
			outIn.watch(this);
		},
		methods: {
			inOrOut(name, title) {
				// this.$refs.foods.current = -1;
				// this.$refs.house.current = -1;
				// this.$refs.transport.current = -1;
				// this.$refs.happy.current = -1;
				// this.$refs.other.current = -1;
				// this.$refs.shop.current = -1;
				this.cur = -1;
				this.money = '';
				this.text = '';
				this.type = name.detail.index;
			},
			saveSpend(){
				outIn.saveSpend(this);
			},
			reset(){
				// this.$refs.foods.current = -1;
				// this.$refs.house.current = -1;
				// this.$refs.transport.current = -1;
				// this.$refs.happy.current = -1;
				// this.$refs.other.current = -1;
				// this.$refs.shop.current = -1;
				this.cur = -1;
				this.money = '';
				this.text = '';
			}
		}
	}
</script>

<style>
	@import "@/common/css/outIn.css";
</style>
