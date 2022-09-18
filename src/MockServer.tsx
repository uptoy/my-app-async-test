import React from "react";
import axios from "axios";

const MockServer = () => {
    const [clicked, setClicked] = React.useState(false);
    const [username, setUserName] = React.useState("");
    const [error, setError] = React.useState("");

    const fetchUser = async () => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
            const { username } = res.data;
            setUserName(username);
            setClicked(prevState => !prevState);
        } catch {
            setError("失敗しました。");
        }
    };
    const buttonText = clicked ? "取得しました" : "取得する";

    return (
        <div>
            <button onClick={fetchUser} disabled={clicked}>
                {buttonText}
            </button>
            {username && <h3>{username}</h3>}
            {error && <p data-testid="error">{error}</p>}
        </div>
    );
};

export default MockServer;