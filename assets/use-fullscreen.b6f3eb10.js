import{r as v,H as F,w as f,I as p,J as x,v as y,x as h,i as b}from"./index.a8e2b611.js";let r=0;const E={fullscreen:Boolean,noRouteFullscreenExit:Boolean},g=["update:fullscreen","fullscreen"];function w(){const d=b(),{props:u,emit:m,proxy:e}=d;let n,o,c;const l=v(!1);F(d)===!0&&f(()=>e.$route.fullPath,()=>{u.noRouteFullscreenExit!==!0&&t()}),f(()=>u.fullscreen,s=>{l.value!==s&&a()}),f(l,s=>{m("update:fullscreen",s),m("fullscreen",s)});function a(){l.value===!0?t():i()}function i(){l.value!==!0&&(l.value=!0,c=e.$el.parentNode,c.replaceChild(o,e.$el),document.body.appendChild(e.$el),r++,r===1&&document.body.classList.add("q-body--fullscreen-mixin"),n={handler:t},p.add(n))}function t(){l.value===!0&&(n!==void 0&&(p.remove(n),n=void 0),c.replaceChild(e.$el,o),l.value=!1,r=Math.max(0,r-1),r===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),e.$el.scrollIntoView!==void 0&&setTimeout(()=>{e.$el.scrollIntoView()})))}return x(()=>{o=document.createElement("span")}),y(()=>{u.fullscreen===!0&&i()}),h(t),Object.assign(e,{toggleFullscreen:a,setFullscreen:i,exitFullscreen:t}),{inFullscreen:l,toggleFullscreen:a}}export{g as a,w as b,E as u};
