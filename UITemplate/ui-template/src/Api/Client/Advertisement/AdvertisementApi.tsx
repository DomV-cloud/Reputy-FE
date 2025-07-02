import {
  GET_ALL_ADVERTISEMENTS,
  GET_USER_ADVERTISEMENT,
} from "../../../Configuration/ApiEndpointUri/User/UserUri";
import apiClient from "../ApiClient";

export const getUserAdvertisementList = async () => {
  const url = GET_USER_ADVERTISEMENT;
  return apiClient.get(url);
};

export const getAllAdvertisements = async () => {
  const url = GET_ALL_ADVERTISEMENTS;
  return apiClient.get(url);
};
