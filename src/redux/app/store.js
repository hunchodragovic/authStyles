import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {}, // Add your reducers here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.VITE_NODE_ENV === "development",
});
