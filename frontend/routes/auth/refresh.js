const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cookie = require('cookie');
const router = express.Router();


router.post('/api/auth/refresh', async (req, res) => {

    try {
        // refresh token cookie should be taken from the "/" path
        const { refresh } = req.cookies;
        console.log(refresh);
        console.log(req.cookies);
        const apiRes = await fetch(`${process.env.API_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type': 'text/plain',
                'Cookie': `refresh=${refresh}`,
            },
            credentials: 'include',
        });

        const data = await apiRes.json();

        if (apiRes.status === 200) {
            res.setHeader(
              'Set-Cookie', [
              cookie.serialize('access', data.access, {
                httpOnly: true,
                maxAge: 60 * 30,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                path: '/',
              }),
              cookie.serialize('refresh', data.refresh, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                path: '/',
              }),
            ]);
            return res.status(apiRes.status).json({ access: 'refresh successful' });
        } else {
            return res.status(apiRes.status).json({ error: 'refresh failed' });
        }        
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: 'Something went wrong when refreshing token',
        });
    }
});

module.exports = router;