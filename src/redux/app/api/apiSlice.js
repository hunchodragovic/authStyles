import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    console.log(token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    console.log("Sending refresh token");
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult.data) {
      const { accessToken } = refreshResult.data;
      Cookies.set("accessToken", accessToken, { expires: 1 });
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error("Failed to refresh token:", refreshResult.error);
    }
  }
  return result;
};
export const apiSlice = createApi({
  baseQuery: baseQueryReauth,
  endpoints: () => ({}),
});
