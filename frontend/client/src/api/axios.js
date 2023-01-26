import axios from "axios";

const baseURL = window.location.origin;

axios.defaults.baseURL = baseURL + "/api/";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.withCredentials = true;


let isRefreshing = false;
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalConfig = error.config;
        if (error.response.status === 401 && !originalConfig._retry) {
            if (isRefreshing){
                return;
            }
            isRefreshing = true;
            try {
                const res = await axios.post("/auth/refresh", {}, {withCredentials: true});
                if (res.status === 200) {                    
                    return axios(originalConfig);
                }
                return Promise.reject(error);                
            } catch (err) {
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default baseURL;