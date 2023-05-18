import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const customBaseQuery = fetchBaseQuery({
    // baseUrl: `http://127.0.0.1:8000/`,
    baseUrl: `https://g6ai-backend.herokuapp.com/`,
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem("token")
        if (token) {
            headers.set('Authorization', `token ${token}`);
            // headers.set('Content-Disposition', 'attachment; filename="recording.webm"');

        }
        return headers;
    },
});