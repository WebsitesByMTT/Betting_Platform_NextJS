import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notification: <any>[],
    isNotiFication: false,
    isSideBar: false,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action) {
            state.notification = action.payload;
        },
        setSocketNotification(state, action) {
            state.notification.unshift(action.payload);
        },
        setIsNotification(state, action) {
            state.isNotiFication = action.payload;
        },
        setIsSideBar(state, action) {
            state.isSideBar = action.payload;
        },
    }
},
);

export const { setNotification,setSocketNotification,setIsNotification,setIsSideBar } = notificationSlice.actions;

export default notificationSlice.reducer;
