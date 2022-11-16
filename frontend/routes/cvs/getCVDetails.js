const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

// for the endpoint on express
router.get('/api/cvs/', async (req, res) => {
  // parse access token from cookie
  const { access } = req.cookies;

  const { id } = req.query;
  console.log(id);

  
  try {
    console.log('getCVDetails.js');
    console.log(`${process.env.API_URL}/api/cvs/${id}`);
    const apiRes = await fetch(`${process.env.API_URL}/api/cvs/${id}/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
      // body: JSON.stringify(req.body),
    });
    // in return we get only a response code
    const data = await apiRes.json();
    console.log(data);
    return res.status(apiRes.status).json(data);

    // const data = await apiRes.json();

    // return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Something went wrong when getting CV data and it is coming from the ROUTE',
    });
  }
});

module.exports = router;