'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const accountCoverCol = db.collection('accountCover');
	let res = await accountCoverCol.where({
		openId: event.openId
	}).orderBy('addTime', 'asc').get();
	return res;
};
