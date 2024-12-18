import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import mailReducer from "./mail-slice";
import themeReducer from "./theme-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mail: mailReducer,
    theme: themeReducer,
  },
});

export default store;
