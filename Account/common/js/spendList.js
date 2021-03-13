function onLoad(accountName, accountId, coverUrl, createTime, origin){
	uni.setNavigationBarTitle({
		title: accountName//需要根据你点击的账本动态设置
	});
	origin.bgi = coverUrl;
	origin.accountId = accountId;
	origin.createTime = createTime;
}
function calendar(){
	uni.navigateTo({
		url: '/pages/calendar/calendar'
	});
}
function accountDetail(createTime, outplay, income, accountId){
	uni.navigateTo({
		url: '/pages/accountDetail/accountDetail?createTime=' + createTime + '&outplay=' + outplay + '&income=' + income + '&accountId=' + accountId
	});
}
function outIn(origin){
	uni.navigateTo({
		url: '/pages/outIn/outIn?accountId=' + origin.accountId
	});
}
function initList(origin, accountId){
	uni.getStorage({
		key: accountId,
		success: function(res){
			// console.log('获取缓存成功');
			uni.$emit('refreshListPage',{});
		},
		fail: function(){
			// console.log('获取缓存失败，请求数据');
			uni.showLoading({
				title: '数据加载中',
				mask: true
			});
			uniCloud.callFunction({
				name: 'getAllSpend',
				data: {
					accountId: accountId
				},
				success: function(data){
					uni.hideLoading();
					uni.setStorage({
						key: accountId,
						data: data.result,
						success:function(){
							// console.log('缓存成功');
						}
					});
					if(data.result.data.length > 0){
						origin.outplay = parseFloat(data.result.outplay);
						origin.income = parseFloat(data.result.income);
						origin.list = data.result.data;
					}
				}
			});
		}
	})
}
function reShow(origin){
	uni.$on('refreshListPage', function(){
		uni.getStorage({
			key: origin.accountId,
			success: function(res){
				origin.list = res.data.data;
				origin.outplay = parseFloat(res.data.outplay);
				origin.income = parseFloat(res.data.income);
			}
		});
	});
}
module.exports = {
	onLoad: onLoad,
	calendar: calendar,
	accountDetail: accountDetail,
	outIn: outIn,
	initList: initList,
	reShow: reShow
}