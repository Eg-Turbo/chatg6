import { createSlice } from '@reduxjs/toolkit';

export const activeChat = createSlice({
    name: 'activeChat',
    initialState: {},
    reducers: {
        changeActiveChat: (state, action) => {
            return action.payload;
        },
    },
});

export const { changeActiveChat } = activeChat.actions;
export default activeChat.reducer;