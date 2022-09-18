import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import type { RootState } from '../../app/store'

export const customCounterSlice = createSlice({
    name: "customCounter",
    initialState: {
        // 数によって計算処理の方法を変える
        mode: 0,
        // 計算値
        value: 0,
    },
    reducers: {
        increment: (state) => {
            switch (state.mode) {
                case 0:
                    state.value += 1;
                    break;
                case 1:
                    state.value += 100;
                    break;
                case 2:
                    state.value += 10000;
                    break;
                default:
                    break;
            }
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            switch (state.mode) {
                case 0:
                    state.value += action.payload;
                    break;
                case 1:
                    state.value += 100 * action.payload;
                    break;
                case 2:
                    state.value += 10000 * action.payload;
                    break;
                default:
                    break;
            }
        },
    },
    extraReducers:{

    }
});

export const { increment, decrement, incrementByAmount } =
    customCounterSlice.actions;


export const incrementAsync = (amount: number) => (dispatch: Dispatch<any>) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount))
    }, 1000)
}

export const selectCustom = (state: RootState) => state.custom.value


export default customCounterSlice.reducer;