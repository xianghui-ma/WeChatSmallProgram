function onLoad(accountId, origin){
	uni.setNavigationBarTitle({
		title: "新增收支"
	});
	origin.accountId = accountId;
}
function watch(origin){
	uni.$on('selectIcon', function(res){
		origin.iconUrl = res.item.iconUrl;
		origin.text = res.item.text;
		origin.cur = res.index
	});
}
function saveSpend(origin){
	var openId = uni.getStorageSync('openId');
	uni.showToast({
		title: '正在保存',
		icon: 'loading',
		mask: true
	});
	uni.getStorage({
		key: origin.accountId,
		success: function(res){
			res.data.data.unshift({
				accountId: origin.accountId,
				openId: openId,
				text: origin.text,
				iconUrl: origin.iconUrl,
				tip: origin.tip,
				money: origin.type === 0 ? '-' + origin.money : '+' + origin.money,
				type: origin.type
			});
			if(origin.type === 0){
				res.data.outplay = parseFloat(origin.money) + parseFloat(res.data.outplay);
			}else{
				res.data.income = parseFloat(origin.money) + parseFloat(res.data.income);
			}
			uni.setStorage({
				key: origin.accountId,
				data: res.data
			});
		}
	})
	uniCloud.callFunction({
		name: 'saveSpend',
		data: {
			accountId: origin.accountId,
			openId: openId,
			text: origin.text,
			iconUrl: origin.iconUrl,
			tip: origin.tip,
			money: origin.money,
			type: origin.type
		},
		success: function(data){
			// console.log(data);
			uni.hideToast();
			uni.showToast({
				title: '保存成功',
				icon: 'success',
				mask: true
			});
			setTimeout(function(data){
				uni.hideToast();
				uni.$emit('refreshListPage', {});
				uni.navigateBack({
					delta: 1
				})
			}, 300);
		}
	})
	// console.log(origin.text, origin.tip, origin.iconUrl, origin.type, origin.money);
}
module.exports = {
	onLoad: onLoad,
	watch: watch,
	saveSpend: saveSpend
}