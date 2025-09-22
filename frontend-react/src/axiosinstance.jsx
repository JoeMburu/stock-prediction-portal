import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {  
    "Content-Type": "application/json",
  }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    //console.log("Request Interceptor: ", config);
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error: ", error);
    return Promise.reject(error);
  }
)

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor: ", response);
    return response;
  },
  async (error) => { 
    const originalRequest = error.config;
    if(error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const response = await axiosInstance.post(`/token/refresh/`, { refresh: refreshToken });
        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
       
      } catch (error) {
        console.log(error)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
          
      }

    }    
    return Promise.reject(error);
  }
)



export default axiosInstance; 