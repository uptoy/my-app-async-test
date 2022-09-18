import React from 'react';
import { Counter } from './features/counter/Counter';
import { Custom } from './features/custom/Custom';
import { Post } from './features/post/Post';

function App() {
  return (
    <div className="App">
      <a
      >
        Learn React
      </a>
      {/* <Counter />
      <Custom /> */}
      <Post />
    </div>
  );
}

export default App;
