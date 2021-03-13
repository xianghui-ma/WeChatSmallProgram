'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const accountCol = db.collection('account');
	let res = await accountCol.doc(event.accountId).update({
		coverUrl: event.coverUrl,
		accountName: event.accountName,
		coverIndex: event.coverIndex
	});
};
