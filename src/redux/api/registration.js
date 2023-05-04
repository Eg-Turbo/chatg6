import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const registration = createApi({
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        registration: builder.mutation({
            query: (data) => ({
                url: `/api/v1/auth/registration/`,
                method: "post",
                body: data
            }),
        }),
    }),
});

export const { useRegistrationMutation } = registration