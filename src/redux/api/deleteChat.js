import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const deleteChat = createApi({
    baseQuery: customBaseQuery,
    reducerPath: "deleteChat",
    endpoints: (builder) => ({
        deleteChat: builder.mutation({
            query: (data) => ({
                url: `api/v1/chat/chatboxes/${data}/`,
                method: "delete",
            }),
        }),
    }),
});

export const { useDeleteChatMutation } = deleteChat