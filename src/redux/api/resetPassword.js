import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const resetPassword = createApi({
    baseQuery: customBaseQuery,
    reducerPath: "resetPassword",
    endpoints: (builder) => ({
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `api/v1/auth/password/reset/confirm/`,
                method: "post",
                body: data
            }),
        }),
    }),
});

export const { useResetPasswordMutation } = resetPassword