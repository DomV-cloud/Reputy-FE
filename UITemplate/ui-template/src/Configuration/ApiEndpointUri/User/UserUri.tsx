import { API_BASE_URL, API_BASE_USER_URL } from "../../apiConstants";

export const GET_USER_ADVERTISEMENT =
  API_BASE_URL + API_BASE_USER_URL + "/advertisement";

export const GET_ALL_ADVERTISEMENTS = API_BASE_URL + "advertisement";

export const GET_FILTERS = API_BASE_URL + "advertisement/filter";

export const GET_ADVERTISEMENT_DETAIL =
  API_BASE_URL + "advertisement/{advertisementId}";
