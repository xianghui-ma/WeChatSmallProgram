'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const accountCol = db.collection('account');
	let res = await accountCol.where({
		openId: event.openId
	}).orderBy('addTime', 'desc').get();
	return res;
};
