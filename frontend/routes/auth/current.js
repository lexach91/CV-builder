const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const axios = require('axios');

router.get('/api/auth/user', async (req, res) => {
	// const { access } = req.cookies;
	// axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

	try {
		// const apiRes = await fetch(`${process.env.API_URL}/api/auth/user`, {
		// 	method: 'GET',
		// 	headers: {
		// 		Accept: 'application/json',
		// 		Authorization: `Bearer ${access}`,
		// 	},
		// });

		// const data = await apiRes.json();

		// return res.status(apiRes.status).json(data);
		const apiRes = await axios.get('auth/user',{}, {withCredentials: true});
		console.log(apiRes);
		return res.status(apiRes.status).json(apiRes.data);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: 'Something went wrong when trying to retrieve user',
		});
	}
});

module.exports = router;