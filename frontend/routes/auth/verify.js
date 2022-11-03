const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();
console.log('in verify route');

// for the endpoint on express
router.get('/api/auth/verify', async (req, res) => {
  // parse access token from cookie
	const { access } = req.cookies;

//   const body = JSON.stringify({
//     token: access,
//   });

	try {
		const apiRes = await fetch(`${process.env.API_URL}/api/auth/verify`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${access}`,
			},
		});
		// in return we get only a response code
		return res.status(apiRes.status).json({});

		// const data = await apiRes.json();

		// return res.status(apiRes.status).json(data);
	} catch (err) {
		return res.status(500).json({
			error: 'Something went wrong when verifying token',
		});
	}
});

module.exports = router;