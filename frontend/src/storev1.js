import userReducer from "./reducers/user";
import cartReducer from "./reducers/cart";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
