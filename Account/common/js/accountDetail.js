function onLoad(outplay, income, createTime, accountId, origin){
	uni.setNavigationBarTitle({
		title: "账本明细"
	});
	origin.outplay = outplay;
	origin.income = income;
	origin.createTime = createTime;
	origin.accountId = accountId;
}
function initPage(origin){
	uni.getStorage({
		key: origin.accountId,
		success: function(res){
			origin.list = res.data.data;
		}
	});
}
function showTip(item){
	uni.showModal({
		title: '备注',
		content: item.tip,
		showCancel: false
	});
}
module.exports = {
	onLoad: onLoad,
	initPage: initPage,
	showTip: showTip
}