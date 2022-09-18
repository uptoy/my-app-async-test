import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { Custom } from "./Custom";
import { store } from '../../app/store';

afterEach(() => {
    cleanup();
});

describe("ストアのテスト", () => {
    test("「＋」を3回押すとカウントは3になる", async () => {
        render(
            <Provider store={store}>
                <Custom />
            </Provider>
        );
        await userEvent.click(screen.getByText("+"));
        await userEvent.click(screen.getByText("+"));
        await userEvent.click(screen.getByText("+"));
        expect(screen.getByTestId("count-value")).toHaveTextContent('3');
    });
    test("入力要素に値50を直接代入し、ボタンを押したらカウント50になる", async () => {
        render(
            <Provider store={store}>
                <Custom />
            </Provider>
        );
        await userEvent.type(screen.getByPlaceholderText("Enter"), "50");
        await userEvent.click(screen.getByText("値を追加"));
        expect(screen.getByTestId("count-value")).toHaveTextContent('53');
    });
});