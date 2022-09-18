import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios"
import type { RootState } from '../../app/store'

interface IPost {
    userId: number;
    id: number;
    title: string;
    completed: boolean;

}

interface PostState {
    loading: boolean
    post: IPost
}

const post: IPost = {
    userId: 0,
    id: 0,
    title: '',
    completed: false
}

const initialState: PostState = {
    loading: false,
    post: post

}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPost>) => {
                state.loading = false
                state.post = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false
            })
    }
});



export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get<IPost>('https://jsonplaceholder.typicode.com/todos/1')
    return response.data
})


export const selectPost = (state: RootState) => state.posts


export default postSlice.reducer;
