import{w,i as b,k as R,j as c,B as g,m as G,E as B,p as k,U as D,v as E,A as L,D as U}from"./index-DIqu7q72.js";import{L as $}from"./Button-D4AVOSMh.js";var l={root:"m_8d3f4000",icon:"m_8d3afb97",loader:"m_302b9fb1",group:"m_1a0f1b21"};const z={orientation:"horizontal"},F=G((o,{borderWidth:e})=>({group:{"--ai-border-width":B(e)}})),h=w((o,e)=>{const t=b("ActionIconGroup",z,o),{className:s,style:n,classNames:r,styles:d,unstyled:a,orientation:p,vars:i,borderWidth:f,variant:m,mod:x,...I}=b("ActionIconGroup",z,o),u=R({name:"ActionIconGroup",props:t,classes:l,className:s,style:n,classNames:r,styles:d,unstyled:a,vars:i,varsResolver:F,rootSelector:"group"});return c.jsx(g,{...u("group"),ref:e,variant:m,mod:[{"data-orientation":p},x],role:"group",...I})});h.classes=l;h.displayName="@mantine/core/ActionIconGroup";const T={},V=G((o,{size:e,radius:t,variant:s,gradient:n,color:r,autoContrast:d})=>{const a=o.variantColorResolver({color:r||o.primaryColor,theme:o,gradient:n,variant:s||"filled",autoContrast:d});return{root:{"--ai-size":L(e,"ai-size"),"--ai-radius":t===void 0?void 0:U(t),"--ai-bg":r||s?a.background:void 0,"--ai-hover":r||s?a.hover:void 0,"--ai-hover-color":r||s?a.hoverColor:void 0,"--ai-color":a.color,"--ai-bd":r||s?a.border:void 0}}}),A=k((o,e)=>{const t=b("ActionIcon",T,o),{className:s,unstyled:n,variant:r,classNames:d,styles:a,style:p,loading:i,loaderProps:f,size:m,color:x,radius:I,__staticSelector:u,gradient:W,vars:N,children:S,disabled:v,"data-disabled":j,autoContrast:q,mod:_,...C}=t,y=R({name:["ActionIcon",u],props:t,className:s,style:p,classes:l,classNames:d,styles:a,unstyled:n,vars:N,varsResolver:V});return c.jsxs(D,{...y("root",{active:!v&&!i&&!j}),...C,unstyled:n,variant:r,size:m,disabled:v||i,ref:e,mod:[{loading:i,disabled:v||j},_],children:[c.jsx(E,{mounted:!!i,transition:"slide-down",duration:150,children:P=>c.jsx(g,{component:"span",...y("loader",{style:P}),"aria-hidden":!0,children:c.jsx($,{color:"var(--ai-color)",size:"calc(var(--ai-size) * 0.55)",...f})})}),c.jsx(g,{component:"span",mod:{loading:i},...y("icon"),children:S})]})});A.classes=l;A.displayName="@mantine/core/ActionIcon";A.Group=h;export{A};
