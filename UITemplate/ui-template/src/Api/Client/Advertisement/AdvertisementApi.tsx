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

export const searchAdvertisements = async (filters: {
  location?: string;
  disposition?: string;
  maxPrice?: string;
  pageNumber?: number;
  pageSize?: number;
}) => {
  const params = new URLSearchParams();

  if (filters.location) params.append("location", filters.location);
  if (filters.disposition) params.append("disposition", filters.disposition);
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
  params.append("pageNumber", String(filters.pageNumber || 1));
  params.append("pageSize", String(filters.pageSize || 9));

  return apiClient.get(`/advertisements/search?${params.toString()}`);
};
