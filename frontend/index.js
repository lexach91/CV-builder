const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const router = express.Router();


require('dotenv').config();

axios.defaults.baseURL = process.env.API_URL + '/api/';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';


const registerRoute = require('./routes/auth/register');
const currentRoute = require('./routes/auth/current');
const loginRoute = require('./routes/auth/login');
const verifyRoute = require('./routes/auth/verify');
const logoutRoute = require('./routes/auth/logout');
const changePasswordRoute = require('./routes/profiles/changePassword');
const refreshRoute = require('./routes/auth/refresh');

const getAllCvsRoute = require('./routes/cvs/getAllCVs');
const getCVDetailsRoute = require('./routes/cvs/getCVDetails');
const createNewCVRoute = require('./routes/cvs/createNewCV');

const updateHeaderRoute = require('./routes/cvs/updateHeader');
const updateSummaryRoute = require('./routes/cvs/updateSummary');
const updateExperienceRoute = require('./routes/cvs/updateExperience');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(registerRoute);
app.use(currentRoute);
app.use(loginRoute);
app.use(verifyRoute);
app.use(logoutRoute);
app.use(changePasswordRoute);
app.use(refreshRoute);

app.use(getAllCvsRoute);
app.use(getCVDetailsRoute);
app.use(createNewCVRoute);

app.use(updateHeaderRoute);
app.use(updateSummaryRoute);
app.use(updateExperienceRoute);


// need to take access token from cookie and send it to the backend as 'Authorization' header
app.use((req, res, next) => {
  const { access } = req.cookies;
  if (access) {
    console.log('access token exists');
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
  }
  next();
});



app.use(express.static('client/build'));

app.get('*', (req, res) => {
  console.log('in *');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

