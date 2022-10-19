const express = require('express');
const cookie = require('cookie');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post('api/auth/login'), async(req,res) => {
  const {email, password} = req.body;
  console.log('before fetch in login route')

  const body = JSON.stringify({email, password});

  try {
    const loginResponse = await fetch(`${process.env.API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });
    const data = await loginResponse.json();
    console.log(data);

    if (loginResponse.status === 200) {
      res.setHeader(
        'Set-Cookie', [
        cookie.serialize('access', data.access, {
          httpOnly: true,
          maxAge: 60 * 30,
          path: '/api/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        }),
        cookie.serialize('refresh', data.refresh, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: '/api/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        }),
      ]);
      return res.status(loginResponse.status).json({ access: 'login successful' });
    } else {
      return res.status(loginResponse.status).json(data);
    }
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Something went wrong when logging in"
    })
  }


}

module.exports = router;