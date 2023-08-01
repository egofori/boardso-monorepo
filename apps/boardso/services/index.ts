import apiClient from "@/lib/apiClient"

export const signUp = async (data: any) => {
  const response = apiClient.post("/api/auth/local", data)

  return response
}
