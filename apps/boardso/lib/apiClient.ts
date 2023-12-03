import axios from "axios"

const apiClient = axios.create({
  baseURL: "https://api.boardso.com",
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

export default apiClient
