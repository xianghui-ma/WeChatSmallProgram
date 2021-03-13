'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const spendDetailCol = db.collection('spendDetail');
	const accountCol = db.collection('account');
	
	let money = parseFloat(event.money);
	let queryField;
	let moneyStr;
	let timeFlag = new Date().getTime();
	
	if(event.type === 0){
		queryField = 'outplay';
		moneyStr = '-' + event.money;
	}else{
		queryField = 'income';
		moneyStr = '+' + event.money
	}
	
	let res = await spendDetailCol.add({
		accountId: event.accountId,
		openId: event.openId,
		text: event.text,
		iconUrl: event.iconUrl,
		tip: event.tip,
		money: moneyStr,
		timeFlag: timeFlag
	});
	
	let totalSpend = await accountCol.doc(event.accountId).get();
	let nowMoney = parseFloat(totalSpend.data[0][queryField]);
	money += nowMoney;
	await accountCol.doc(event.accountId).update({
		[queryField]: money
	});
};
