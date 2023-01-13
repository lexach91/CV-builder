const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));
const axios = require('axios');
const router = express.Router();
console.log('in verify route');

// for the endpoint on express
router.get('/api/auth/verify', async (req, res) => {
  // parse access token from cookie
	const { access } = req.cookies;
	// console.log(access);
	console.log(req.cookies);
	// res.cookie('access', access)
	// res.cookie('refresh', req.cookies.refresh)

//   const body = JSON.stringify({
//     token: access,
//   });

	try {
		// const apiRes = await fetch(`${process.env.API_URL}/api/auth/verify`, {
		// 	method: 'GET',
		// 	headers: {
		// 		Accept: 'application/json',
		// 		Authorization: `Bearer ${access}`,
		// 		'Cookie': "lalala"
		// 	},
		// 	credentials: 'include',
		// });
		const apiRes = await axios.get('auth/verify',{}, {withCredentials: true});
		console.log(apiRes);

		// in return we get only a response code
		return res.status(apiRes.status).json({});

		// const data = await apiRes.json();

		// return res.status(apiRes.status).json(data);
	} catch (err) {
		return res.status(500).json({
			error: err,
		});
	}
});

module.exports = router;