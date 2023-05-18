import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery/baseQuery"

export const getMessages = createApi({
    reducerPath: "getMessages",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (data) => {

                if (data) {
                    return {
                        url: `api/v1/chat/messages/${data.id}/`,
                        method: "get",
                    }
                }
            },

        }),
    }),
});


export const { useGetMessagesQuery } = getMessages