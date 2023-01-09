import axios from "axios";

const baseURL = window.location.origin;

axios.defaults.baseURL = baseURL + "/api/";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.withCredentials = true;

export default axios;