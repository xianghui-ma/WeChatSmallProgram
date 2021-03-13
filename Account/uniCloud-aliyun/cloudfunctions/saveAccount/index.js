'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const accountCoverCol = db.collection('account');
	let time = new Date();
	let createTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
	let accountId = await accountCoverCol.add({//accoutId是数据库自动为所增添账本创建的id，用以唯一标识该账本
		coverUrl: event.coverUrl,
		income: '0',
		outplay: '0',
		coverIndex: event.coverIndex,
		openId: event.openId,
		accountName: event.accountName,
		createTime: createTime,//"年-月-日"形式的账本创建时间
		addTime: time.getTime()//账本创建时间戳，以此排序账本将最新创建的账本显示在前面
	});
	accountId.createTime = createTime;
	return accountId;//取出账本id并直接返回
};
