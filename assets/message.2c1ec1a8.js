import{A as S,at as B,r as y,aw as D,B as r,au as o,E as l,D as s,ax as E,az as I,av as _,aF as F,aH as c,S as N,C as d,ao as R,an as m,aI as T,G as g,aJ as f,aC as u,aK as i,aB as q,aL as p,aG as L}from"./index.a8e2b611.js";import{Q as U}from"./QSeparator.55c1b1c5.js";import{Q as V}from"./QScrollArea.e82ce9d4.js";import{d as h}from"./dateTime.5a2c27ae.js";import"./touch.70a9dd44.js";const b={class:"q-gutter-none full-height full-width"},G=["src"],z={class:"text-weight-bold"},W=S({__name:"message",emits:["emitChildren"],setup(H,{expose:C,emit:v}){const M=B();let t=y([]);function k(a){v("emitChildren",{functionName:"selectContact",data:a}),t.value.forEach(e=>{e.friendUsername===a.friendUsername&&(e.unReadMessageCount=0)})}D.get("/v1/chat/chat/contacts/"+M.getUsername()).then(a=>{a.data.code==="00000"&&a.data.result&&(t.value=a.data.result)});function w(a,n){E.info("\u60A8\u6709\u4E00\u6761\u672A\u8BFB\u6D88\u606F"),t.value.forEach(e=>{e.contactId===a&&(e.unReadMessageCount+=1,e.lastMessage=n,e.lastSendAlias=e.remark,e.lastContactDateTime=h.now("hh:mm"))}),console.log(t.value)}function x(a,n){t.value.forEach(e=>{e.contactId===a&&(e.lastMessage=n,e.lastSendAlias=e.remark,e.lastContactDateTime=h.now("hh:mm"))}),console.log(t.value)}function A(a,n){t.value.forEach(e=>{e.contactId===a&&(e.lastMessage=n,e.lastSendAlias="\u6211",e.lastContactDateTime=h.now("hh:mm"))})}return C({receiveMessageNoCurrent:w,sendMessageCurrent:A,receiveMessageCurrent:x}),(a,n)=>(r(),o("div",b,[l(V,{class:"full-width full-height q-pa-xs"},{default:s(()=>[l(I,{class:"full-height full-width"},{default:s(()=>[(r(!0),o(_,null,F(c(t),(e,Q)=>(r(),o(_,null,[N((r(),d(R,{class:"q-py-md q-mx-auto full-width",clickable:"",onClick:J=>k(e)},{default:s(()=>[l(m,{avatar:""},{default:s(()=>[l(T,null,{default:s(()=>[g("img",{src:e.avatar,alt:""},null,8,G)]),_:2},1024)]),_:2},1024),l(m,null,{default:s(()=>[l(f,{lines:"1"},{default:s(()=>[u(i(e.remark),1)]),_:2},1024),l(f,{caption:"",lines:"2",style:{"min-height":"29px"}},{default:s(()=>[g("span",z,i(e.lastSendAlias),1),u(" \uFF1A"+i(e.lastMessage),1)]),_:2},1024)]),_:2},1024),l(m,{side:"",top:""},{default:s(()=>[l(f,{caption:""},{default:s(()=>[u(i(e.lastContactDateTime),1)]),_:2},1024),e.unReadMessageCount!==0?(r(),d(q,{key:0,rounded:"",color:"red",class:"q-mt-xs"},{default:s(()=>[u(i(e.unReadMessageCount>99?"99+":e.unReadMessageCount),1)]),_:2},1024)):p("",!0)]),_:2},1024)]),_:2},1032,["onClick"])),[[L]]),Q!==c(t).length-1?(r(),d(U,{key:0,inset:"item"})):p("",!0)],64))),256))]),_:1})]),_:1})]))}});export{W as default};
