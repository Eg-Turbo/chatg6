import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const changePassword = createApi({
    baseQuery: customBaseQuery,
    reducerPath: "changePassword",
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: (data) => ({
                url: `api/v1/auth/password/change/`,
                method: "post",
                body: data
            }),
        }),
    }),
});

export const { useChangePasswordMutation } = changePassword