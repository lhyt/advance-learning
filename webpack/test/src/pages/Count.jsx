import React from 'react';
import s from '../../loaders/rawl!./1.txt';
import img from '../../loaders/file?mimetype=image!./1.png';

console.log(img, 'img');
// import LazyReactDom from "bundle-loader?lazy!react-dom";

// LazyReactDom(ReactDom => {
//   console.log(ReactDom, "ReactDom");
//   window.ReactDom = ReactDom;
// });

export default function S() {
  console.log(s, 'txt');
  return (
    <div>
      <h1>h1</h1>
      <img src={img} />
    </div>
  );
}
