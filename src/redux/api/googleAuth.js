import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const googleAuth = createApi({
    baseQuery: customBaseQuery,
    reducerPath: "googleAuth",
    endpoints: (builder) => ({
        googleAuth: builder.mutation({
            query: (data) => ({
                url: `api/v1/auth/google/`,
                method: "post",
                body: data
            }),
        }),
    }),
});

export const { useGoogleAuthMutation } = googleAuth