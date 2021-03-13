'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const spendDetailCol = db.collection('spendDetail');
	const accountCol = db.collection('account');
	
	let res = await spendDetailCol.where({
		accountId: event.accountId
	}).orderBy('timeFlag', 'desc').get();
	let totalSpend = await accountCol.doc(event.accountId).get();
	
	res.income = totalSpend.data[0]['income'];
	res.outplay = totalSpend.data[0]['outplay'];
	
	return res;
};
