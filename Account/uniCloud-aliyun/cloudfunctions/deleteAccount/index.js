'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const accountCol = db.collection('account');
	const spendDetailCol = db.collection('spendDetail');
	await accountCol.doc(event.accountId).remove();
	await spendDetailCol.where({
		accountId: event.accountId
	}).remove();
};
