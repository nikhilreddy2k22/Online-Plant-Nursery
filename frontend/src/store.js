// src/redux/persist.js
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/user";
import cartReducer from "./reducers/cart";

const persistConfig = {
  key: "root",
  storage,

  // Optionally, you can whitelist specific reducers to be persisted
  // whitelist: ["user", "cart"]
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const resetOnRestartMiddleware = () => (store) => (next) => (action) => {
//   if (action.type === "APP_RESTART") {
//     store.dispatch({ type: "redux-persist/PURGE" }); // Clear persisted state
//   }
//   return next(action);
// };

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// export default const store = configureStore({
//   reducer: {
//     user: userReducer,
//     cart: cartReducer,
//   },
// });
