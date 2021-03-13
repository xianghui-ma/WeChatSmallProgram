'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const accountCoverCol = db.collection('accountCover');
	await accountCoverCol.add({
		coverUrl: event.coverUrl,
		openId: event.openId,
		addTime: event.addTime
	});
};