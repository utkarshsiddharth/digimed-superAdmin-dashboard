import { UserAuthApi } from "./api/auth";
import { SuperAdmin } from "./api/superAdmin";
import reducer from "./reducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  reducer: reducer,
  [UserAuthApi.reducerPath]: UserAuthApi.reducer,
  [SuperAdmin.reducerPath]: SuperAdmin.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAuthApi.middleware, SuperAdmin.middleware),
});

export default store;
