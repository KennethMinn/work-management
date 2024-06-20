import{r as n,i as C,Z as x,j as s,z as k,o as F}from"./index-CdaNCSdy.js";const j={multiple:!1},v=n.forwardRef((o,l)=>{const{onChange:a,children:c,multiple:r,accept:u,name:i,form:p,resetRef:d,disabled:f,capture:h,inputProps:m,...g}=C("FileButton",j,o),t=n.useRef(),y=()=>{var e;!f&&((e=t.current)==null||e.click())},R=e=>{a(r?Array.from(e.currentTarget.files):e.currentTarget.files[0]||null)};return x(d,()=>{t.current.value=""}),s.jsxs(s.Fragment,{children:[c({onClick:y,...g}),s.jsx("input",{style:{display:"none"},type:"file",accept:u,multiple:r,onChange:R,ref:k(l,t),name:i,form:p,capture:h,...m})]})});v.displayName="@mantine/core/FileButton";/**
 * @license @tabler/icons-react v3.3.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var I=F("outline","cloud-upload","IconCloudUpload",[["path",{d:"M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1",key:"svg-0"}],["path",{d:"M9 15l3 -3l3 3",key:"svg-1"}],["path",{d:"M12 12l0 9",key:"svg-2"}]]);export{v as F,I};
