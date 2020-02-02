import React from "react";
import s from "../../loaders/rawl!./1.txt";
import img from "../../loaders/url?mimetype=image!./1.png";
import $ from "jquery";

console.log($);
$.Animation;
// import LazyReactDom from "bundle-loader?lazy!react-dom";

// LazyReactDom(ReactDom => {
//   console.log(ReactDom, "ReactDom");
//   window.ReactDom = ReactDom;
// });

export default function S() {
  console.log(s, "s");
  return (
    <div>
      <h1>h21</h1>66623 react5 c12pn1
      <img src={img} alt="" srcset="" />
    </div>
  );
}

// 前:
// 栈S;
// p= root;
// while(p || S不空){
//     while(p){
//         访问p节点；
//         p的右子树入S;
//         p = p的左子树;
//     }
//     p = S栈顶弹出;
// }

// 后:
// 栈S;
// p= root;
// while(p || S不空){
//     while(p){
//         访问p节点；
//         p的左子树入S;
//         p = p的右子树;
//     }
//     p = S栈顶弹出;
// }
// 结果序列逆序;

// 中：

// 栈S;
// p= root;
// while(p || S不空){
//     while(p){
//         p入S;
//         p = p的左子树;
//     }
//     p = S.top 出栈;
//     访问p;
//     p = p的右子树;
// }
