import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'


export const fetchMe = createAsyncThunk('api/fetchMe', async () => {
    return await {
        id: "myid",
        first_name: "S"
    };
})


export const apiSlice = createSlice({
    name: 'api',
    initialState: {
        me: null,
    },

    reducers: {
        // testt(state, action){
        //     state.test = "!!!";
        // }
    },

    extraReducers: builder => {
        builder
        .addCase(fetchMe.fulfilled, (state, action)=>{
            state.me = action.payload;
        })
        // .addCase(fetchMe.pending, (state, action)=>{
        // })
        // .addCase(fetchMe.rejected, (state, action)=>{
        //     // console.log("fetchMe.rejected");
        //     // state.walletMessage = "Wallet request rejected"
        //     // state.accounts = action.payload;
        // })
    }
});

// export const {web3Init} = web3Slice.actions
export default apiSlice.reducer