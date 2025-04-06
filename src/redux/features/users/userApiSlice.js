import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["User"],
    }),
  }),
});

// Export the auto-generated hooks for these endpoints
export const { useGetUserQuery } = userApiSlice;
