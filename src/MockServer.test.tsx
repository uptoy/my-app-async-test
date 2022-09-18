import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import MockServer from "./MockServer";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

// モックサーバーの設定
const server = setupServer(
    rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
    })
);

// 最初に一回だけ実行される モックサーバーの起動
beforeAll(() => server.listen());

afterEach(() => {
    // サーバーリセット
    server.resetHandlers();
    cleanup();
});

// 最後に一回だけ実行される モックサーバー終了
afterAll(() => server.close());

describe("Mock APIのテスト", () => {
    test("成功時のテスト", async () => {
        render(<MockServer />);

        const user = userEvent.setup();
        await user.click(screen.getByRole("button"));

        expect(await screen.findByText("Bred dummy")).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveAttribute("disabled");
    });

    test("リクエスト失敗時は、エラーが表示される", async () => {
        // サーバーのレスポンスを書き換える(useを使うことで、ここの中だけで有効)
        server.use(
            rest.get(
                "https://jsonplaceholder.typicode.com/users/1",
                (req, res, ctx) => {
                    return res(ctx.status(404));
                }
            )
        );

        render(<MockServer />);

        const user = userEvent.setup();
        await user.click(screen.getByRole("button"));

        expect(await screen.findByTestId("error")).toHaveTextContent(
            "失敗しました。"
        );

        expect(screen.queryByRole("heading")).toBeNull();

        expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
    });
});