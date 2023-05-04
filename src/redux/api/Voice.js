import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const voice = createApi({
    baseQuery: customBaseQuery,
    reducerPath: "voice",
    endpoints: (builder) => ({
        voice: builder.mutation({
            query: (data) => ({
                url: `api/v1/chat/voice/`,
                method: "post",
                body: data,
                // headers:{'Content-Disposition':'attachment; filename="recording.webm"'}
            }),
        }),
    }),
});

export const { useVoiceMutation } = voice