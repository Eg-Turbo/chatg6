import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie"
export const customBaseQuery = fetchBaseQuery({
    baseUrl: `https://g6ai-backend.herokuapp.com/`,
    prepareHeaders: (headers, { getState }) => {
        const token = Cookies.get("token")
        if (token) {
            headers.set('Authorization', `token ${token}`);
            // headers.set('Content-Disposition', 'attachment; filename="recording.webm"');

        }
        return headers;
    },
});