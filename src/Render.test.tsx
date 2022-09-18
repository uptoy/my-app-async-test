import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

describe("Rendering", () => {
    test("Should render all the elements correctly", async () => {
        // レンダリングする
        render(<Render />);

        expect(screen.getByRole("heading")).toBeTruthy();　// h1タグが存在する
        expect(screen.getByRole("textbox")).toBeTruthy(); // inputタグが存在する
        expect(screen.getAllByRole("button")[0]).toBeTruthy();　// 「送信」のbuttonタグが存在する
        expect(screen.getAllByRole("button")[1]).toBeTruthy(); // 「キャンセル」のbuttonタグが存在する

        // テキストから検索
        // ない場合をテストするときはqueryByText
        expect(screen.queryByText("test")).toBeNull();

        // 非同期で取得したデータを検索
        expect(await screen.findByText("async data")).toBeTruthy();
    });
});