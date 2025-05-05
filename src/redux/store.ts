import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import jobReducer from "./slice/jobSlide";
import userReducer from "./slice/userSlide";
import roleReducer from "./slice/roleSlide";
import resumeReducer from "./slice/resumeSlide";
import accountReducer from "./slice/accountSlide";
import companyReducer from "./slice/companySlide";
import permissionReducer from "./slice/permissionSlide";

const persistConfig = {
    key: "account",
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, accountReducer);

export const store = configureStore({
    reducer: {
        account: persistedReducer,
        company: companyReducer,
        user: userReducer,
        job: jobReducer,
        resume: resumeReducer,
        permission: permissionReducer,
        role: roleReducer,
    },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
