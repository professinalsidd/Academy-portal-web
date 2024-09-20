import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slice/auth/authSlice";

// Configuration for the persisted reducer
const persistConfig = {
  key: "auth",
  storage,
};

// Create a persisted reducer using persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});

// Persistor will be used for persisting the store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
