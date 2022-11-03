//  Logout route handler logic
const express = require('express');
// cookie library
const cookie = require('cookie');

const router = express.Router();

// Logout route handler
router.get('/api/auth/logout', (req, res) => {

  // No async await because we are not making any API calls
  // As it just needs to clear the cookies
  // Empty cookies with expire date in the past
  res.setHeader('Set-Cookie', [
    // Access cookie
    cookie.serialize('access', '', {
      httpOnly: true,
      // Expire date in the past
      expires: new Date(0),
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    }),
    // Refresh cookie
    cookie.serialize('refresh', '', {
      httpOnly: true,
      // Expire date in the past
      expires: new Date(0),
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    }),
  ]);

  // set response status to 200 OK
  res.status(200).json({ success: 'Logout successful' });

});

module.exports = router;