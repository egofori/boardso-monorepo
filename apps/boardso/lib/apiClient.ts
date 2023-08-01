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

    if (accessToken && !(apiClient.defaults.headers.common.Authorization === "")) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
      apiClient.defaults.headers.common.Authorization = null
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
