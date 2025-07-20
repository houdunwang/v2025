import React, { useState } from "./react";

function H3() {
  return <h3>h3</h3>;
}

function H4() {
  return <h4>h4</h4>;
}
function App() {
  const [value, setValue] = useState(1);
  const handle = () => {
    setValue((v) => v + 1);
  };
  return (
    <div>
      <button id="app" onClick={handle}>
        houdunren - {value}
      </button>
      {value % 2 ? <div id="houdunren">奇数</div> : <div id="hdcms">偶数</div>}
      {/* {a % 2 ? <H3>奇数</H3> : <H4>偶数</H4>} */}
    </div>
  );
}
//fiber diff
export default App;
