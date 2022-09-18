import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RenderInput from "./RenderInput";

// テスト後に行ってくれる処理
// テストを行うと前のテスト結果が残ってしまうことがあるので、clenup()でアンマウントさせる
afterEach(() => cleanup());

describe("入力要素のテスト", () => {
    test("ユーザが入力すると、input要素のvalueがそれに応じて、更新される", async () => {
        render(<RenderInput output={jest.fn()} />);
        const inputValue = screen.getByPlaceholderText("Enter") as HTMLInputElement;
        const user = userEvent.setup();
        // ユーザータイピングイベント「test」を入力
        await user.type(inputValue, "test");
        expect(inputValue.value).toBe("");
    });
});
describe("ボタンを押した時のテスト", () => {
    test("テキストに何も入力せず、ボタンを押してもoutput関数は呼ばれない", async () => {
        const output = jest.fn();
        render(<RenderInput output={output} />);

        const user = userEvent.setup();
        await user.click(screen.getByRole("button"));
        // 未入力のとき呼び出されない
        expect(output).not.toHaveBeenCalled();
    });
    test("テキスト入力状態でボタンを押すと関数が1回よばれる", async () => {
        const output = jest.fn();
        render(<RenderInput output={output} />);
        const inputValue = screen.getByPlaceholderText("Enter");

        const user = userEvent.setup();
        await user.type(inputValue, "test");
        await user.click(screen.getByRole("button"));
        expect(output).toHaveBeenCalledTimes(4);
    });
});