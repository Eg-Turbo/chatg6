import { createSlice } from '@reduxjs/toolkit';

export const deletedChat = createSlice({
    name: 'deletedChat',
    initialState: {},
    reducers: {
        changeDeletedChat: (state, action) => {
            return action.payload;
        },
    },
});

export const { changeDeletedChat } = deletedChat.actions;
export default deletedChat.reducer;