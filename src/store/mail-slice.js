import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    inbox: [],
    outbox: [],
  },
  reducers: {
    send(state, action) {
      state.outbox.push(action.payload);
    },
    setInbox(state, action) {
      state.inbox = [...action.payload];
    },
    setOutbox(state, action) {
      state.outbox = [...action.payload];
    },
    updateReadReceipt(state, action) {
      const existingMail = state.inbox.find(
        (mail) => mail.id === action.payload
      );
      existingMail.read = true;
    },
    deleteMail(state, action) {
      state.inbox = state.inbox.filter((mail) => mail.id !== action.payload);
    },
    deleteOutboxMail(state, action) {
      state.outbox = state.outbox.filter((mail) => mail.id !== action.payload);
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
