import React from "react";

const RenderInput = ({ output }: any) => {
    const [input, setInput] = React.useState("");
    const outputValue = () => {
        if (input) {
            // outputConsole(input);
        }
    };
    const updateValue = (e: any) => {
        output()
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Enter"
                value={input}
                onChange={updateValue}
            />
            <button onClick={outputValue}>アウトプット</button>
        </div>
    );
};

export default RenderInput;