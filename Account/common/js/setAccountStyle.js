function onLoad(origin, data){
	if(data.edit === "true"){
		// console.log(data);
		uni.setNavigationBarTitle({
			title: data.accountName
		});
		origin.seen = parseInt(data.coverIndex, 10);
		origin.accountName = data.accountName;
		origin.accountId = data.accountId;
		origin.edit = true;
	}else{
		uni.setNavigationBarTitle({
			title: '新建账本'
		});
		origin.edit = false;
	}
}
function onlyOne(origin, index){
	origin.seen = index;
}
function chooseCover(origin){
	var openId = uni.getStorageSync('openId');
	var time = new Date().getTime();
	uni.chooseImage({
		count: 1,
		sourceType: ['album'],
		success: function(res){
			if(res.tempFilePaths.length > 0){
				uniCloud.uploadFile({
					filePath: res.tempFilePaths[0],
					cloudPath: openId + time + res.tempFilePaths[0].replace(/.+\./,'.'),
					success(uploadRes){
						origin.cover.push(uploadRes.fileID);
						origin.seen = origin.cover.length - 1;
						uniCloud.callFunction({
							name: 'addUserCover',
							data: {
								coverUrl : uploadRes.fileID,
								openId: openId,
								addTime: time
							}
						});
					}
				});
			}
		}
	});
}
function loadCover(origin){
	uni.showLoading({
		title: '数据加载中',
		mask: true
	});
	var openId = uni.getStorageSync('openId');
	uniCloud.callFunction({
		name: 'getUserCover',
		data: {
			openId: openId
		},
		success: function(data){
			uni.hideLoading();
			if(data.result.data.length > 0){
				data.result.data.forEach(function(item){
					origin.cover.push(item.coverUrl)
				});
			}
		}
	})
}
function saveAccount(index, accountName, coverUrl, edit, accountId){
	var openId = uni.getStorageSync('openId');
	var tip = '账本',
		cloudFunName = 'saveAccount',
		data = {
			coverUrl: coverUrl,
			openId: openId,
			accountName: accountName,
			coverIndex: index
		};
	if(edit){
		tip = '修改';
		cloudFunName = 'updateAccount';
		data.accountId = accountId;
	}
	uni.showToast({
		title: '正在保存' + tip,
		icon: 'loading',
		mask: true
	});
	uniCloud.callFunction({
		name: cloudFunName,
		data: data,
		success: function(data){
			uni.hideToast();
			uni.showToast({
				title: tip + '保存成功',
				icon: 'success',
				mask: true
			});
			setTimeout(function(){
				uni.hideToast();
				uni.$emit('refreshPage', {
					openId: uni.getStorageSync('openId'),
					swiperJump: !edit
				});
				uni.navigateBack({
					delta: 1,
				});
			}, 300);
		}
	});
}
function deleteAccount(accountId, accountName){
	uni.showModal({
		title: '确定要删除',
		content: accountName,
		success: function(res){
			if(res.confirm){
				uni.showToast({
					title: '正在删除',
					icon: 'loading',
					mask: true
				})
				uniCloud.callFunction({
					name: 'deleteAccount',
					data: {
						accountId: accountId
					},
					success: function(){
						uni.hideToast();
						uni.showToast({
							title: '删除成功',
							icon: 'success',
							mask: true
						});
						setTimeout(function(){
							uni.hideToast();
							uni.$emit('refreshPage', {
								swiperJump: true,
								openId: uni.getStorageSync('openId')
							});
							uni.navigateBack({
								delta: 1,
							});
						}, 300);
					}
				});
			}
		}
	})
}
module.exports = {
	onLoad: onLoad,
	onlyOne: onlyOne,
	chooseCover: chooseCover,
	loadCover: loadCover,
	saveAccount: saveAccount,
	deleteAccount: deleteAccount
}