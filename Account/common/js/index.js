/*点击按钮进入程序时的页面跳转及导航标题设置*/
function startAccount(){
	// uni.showLoading({
	// 	title: '旅程即将开始',
	// 	mask: true
	// });
	// setTimeout(function(){
		uni.navigateTo({
			url: '/pages/newAccount/newAccount'
		});
		// uni.hideLoading();
	// }, 600);
}


module.exports = {
	startAccount: startAccount
}