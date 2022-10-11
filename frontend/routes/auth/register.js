const express = require('express');

const router = express.Router();

router.post('/api/auth/register', async(req, res) => {
  const { 
    first_name,
    last_name,
    email,
    birthday,
    country,
    password,
  } = req.body;
  
  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    birthday,
    country,
    password,
  })
  try {

    const registerResponse = await fetch(`${process.env.API_URL}/api/auth/register`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});

    const data = await registerResponse.json();

    return res.status(registerResponse.status).json(data);

  } catch(error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Something went wrong when registering an account"
    })
  }
});


module.exports = router;