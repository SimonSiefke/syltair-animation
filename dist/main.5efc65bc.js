!function(t){function e(e){for(var r,s,c=e[0],i=e[1],l=e[2],f=0,d=[];f<c.length;f++)s=c[f],o[s]&&d.push(o[s][0]),o[s]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);for(u&&u(e);d.length;)d.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,c=1;c<n.length;c++){var i=n[c];0!==o[i]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={1:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var c=window.webpackJsonp=window.webpackJsonp||[],i=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=i;a.push([33,0]),n()}({11:function(t,e,n){"use strict";n.r(e);var r=n(3),o=n(9),a=n(10),s=n.n(a);function c(t,e){const n=function(t){const e=document.createElement("html");return e.innerHTML=t,e.querySelector("svg")}(e);if(null!==t.parenNode)return t.parentNode.replaceChild(n,t),n;throw new Error("cannot replace html element")}async function i(t){if(t.src.match(/.*\.svg$/)){const{data:e}=await s.a.get(t.src);return c(t,e)}throw new Error("cannot animate non-svg image")}function l(t){const e=function(t){const e=parseFloat(t.getAttribute("r"));return 2*Math.PI*e}(t);t.style["stroke-dasharray"]=e,t.style["stroke-dashoffset"]=e}async function u(t,e){return r(t).animate({"stroke-dashoffset":0},2*e).promise()}function f(t){return 2*t}function d(t){const e=t.getTotalLength()+1,n=f(e);t.style["stroke-dasharray"]=e,t.style["stroke-dashoffset"]=e+n+1}async function p(t,e,n,o){return t.style["stroke-dashoffset"]=n,r(t).animate({"stroke-dashoffset":e},2*o).promise()}async function y({travelLine:t,reversed:e=!1,bothWays:n=!1,travelLineAnimationTime:r}){const o=t.getTotalLength()+1,a=f(o),s=-o+a,c=o+a+1;e?(await p(t,c,s,r),n&&await p(t,s,c,r)):(await p(t,s,c,r),n&&await p(t,c,s,r))}function h(t){const e=new o.a;e.add("startTravelCircles");const n=Array.from(t.querySelectorAll(".travel-circle"));n.forEach(l),e.add(()=>{for(const t of n)u(t,1/1.5*2e3)});e.add("startTravelLines");const r=Array.from(t.querySelectorAll(".travel-line"));r.forEach(d),e.add(()=>{!async function(t,e){for(;;)for(const n of t){const t=n.classList.contains("reverse"),r=n.classList.contains("bothways");await y({travelLine:n,reversed:t,bothWays:r,travelLineAnimationTime:e})}}(r,3e3)},1/1.5*2e3/1e3)}!async function(){(await async function(){const t=Array.from(document.querySelectorAll("img")).filter(t=>t.classList.contains("animatable")).map(i);return Promise.all(t)}()).forEach(h)}()},33:function(t,e,n){t.exports=n(11)}});
//# sourceMappingURL=main.5efc65bc.js.map