import axios from "axios";
import { store } from "../store";

const baseURL = window.location.origin;

axios.defaults.baseURL = baseURL + "/api/";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.withCredentials = true;


axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("in axios interceptor");
        // set authentication state to false if 401 response
        if (error.response.status === 401) {
            store.dispatch(state => {
                return {
                    ...state,
                    isAuthenticated: false,
                };
            })
            return Promise.reject(error);
        } else {
            return Promise.reject(error);
        }

    }
);
export default baseURL;