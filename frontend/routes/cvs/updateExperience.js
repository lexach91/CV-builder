const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();


// for the endpoint on express server for creating a new experience
router.post(`/api/cvs/experience/`, async (req, res) => {
  console.log('we are now in the experience route');
  // parse access token from cookie
  console.log('req.cookies', req.cookies);
  const { access } = req.cookies;
  console.log(req.body)
  // get id from request body
  // const id = JSON.parse(Object.values(req.body).id);
  const id = req.body.id;
  console.log('CV id for creating a experience', id);

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/cvs/${id}/experience/`, {
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


// for the endpoint on express server for updating an existing experience
router.put(`/api/cvs/experience/`, async (req, res) => {
  console.log('we are now in the experience route');
  // parse access token from cookie
  console.log('req.cookies', req.cookies);
  const { access } = req.cookies;
  console.log(req.body)
  // get id from request body
  const id = JSON.parse(Object.values(req.body)[0]);

  console.log('CV id for updating a experience', id);

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/cvs/${id}/experience/`, {
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