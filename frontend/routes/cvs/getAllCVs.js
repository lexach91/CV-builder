const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const axios = require('axios');


// for the endpoint on express
router.get('/api/allCvs/', async (req, res) => {
  // parse access token from cookie
  // const { access } = req.cookies;
  console.log('getAllCVs.js');
  // console.log(access);

  try {
    // console.log('getAllCVs.js before fetch');
    // const apiRes = await fetch(`${process.env.API_URL}/api/cvs/`, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${access}`,
    //   },
    //   // body: JSON.stringify(req.body),
    // });
    // const apiRes = await axios.get('cvs/', {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${access}`,
    //   },
    // });
    // console.log('getAllCVs.js after fetch');
    // in return we get only a response code
    // const data = await apiRes.json();
    // console.log(data);
    // return res.status(apiRes.status).json(data);

    // const data = await apiRes.json();

    // return res.status(apiRes.status).json(data);
    const apiRes = await axios.get('cvs/', {}, { withCredentials: true });
    const data = await apiRes.data;
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log('getAllCVs.js error');
    console.log(err);
    return res.status(500).json({
      error: 'Something went wrong when getting all CVs and it is coming from the ROUTE',
    });
  }
});

module.exports = router;