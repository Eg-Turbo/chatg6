import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const addChat = createApi({
    baseQuery: customBaseQuery,
    reducerPath: "addChat",
    endpoints: (builder) => ({
        addChat: builder.mutation({
            query: (data) => ({
                url: `api/v1/chat/chatboxes/`,
                method: "post",
                body: data
            }),
        }),
    }),
});

export const { useAddChatMutation } = addChat