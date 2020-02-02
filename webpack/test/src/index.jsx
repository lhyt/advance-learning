import React from "react";
// import ReactDom from "react-dom";
import S from "@/Count";
import LazyReactDom from "../loaders/bundle!react-dom";
import a from "./a";

console.log(a());

// require.ensure([], require => {
//   const ReactDom = require("react-dom");
//   console.log(ReactDom, "ReactDom");
//   ReactDom.render(<S />, document.getElementById("root"));
// });
setTimeout(() => {
  LazyReactDom(r => {
    r.then(({ default: ReactDom }) => {
      console.log(ReactDom, "ReactDom");
      window.ReactDom = ReactDom;
      ReactDom.render(<S />, document.getElementById("root"));
    });
  });
}, 1000);
