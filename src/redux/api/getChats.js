import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const getChats = createApi({
    reducerPath: "getChats",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getChats: builder.query({
            query: () => ({
                url: `api/v1/chat/chatboxes/`,
                method: "get",
            }),

        }),
    }),
});


export const { useGetChatsQuery } = getChats