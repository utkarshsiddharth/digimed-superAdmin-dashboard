import { UserAuthApi } from "./api/auth";
import { AdminApi } from "./api/admin";
import reducer from "./reducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  reducer: reducer,
  [UserAuthApi.reducerPath]: UserAuthApi.reducer,
  [AdminApi.reducerPath]: AdminApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAuthApi.middleware, AdminApi.middleware),
});

export default store;
