const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const axios = require('axios');

// for the endpoint on express
router.get('/api/allCvs/', async (req, res) => {
  try {
    const apiRes = await axios.get('cvs/', {}, { withCredentials: true });
    const data = await apiRes.data;
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Something went wrong when getting all CVs and it is coming from the ROUTE',
    });
  }
});

module.exports = router;