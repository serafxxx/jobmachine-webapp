import {configureStore} from '@reduxjs/toolkit'
import web3Reducer from './web3Slice'
import apiReducer from './apiSlice'
import {asyncDispatchMiddleware} from "./middleware";
import {createLogger} from "redux-logger/src";

export default configureStore({
    reducer: {
        web3: web3Reducer,
        api: apiReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(asyncDispatchMiddleware)
        .concat(createLogger()
    )
})

