import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Post } from "./Post";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from '../../app/store';

// モックサーバーの設定
const server = setupServer(
    rest.get("https://jsonplaceholder.typicode.com/todos/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: true
        }), ctx.delay(150));
    })
);

// 最初に一回だけ実行される モックサーバーの起動
beforeAll(() => server.listen());


beforeEach(() => {
    render(
        <Provider store={store}>
            <Post />
        </Provider>
    );
});

afterEach(() => {
    // サーバーリセット
    server.resetHandlers();
    cleanup();
});

// 最後に一回だけ実行される モックサーバー終了
afterAll(() => server.close());


describe("Rendering", () => {
    test("initialState", () => {
        expect(screen.getByRole("postId").textContent).toBe('0')
        expect(screen.getByRole("userId").textContent).toBe('0')
        expect(screen.getByRole("title").textContent).toBe('')
        expect(screen.getByRole("completed").textContent).toBe('false')
    });
    test("getByRole", async () => {
        await waitFor(() => {
            expect(screen.getByRole("postId").textContent).toBe('1')
            expect(screen.getByRole("userId").textContent).toBe('1')
            expect(screen.getByRole("title").textContent).toBe('delectus aut autem')
            expect(screen.getByRole("completed").textContent).toBe('true')
        })
    });
    // test("findByText", async () => {
    //     await waitFor(() => {
    //         expect(screen.findByText("1")).toBeTruthy()
    //         expect(screen.findByText("false")).toBeTruthy()
    //         expect(screen.findByText("delectus aut autem")).toBeTruthy();
    //     })
    // });
});