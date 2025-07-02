import { USER_LOGIN } from "../../../../Configuration/ApiEndpointUri/Authentication/UserLoginUri";
import apiClient from "../../ApiClient";

export const userLogin = async (email: string, password: string) => {
  const url = USER_LOGIN;
  return apiClient.post(url, { email, password });
};
