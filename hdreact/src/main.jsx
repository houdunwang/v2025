import App from "./App.jsx";
import { createRoot } from "./reactDom";
import React from "./react.js";

createRoot(document.querySelector("#root")).render(<App name="hd" />);

// function callback(deadline) {
//     console.log(deadline.timeRemaining());
//     //div->root   逻辑代码
//     requestIdleCallback(callback)
// }
// requestIdleCallback(callback)
