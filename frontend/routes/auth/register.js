const express = require('express');

const router = express.Router();

const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));


router.post('/api/auth/register', async(req, res) => {
  
  const body = Object.keys(req.body)[0];
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
    const data = await registerResponse.json();
    console.log(data)
    if (registerResponse.status >= 400) {
      return res.status(400).json(data);
    }
    return res.status(201).json({ data });

  } catch(error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Something went wrong when registering an account"
    })
  }
});


module.exports = router;