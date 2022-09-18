import React from "react";
import {
    selectCustom,
    increment,
    decrement,
    incrementByAmount,
    incrementAsync
} from "./slice";
import { useAppSelector, useAppDispatch } from '../../app/hooks'

export const Custom = () => {
    const [number, setNumber] = React.useState(0);
    const count = useAppSelector(selectCustom)
    const dispatch = useAppDispatch()

    return (
        <div>
            <div>
                custom
                <button onClick={() => dispatch(increment())}>+</button>
                <span data-testid="count-value">{count}</span>
                {/* 1マイナス */}
                <button onClick={() => dispatch(decrement())}>-</button>
                {/* 入力値分プラス (numberが無効な値のとき0で実行)*/}
                <button onClick={() => dispatch(incrementByAmount(number | 0))}>
                    値を追加
                </button>
                <input
                    type="text"
                    placeholder="Enter"
                    value={number}
                    onChange={(e) => setNumber(Number(e.target.value))}
                    date-testid="input"
                />
                <button
                    onClick={() => dispatch(incrementAsync(Number(number) || 0))}
                >
                    Add Async
                </button>
            </div>
        </div >
    );
};