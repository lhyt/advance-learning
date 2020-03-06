import React from 'react';
import s from '../../loaders/rawl!./1.txt';
import img from '../../loaders/url?mimetype=image!./1.png';
import $ from 'jquery';

console.log($);
$.Animation;

console.log(NICE_FEATURE, 'NICE_FEATURE');
console.log(qq, 'qq');
// import LazyReactDom from "bundle-loader?lazy!react-dom";

// LazyReactDom(ReactDom => {
//   console.log(ReactDom, "ReactDom");
//   window.ReactDom = ReactDom;
// });

export default function S() {
  console.log(s, 's');
  return (
    <div>
      <h1>h21</h1>66623 react5 c12pn1
      <img src={img} />
    </div>
  );
}
