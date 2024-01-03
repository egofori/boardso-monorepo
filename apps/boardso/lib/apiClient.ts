import axios from "axios"

const apiClient = axios.create({
  baseURL: process.env["NEXT_PUBLIC_API_BASE_URL"],
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken && !(config.headers.Authorization === "")) {
      config.headers.Authorization = `Bearer ${accessToken}`
    } else {
      config.headers.Authorization = null
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("isLoggedIn")
    }
  });

export default apiClient
