import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const login = createApi({
    baseQuery: customBaseQuery,
    reducerPath: "login",
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `api/v1/auth/login/`,
                method: "post",
                body: data
            }),
        }),
    }),
});

export const { useLoginMutation } = login