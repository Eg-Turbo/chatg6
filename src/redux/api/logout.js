import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const logout = createApi({
    baseQuery: customBaseQuery,
    reducerPath: "logout",
    endpoints: (builder) => ({
        logout: builder.mutation({
            query: (data) => ({
                url: `api/v1/auth/logout/`,
                method: "post",
                body: data
            }),
        }),
    }),
});

export const { useLogoutMutation } = logout