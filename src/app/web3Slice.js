import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Web3 from "web3";
import {useDispatch} from "react-redux";
import {fetchMe} from "./apiSlice";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");


export const getAccounts = createAsyncThunk('web3/getAccounts', async () => {
    return await web3.eth.getAccounts();
})

export const requestAccounts = createAsyncThunk('web3/requestAccounts', async () => {
    return await web3.eth.requestAccounts();
})

export const web3Slice = createSlice({
    name: 'web3',
    initialState: {
        accounts: [],
        walletMessage: "Connect Wallet"
    },

    reducers: {

        // testt(state, action){
        //     state.test = "!!!";
        // }
    },

    extraReducers: builder => {
        // const dispatch = useDispatch();
        builder
        .addCase(getAccounts.fulfilled, (state, action)=>{
            state.accounts = action.payload;
            action.asyncDispatch(fetchMe());
        })
        .addCase(requestAccounts.pending, (state, action)=>{
            state.walletMessage = "Sending request to your wallet";
        })
        .addCase(requestAccounts.fulfilled, (state, action)=>{
            state.walletMessage = "Connect Wallet";
            state.accounts = action.payload;
            action.asyncDispatch(fetchMe());
        })
        .addCase(requestAccounts.rejected, (state, action)=>{
            state.walletMessage = "Wallet request rejected"
            state.accounts = action.payload;
        })
    }
});

export const {web3Init} = web3Slice.actions
export default web3Slice.reducer