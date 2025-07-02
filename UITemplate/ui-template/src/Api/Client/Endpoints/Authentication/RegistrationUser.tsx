import { RegisterPayload } from "../../../../Types/RegisterPayload";
import apiClient from "../../ApiClient";
const REGISTER_URI = "auth/register";

export const userRegister = async (payload: RegisterPayload) => {
  console.log("payload", payload);
  console.log("register uri:", apiClient.getUri() + REGISTER_URI);
  return apiClient.post(REGISTER_URI, payload);
};
