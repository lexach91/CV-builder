import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = baseURL + "/api/";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;