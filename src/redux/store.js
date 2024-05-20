import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import adminloginReducer from "./reducers/adminloginReducer";
import getProductsReducer from "./reducers/getProductsReducer";


const persistConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    product: getProductsReducer,
    adminCred: adminloginReducer
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