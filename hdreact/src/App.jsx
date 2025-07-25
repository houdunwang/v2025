import React, { useEffect, useState } from "./react";

function H3({ value }) {
  useEffect(() => {
    // console.log("useEffect.. h3");
  }, [value]);
  return <h3>h3-{value}</h3>;
}

function H4() {
  return <h4>h4</h4>;
}
function App() {
  const [value, setValue] = useState(1);
  const handle = () => {
    setValue((v) => v + 1);
  };

  useEffect(() => {
    // console.log("useEffect.. 1");
    return () => {
      console.log("clear 0");
    };
  }, []);

  useEffect(() => {
    // console.log("useEffect.. 1");
    return () => {
      console.log("clear 1");
    };
  }, [value]);

  useEffect(() => {
    // console.log("useEffect.. 2 ");

    return () => console.log("clear 2");
  }, [value]);
  return (
    <div>
      <button id="app" onClick={handle}>
        houdunren - {value}
      </button>
      {value % 2 ? <div id="houdunren">奇数</div> : <div id="hdcms">偶数</div>}
      <H3 value={value} />
      {/* {a % 2 ? <H3>奇数</H3> : <H4>偶数</H4>} */}
    </div>
  );
}
//fiber diff
export default App;
