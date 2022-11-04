const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();


// for the endpoint on express
router.post('/api/profile/change-password', async (req, res) => {
  // parse access token from cookie
  const { access } = req.cookies;

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/profile/change-password/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    // in return we get only a response code
    return res.status(apiRes.status).json({});

    // const data = await apiRes.json();

    // return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Something went wrong when changing password',
    });
  }
});

module.exports = router;