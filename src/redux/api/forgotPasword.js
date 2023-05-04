import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const forgotPassword = createApi({
    baseQuery: customBaseQuery,
    reducerPath: "forgotPassword",
    endpoints: (builder) => ({
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `api/v1/auth/password/reset/`,
                method: "post",
                body: data
            }),
        }),
    }),
});

export const { useForgotPasswordMutation } = forgotPassword