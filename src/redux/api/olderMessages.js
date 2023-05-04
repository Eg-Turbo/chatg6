import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const olderMessages = createApi({
    baseQuery: customBaseQuery,
    reducerPath: "olderMessages",
    endpoints: (builder) => ({
        olderMessages: builder.mutation({
            query: ({chatId, page}) => ({
                url: `api/v1/chat/messages/${chatId}/?p=${page}`,
                method:"get"
            }),
        }),
    }),
});

export const { useOlderMessagesMutation } = olderMessages