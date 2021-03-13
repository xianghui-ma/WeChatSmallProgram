'use strict';
exports.main = async (event, context) => {
	let code = event.code;
	const appid = 'wx37489afbca45c1d2';
	const secret = '0472eb582a82696d3cce86f52bf03df7';
	const verifyUrl = 'https://api.weixin.qq.com/sns/jscode2session';
	
	let res = await uniCloud.httpclient.request(verifyUrl, {
		data: {
			appid: appid,
			secret: secret,
			js_code: code,
			grant_type: 'authorization_code'
		},
		dataType: 'json',
	})
	console.log(res.data.openid + '----');
	return res.data.openid;
};
