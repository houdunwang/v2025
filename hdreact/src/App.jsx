import React, { update } from "./react";

let a = 1;
function App() {
  const handle = () => {
    a++;
    update();
  };
  return (
    <div>
      <button id="app" onClick={handle}>
        houdunren - {a}
      </button>
      {a % 2 ? <div>奇数</div> : <p>偶数</p>}
    </div>
  );
}
//fiber diff
export default App;
