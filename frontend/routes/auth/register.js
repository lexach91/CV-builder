const express = require('express');

const router = express.Router();

const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));


router.post('/api/auth/register', async(req, res) => {
  const { 
    first_name,
    last_name,
    email,
    birthday,
    country,
    password,
    password_confirm,
  } = req.body;
  
  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    birthday,
    country,
    password,
    password_confirm,
  })

  try {
    // fetch request towards Django API
    console.log('before fetch')
    const registerResponse = await fetch(`${process.env.API_URL}/api/auth/register`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});
    // return an empty response with status 201
    return res.status(201).json({});

  } catch(error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Something went wrong when registering an account"
    })
  }
});


module.exports = router;