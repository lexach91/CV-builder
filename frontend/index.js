const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();


const registerRoute = require('./routes/auth/register');
const currentRoute = require('./routes/auth/current');
const loginRoute = require('./routes/auth/login');
const verifyRoute = require('./routes/auth/verify');
const logoutRoute = require('./routes/auth/logout');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(registerRoute);
app.use(currentRoute);
app.use(loginRoute);
app.use(verifyRoute);
app.use(logoutRoute);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
