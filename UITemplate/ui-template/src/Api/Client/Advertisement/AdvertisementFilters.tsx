import { GET_FILTERS } from "../../../Configuration/ApiEndpointUri/User/UserUri";
import apiClient from "../ApiClient";

export const getFilters = async () => {
  const url = GET_FILTERS;
  return apiClient.get(url);
};
