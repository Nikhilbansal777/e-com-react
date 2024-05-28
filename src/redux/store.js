import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import adminDashboardReducer from "./reducers/adminDashboardReducer";
import adminloginReducer from "./reducers/adminloginReducer";
import getProductsReducer from "./reducers/getProductsReducer";
import userSigninReducer from "./reducers/userSigninReducer";
import userSignupReducer from "./reducers/userSignupReducer";


const persistConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    product: getProductsReducer,
    adminCred: adminloginReducer,
    signup: userSignupReducer,
    signin: userSigninReducer,
    admin: adminDashboardReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});