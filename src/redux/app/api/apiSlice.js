import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});
