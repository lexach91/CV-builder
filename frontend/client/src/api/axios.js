import axios from "axios";

const baseURL = window.location.origin;

axios.defaults.baseURL = baseURL + "/api/";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.withCredentials = true;

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
                .post("auth/refresh", {
                    withCredentials: true,
                })
                .then((response) => {
                    // refreshing = false;
                    return axios(error.config);
                })
                .catch((err) => {
                    refreshing = false;
                    return Promise.reject("refresh failed");
                });
        } else {
            return Promise.reject("something went wrong");
        }

    }
);

export default baseURL;