const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');


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

const getCVDetailsRoute = require('./routes/cvs/getCVDetails');
const createNewCVRoute = require('./routes/cvs/createNewCV');

const updateHeaderRoute = require('./routes/cvs/updateHeader');
const updateSummaryRoute = require('./routes/cvs/updateSummary');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(registerRoute);
app.use(currentRoute);
app.use(loginRoute);
app.use(verifyRoute);
app.use(logoutRoute);
app.use(changePasswordRoute);
app.use(refreshRoute);

app.use(getCVDetailsRoute);
app.use(createNewCVRoute);

app.use(updateHeaderRoute);
app.use(updateSummaryRoute);

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

// axios interceptors
axios.interceptors.request.use(
  (config) => {
    const refreshToken = config.cookies.refresh;
    if (refreshToken) {
      config.headers['Authorization'] = `Bearer ${refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshing = false;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (refreshing) {
        return;
      }
      refreshing = true;
      return axios
        .post('auth/refresh', {
          withCredentials: true,
        })
        .then((response) => {
          return axios(error.config);
        })
        .catch((err) => {
          refreshing = false;
          return Promise.reject('refresh failed');
        });
    } else {
      return Promise.reject('something went wrong');
    }
  }
);
