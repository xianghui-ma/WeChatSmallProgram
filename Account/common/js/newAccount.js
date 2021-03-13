/*设置页面的NavigationBarTitle*/
function onLoad(){
	uni.showLoading({
		title: '旅程即将开始',
		mask: true
	});
	uni.setNavigationBarTitle({
		title: '旅行小账本'
	});
}

/*页面跳转(到设置封面和账本名字页面)*/
function setAccount(){
	uni.showLoading({
		title: '数据加载中...',
		mask: true
	});
	setTimeout(function(){
		uni.navigateTo({
			url: '/pages/setAccountStyle/setAccountStyle?edit=false'
		});
		uni.hideLoading();
	}, 600);
}

/*点击切换显示方式时，设置listStyle的值*/
function switchStyle(origin){
	origin.listStyle = !origin.listStyle;
}

/*监听创建账本页面回传信息，若新保存了一个账本，就将获取新帐本数据，以将账本显示在页面上*/
function getNewAccountInfo(origin){
	uni.$on('refreshPage', function(res){
		uniCloud.callFunction({
			name: 'getAllAccount',
			data: {
				openId: res.openId
			},
			success: function(data){
				origin.allAccount = data.result.data;
				if(res.swiperJump){
					console.log('huiwei');
					origin.now = 0;
				}
			}
		});
	});
	// uni.$on('newAccountInfo', function(data){
	// 	origin.allAccount.unshift(data);
	// })
}

/*初始化账本列表，显示用户创建的所有账本*/
function initAccountList(origin){
	uniCloud.callFunction({
		name: 'getAllAccount',
		data: {
			openId: uni.getStorageSync('openId')
		},
		success: function(data){
			origin.allAccount = data.result.data;
			uni.hideLoading();
		}
	});
}

/*改、删账本*/
function updateAccount(item){
	uni.navigateTo({
		url: '/pages/setAccountStyle/setAccountStyle?edit=true&coverIndex=' + item.coverIndex + '&accountName=' + item.accountName + '&accountId=' + item._id
	});
}

function setNow(origin, event){
	if(event.detail.source === "touch"){
		origin.now = event.detail.current;
	}
}
function spendList(item){
	// console.log(item);
	uni.navigateTo({
		url: '/pages/spendList/spendList?accountId=' + item._id + '&accountName=' + item.accountName + '&coverUrl=' + item.coverUrl + '&createTime=' + item.createTime
	});
}
module.exports = {
	onLoad: onLoad,
	setAccount: setAccount,
	switchStyle: switchStyle,
	getNewAccountInfo: getNewAccountInfo,
	initAccountList: initAccountList,
	updateAccount: updateAccount,
	setNow: setNow,
	spendList: spendList
}