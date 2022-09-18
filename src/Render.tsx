import React from "react";
import { useQuery } from "react-query";

const Render = () => {
    const [value, setValue] = React.useState("");
    window.setTimeout(() => {
        setValue("async data");
    }, 1000);

    return (
        <div>
            <h1>サンプル</h1>
            <input type="text" />
            <button>送信</button>
            <button>キャンセル</button>
            <p>　ありがとうございmした。　</p>
            <p>{value}</p>
        </div>
    );
};

export default Render;