import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return action.payload;
    },
  },
});

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(clearNotification(null));
    }, duration * 1000);
  };
};

export const { showNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
