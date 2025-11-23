import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export async function signup(userData) {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, userData);
    return response.data;
  } catch (err) {
    // Normalize error shape similar to previous implementation
    const message = err?.response?.data?.message || err.message || "Signup failed";
    throw new Error(message);
  }
}
