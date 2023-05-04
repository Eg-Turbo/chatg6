import { configureStore } from "@reduxjs/toolkit";
import { login } from "./api/login"
import { registration } from "./api/registration"
import { forgotPassword } from "./api/forgotPasword"
import { resetPassword } from "./api/resetPassword"
import { googleAuth } from "./api/googleAuth"
import { changePassword } from "./api/changePassword"
import { getChats } from "./api/getChats"
import activeChat from "./slices/activeChat"
import deletedChatSlice from "./slices/deletedChat"
import { deleteChat } from "./api/deleteChat"
import { addChat } from "./api/addChat"
import { getMessages } from "./api/getMessages"
import {voice} from "./api/Voice"
import {olderMessages} from "./api/olderMessages"
const store = configureStore({
  reducer: {
    [login.reducerPath]: login.reducer,
    [registration.reducerPath]: registration.reducer,
    [forgotPassword.reducerPath]: forgotPassword.reducer,
    [resetPassword.reducerPath]: resetPassword.reducer,
    [googleAuth.reducerPath]: googleAuth.reducer,
    [changePassword.reducerPath]: changePassword.reducer,
    [getChats.reducerPath]: getChats.reducer,
    [deleteChat.reducerPath]: deleteChat.reducer,
    [addChat.reducerPath]: addChat.reducer,
    [getMessages.reducerPath]: getMessages.reducer,
    [voice.reducerPath] : voice.reducer,
    [olderMessages.reducerPath] : olderMessages.reducer,
    activeChat: activeChat,
    deletedChat: deletedChatSlice,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(login.middleware, registration.middleware, forgotPassword.middleware, resetPassword.middleware, googleAuth.middleware, changePassword.middleware, getChats.middleware, deleteChat.middleware, addChat.middleware, getMessages.middleware,voice.middleware,olderMessages.middleware
    ) // add middleware
});

export default store;
