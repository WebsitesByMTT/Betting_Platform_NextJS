import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notification: <any>[],
    isNotiFication: false,
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

        setOpenNotification(state, action) {
            state.isNotiFication = action.payload;
        }
    }
},
);

export const { setNotification,setSocketNotification,setOpenNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
