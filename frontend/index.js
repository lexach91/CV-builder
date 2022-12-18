const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();


const registerRoute = require('./routes/auth/register');
const currentRoute = require('./routes/auth/current');
const loginRoute = require('./routes/auth/login');
const verifyRoute = require('./routes/auth/verify');
const logoutRoute = require('./routes/auth/logout');
const changePasswordRoute = require('./routes/profiles/changePassword');
const refreshRoute = require('./routes/auth/refresh');

const getCVDetailsRoute = require('./routes/cvs/getCVDetails');
const createNewCVRoute = require('./routes/cvs/createNewCV');

const setNewHeaderRoute = require('./routes/cvs/createCVHeader');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(registerRoute);
app.use(currentRoute);
app.use(loginRoute);
app.use(verifyRoute);
app.use(logoutRoute);
app.use(changePasswordRoute);
app.use(refreshRoute);

app.use(getCVDetailsRoute);
app.use(createNewCVRoute);

app.use(setNewHeaderRoute);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
