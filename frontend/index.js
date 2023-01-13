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

const getCVDetailsRoute = require('./routes/cvs/getCVDetails');
const createNewCVRoute = require('./routes/cvs/createNewCV');

const updateHeaderRoute = require('./routes/cvs/updateHeader');

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

app.use(getCVDetailsRoute);
app.use(createNewCVRoute);

app.use(updateHeaderRoute);

// need to take access token from cookie and send it to the backend as 'Authorization' header
// if the access token is expired, the backend will send a 401 response
// then we need to send a request to the refresh endpoint with the refresh token
app.use((req, res, next) => {
  console.log("refreshing token middleware");
  console.log(req.cookies);
  const { access } = req.cookies;
  const { refresh } = req.cookies;
  // console.log(access);
  // console.log(refresh);
  if (access) {
    console.log('access token exists');
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    // verify the access token
    axios.get('auth/verify', {}, {withCredentials: true})
      .then((response) => {
        console.log('in verify success');
        // console.log(response);
        next();
      })
      .catch((error) => {
        console.log('in verify error');
        // refresh the access token
        // console.log(error);
        axios.defaults.headers.common['Cookie'] = `refresh=${refresh}`;
        axios.post('auth/refresh', {}, {withCredentials: true})
          .then((response) => {
            console.log('in refresh success 1');
            console.log(response.data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            res.cookie(
              'access',
              response.data.access,
              {
                maxAge: 60 * 30,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',              
              });
            res.cookie(
              'refresh',
              response.data.refresh,
              {
                maxAge: 60 * 60 * 24,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
              });
            // set cookies in the request object to be absolutely the same as the cookies in the response object
            req.cookies.access = response.data.access;
            // maxAge is in milliseconds
            req.cookies.refresh = response.data.refresh;
            // set httpOnly to true to prevent client-side access to the cookie
            // set secure to true to prevent cookie from being sent over http
            // set sameSite to 'strict' to prevent cookie from being sent over http
            // set path to '/' to make the cookie available to all routes
            req.cookies.maxAge = 60 * 30;
            next();
          })
          .catch((error) => {
            console.log('in refresh error 1');
            next(
              // res.status(401).json({ message: 'Unauthorized' })
            );
          });
      });
    // console.log(axios.defaults.headers);
    // next();
  } else if (refresh) {
    console.log('in refresh 2');
    axios.defaults.headers.common['Cookie'] = `refresh=${refresh}`;
    axios.post('auth/refresh', {}, {withCredentials: true})
      .then((response) => {
        console.log('in refresh success 2');
        console.log(response.data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        req.cookies.access = response.data.access;
            req.cookies.refresh = response.data.refresh;
            res.cookie(
              'access',
              response.data.access,
              {
                maxAge: 60 * 30,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',              
              });
            res.cookie(
              'refresh',
              response.data.refresh,
              {
                maxAge: 60 * 60 * 24,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
              });
        next();
      })
      .catch((error) => {
        console.log('in refresh error 2');
        next(
          // res.status(401).json({ message: 'Unauthorized' })
        );
      });
  } else {
    console.log('in refresh 3');
    next(
      // res.status(401).json({ message: 'Unauthorized' })
    );
  }
});
// axios interceptors
// axios.interceptors.request.use(
//   (request) => {
//     console.log('in axios interceptor');
//     console.log(request);
//     // parse cookies from the request with cookie-parser
    
//     return request;
//   },
//   (error) => {
//     console.log('in axios interceptor error');
//     console.log(error);
//     return Promise.reject(error);
//   },
// );


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

