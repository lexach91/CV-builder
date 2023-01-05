const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();


// for the endpoint on express server for creating a new header
router.post(`/api/cvs/header/`, async (req, res) => {
  // parse access token from cookie
  console.log('req.cookies', req.cookies);
  const { access } = req.cookies;
  console.log(req.body)
  // get id from request body
  const id = req.body.id;

  console.log('CV id for creating a header', id);

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/cvs/${id}/header/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify(req.body),
    });
    // in return we get only a response code
    const data = await apiRes.json();
    console.log(data);
    return res.status(apiRes.status).json(data);

    // const data = await apiRes.json();

    // return res.status(apiRes.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'Something went wrong when creating new CV and it is coming from the ROUTE',
    });
  }
});

// for the endpoint on express for updating a header
router.put(`/api/cvs/header/`, async (req, res) => {
  // parse access token from cookie
  console.log('req.cookies', req.cookies);
  const { access } = req.cookies;
  console.log(req.body)
  // get id from request body
  const id = req.body.id;

  console.log('CV id for creating a header', id);

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/cvs/${id}/header/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify(req.body),
    });
    // in return we get only a response code
    const data = await apiRes.json();
    console.log(data);
    return res.status(apiRes.status).json(data);

    // const data = await apiRes.json();

    // return res.status(apiRes.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'Something went wrong when creating new CV and it is coming from the ROUTE',
    });
  }
});

module.exports = router;