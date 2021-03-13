<script>
	export default {
		onLaunch: function() {
			/*获取用户的openId并setStorage*/
			uni.clearStorageSync();
			uni.login({
				provider: 'weixin',
				success: function(res){
					uniCloud.callFunction({
						name: 'getOpenId',
						data: {
							code: res.code
						},
						success: function(data){
							uni.setStorageSync('openId', data.result);
						}
					})
				}
			});
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
		width: 100%;
		height: 100%;
		background-color: #333333;
	}
</style>
