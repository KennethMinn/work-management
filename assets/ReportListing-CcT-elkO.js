import{o as Se,d as ie,a as ce,r as l,j as e,B as E,F as w,T as I,L as ke,G as B,I as be,e as O,_ as V,s as we}from"./index-DIqu7q72.js";import{A as Re,D as Ce}from"./AlertModal-Ccb7kj30.js";import{u as de,b as ue,a as ve,t as Te,c as De,M as Ue,C as _,I as pe}from"./index-DAvzNLjh.js";import{u as he,a as F}from"./axiosInstance-BMsWOdQC.js";import{u as Pe,r as qe,S as Ie}from"./useReportTime-BPYkap4V.js";import{u as Ee}from"./useGetAllCustomers-BfXtCVT0.js";import{a as Fe,D as K,d as W}from"./useGetAllProjects-zGd9NkkP.js";import{u as Le,g as Qe}from"./useGetAllTasks-DwM0970k.js";import{S as Ye}from"./Stack-DooxEDXA.js";import{S as q}from"./Select-D8o9Upw1.js";import{T as Me,b as Ae,c,N as le}from"./TimeInput-PerNW5ob.js";import{A as ze}from"./ActionIcon-Cc4xhhVc.js";import{F as G,I as $}from"./IconCloudUpload-D9tV3C0-.js";import{B as S}from"./Button-D4AVOSMh.js";import{I as Ne}from"./IconEdit-B6zeteLb.js";import{B as Be}from"./Badge-D1lku8By.js";/**
 * @license @tabler/icons-react v3.3.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ge=Se("outline","refresh","IconRefresh",[["path",{d:"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4",key:"svg-0"}],["path",{d:"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4",key:"svg-1"}]]);const $e=a=>{const s=ie();return he({mutationFn:async u=>{await F.post(`/reports-update/${a}`,u)},onSuccess:()=>{s.invalidateQueries(["reports"])}})},Oe=a=>de({queryKey:["report",a],queryFn:async()=>await(await F.get(`/reports?id=${a}`)).data.report,enabled:!!a}),Ve=({id:a})=>{var ae;const[s,{open:u,close:i}]=ue(!1),{user:x}=ce(),{data:j}=Ee(),{data:f}=Fe(),{data:R}=Le(),{mutate:L,isPending:k}=$e(a),{data:r}=Oe(a),[C,J]=l.useState([]),[H,X]=l.useState({}),[Z,ee]=l.useState({}),[T,Q]=l.useState(null),[te,Y]=l.useState(null),[se,M]=l.useState(null),[b,A]=l.useState(null),[m,z]=l.useState(null),[v,N]=l.useState(null),D=l.useRef(null),U=l.useRef(null),{refReportTime:me,pickerControlReportTime:xe}=Pe(),je=()=>{A(null),Q(null)},re=()=>{var t;z(null),(t=U.current)==null||t.call(U)},ge=()=>{var t;N(null),(t=D.current)==null||t.call(D)},oe=(t,o,n)=>{J(h=>h.map(d=>d.id===t?{...d,taken_qty:o,returned_qty:n}:d))};l.useEffect(()=>{b&&Q(b==null?void 0:b.name)},[b]),l.useEffect(()=>{if(v){const t=URL.createObjectURL(v);return Y(t),()=>URL.revokeObjectURL(t)}else Y(null)},[v]),l.useEffect(()=>{if(m){if(m.size>1e7){re();return}const t=URL.createObjectURL(m);return M(t),()=>URL.revokeObjectURL(t)}else M(null)},[m]);const{control:g,register:fe,handleSubmit:ye,setValue:p,formState:{errors:y}}=ve({resolver:Te(qe)}),_e=t=>{const o=r!=null&&r.task.shootingData?{shooting_accessories:JSON.stringify(C.map(d=>({accessory_name:d.accessory_name,required_qty:d.required_qty,taken_qty:d.taken_qty,returned_qty:d.returned_qty})))}:{},n={...t,report_date:W(t.report_date).format("YYYY-MM-DD"),attachment_path:b,photo_path:v,video_path:m,user_id:x==null?void 0:x.id,...o},h=new FormData;for(const d in n)h.append(d,n[d]);L(h,{onSuccess:()=>{i(),z(null),A(null),N(null),V.success("Report updated successfully.")},onError:()=>{V.error("Something went wrong.")}})};l.useEffect(()=>{var t,o,n;if(r&&(p("customer_id",r.task.customer_id.toString()),p("project_id",r.task.project_id.toString()),p("assigned_task_id",r.task.id.toString()),p("status",r.task.status),p("progress",r.progress),p("progress_description",r.progress_description),Y(r.imageUrl.includes("null")?null:r.imageUrl),M(r.videoUrl.includes("null")?null:r.videoUrl),Q(r.documentUrl.includes("null")?null:r.documentUrl),p("report_date",new Date(r.report_date)),p("report_time",r.report_time),(t=r.task.shootingData)!=null&&t.shooting_accessories)){J((o=r.task.shootingData)==null?void 0:o.shooting_accessories);const h={},d={};(n=r.task.shootingData)==null||n.shooting_accessories.forEach(P=>{h[P.id]=P.taken_qty,d[P.id]=P.returned_qty}),X(h),ee(d)}},[p,r]);const ne=De({control:g,name:"progress"});return l.useEffect(()=>{ne===100&&p("status","done")},[ne,p]),e.jsxs(E,{children:[e.jsx(Ue,{size:600,opened:s,onClose:i,title:"Edit Report Task Form",centered:!0,styles:{title:{fontSize:"20px",fontWeight:600}},children:e.jsx(E,{my:10,children:e.jsxs("form",{onSubmit:ye(_e),children:[e.jsxs(Ye,{children:[e.jsx(_,{name:"assigned_task_id",control:g,render:({field:t})=>{var o;return e.jsx(q,{disabled:!0,label:"Task",style:{width:"100%"},placeholder:"Pick task",data:R==null?void 0:R.map(n=>({label:n.title,value:n.id.toString()})),...t,error:(o=y.assigned_task_id)==null?void 0:o.message})}}),e.jsx(_,{name:"customer_id",control:g,render:({field:t})=>{var o;return e.jsx(q,{disabled:!0,label:"Customer",style:{width:"100%"},placeholder:"Pick customer",data:j==null?void 0:j.map(n=>({label:n.name,value:n.id.toString()})),...t,error:(o=y.customer_id)==null?void 0:o.message})}}),e.jsx(_,{name:"project_id",control:g,render:({field:t})=>{var o;return e.jsx(q,{disabled:!0,label:"Project",style:{width:"100%"},placeholder:"Pick project",data:f==null?void 0:f.map(n=>({label:n.name,value:n.id.toString()})),...t,error:(o=y.project_id)==null?void 0:o.message})}}),e.jsx(_,{name:"status",control:g,render:({field:t})=>{var o;return e.jsx(q,{disabled:!0,label:"Status",style:{width:"100%"},placeholder:"Pick status",data:["pending","inProgress","done"],...t,error:(o=y.status)==null?void 0:o.message})}}),e.jsxs(w,{direction:"column",gap:2,children:[e.jsx(I,{fz:14,fw:500,children:"Progress"}),e.jsx(_,{name:"progress",control:g,render:({field:t})=>e.jsx(Ie,{...t,label:o=>o,value:t.value,onChange:o=>{r!=null&&r.progress&&r.progress>o||t.onChange(o)}})})]}),e.jsx(Me,{error:(ae=y.progress_description)==null?void 0:ae.message,label:"Description",placeholder:"Enter description",...fe("progress_description")}),T?e.jsxs(w,{align:"center",gap:"lg",style:{width:"100%"},children:[e.jsx(ke,{target:"_blank",to:T,download:T,children:T}),e.jsx(ze,{size:"lg",variant:"filled",color:"red",onClick:je,children:e.jsx(pe,{size:20})})]}):e.jsx(B,{style:{width:"100%"},children:e.jsx(G,{onChange:A,accept:"application/pdf",children:t=>e.jsx(S,{w:200,leftSection:e.jsx($,{}),...t,children:"Upload Document"})})}),te&&e.jsx(be,{radius:"md",src:te}),e.jsxs(B,{style:{width:"100%"},children:[e.jsx(G,{resetRef:D,onChange:N,accept:"image/png,image/jpeg",children:t=>e.jsx(S,{w:200,leftSection:e.jsx($,{}),...t,children:"Upload image"})}),e.jsx(S,{disabled:!v,color:"red",onClick:ge,children:"Reset"})]}),se&&e.jsxs("video",{width:"100%",controls:!0,children:[e.jsx("source",{src:se,type:m==null?void 0:m.type}),"Your browser does not support the video tag."]}),e.jsxs(B,{style:{width:"100%"},children:[e.jsx(G,{resetRef:U,onChange:z,accept:"video/*",children:t=>e.jsx(S,{w:200,leftSection:e.jsx($,{}),...t,children:"Upload Video"})}),e.jsx(S,{disabled:!m,color:"red",onClick:re,children:"Reset"})]}),e.jsxs(w,{align:"center",gap:"lg",children:[e.jsx(_,{name:"report_date",control:g,render:({field:t})=>{var o;return e.jsx(K,{error:(o=y.report_date)==null?void 0:o.message,label:"Start date",style:{width:"50%"},...t,value:t.value?new Date(t.value):null,onChange:n=>t.onChange(n),leftSection:e.jsx(O,{}),leftSectionPointerEvents:"none",placeholder:"Pick date"})}}),e.jsx(_,{name:"report_time",control:g,render:({field:t})=>{var o;return e.jsx(Ae,{...t,label:"Start time",error:(o=y.report_time)==null?void 0:o.message,style:{width:"50%"},value:t.value||"",onChange:n=>t.onChange(n),ref:me,rightSection:xe})}})]}),(C==null?void 0:C.length)>0&&e.jsxs(c,{children:[e.jsx(c.Thead,{children:e.jsxs(c.Tr,{children:[e.jsx(c.Th,{children:"No"}),e.jsx(c.Th,{children:"Accessory Name"}),e.jsx(c.Th,{children:"Required Quantity"}),e.jsx(c.Th,{children:"Taken Quantity"}),e.jsx(c.Th,{children:"Returned Quantity"})]})}),e.jsx(c.Tbody,{children:C.map((t,o)=>e.jsxs(c.Tr,{children:[e.jsx(c.Td,{children:o+1}),e.jsx(c.Td,{children:t.accessory_name}),e.jsx(c.Td,{children:t.required_qty}),e.jsx(c.Td,{children:(r==null?void 0:r.status)==="inProgress"?e.jsx(le,{w:100,value:H[t.id],onChange:n=>{X(h=>({...h,[t.id]:Number(n)})),oe(t.id,Number(n),Z[t.id]||0)}}):e.jsx(I,{children:t.taken_qty})}),e.jsx(c.Td,{children:(r==null?void 0:r.status)==="done"?e.jsx(le,{w:100,value:Z[t.id],onChange:n=>{ee(h=>({...h,[t.id]:Number(n)})),oe(t.id,H[t.id]||0,Number(n))}}):e.jsx(I,{children:t.returned_qty})})]},t.id))})]})]}),e.jsxs(w,{justify:"end",gap:15,mt:20,children:[e.jsx(S,{radius:4,size:"sm",onClick:i,color:"dark",children:"Cancel"}),e.jsx(S,{type:"submit",radius:4,size:"sm",loading:k,disabled:k,color:"blue",children:"Update"})]})]})})}),e.jsx(Ne,{onClick:u,style:{color:"#4361ee",cursor:"pointer"}})]})},Ke=()=>{const a=ie();return he({mutationFn:async s=>await F.delete(`/reports-delete/${s}`),onSuccess:()=>{a.invalidateQueries(["reports "])}})},We=({id:a})=>{const[s,{open:u,close:i}]=ue(!1),{mutate:x,isPending:j}=Ke(),f=()=>{x(a,{onSuccess:()=>{i(),V.success("Report deleted successfully.")}})};return e.jsxs(E,{children:[e.jsx(Re,{isLoading:j,title:"Report Delete",description:"This action cannot be undone.",opened:s,close:i,onConfirm:f}),e.jsx(pe,{onClick:u,style:{color:"#ef233c",cursor:"pointer"}})]})},Je=()=>[{name:"Id",selector:s=>s.id,width:"70px"},{name:"Task",selector:s=>s.task.title,width:"130px"},{name:"Project",selector:s=>s.project.name,width:"130px"},{name:"Customer",selector:s=>s.customer.name,width:"130px"},{name:"Employee",selector:s=>s.user.name,width:"130px"},{name:"Progress",selector:s=>s.progress,width:"100px"},{name:"Report Date",selector:s=>s.report_date,width:"150px"},{name:"Report Time",selector:s=>s.report_time,width:"130px"},{name:"Status",width:"130px",cell:s=>e.jsx(Be,{color:Qe(s.status),h:25,children:s.status})},{name:"Actions",cell:s=>e.jsxs(w,{align:"center",gap:20,children:[e.jsx(Ve,{id:s.id}),e.jsx(We,{id:s.id})]})}],He=(a,s,u)=>{const{user:i}=ce();return de({queryKey:["reports",a,s,u,i==null?void 0:i.id],queryFn:async()=>await(await F.get(`/reports?employee_id=${i==null?void 0:i.id}&task_id=${a}&from_date=${s}&to_date=${u}`)).data.reports})},Xe=()=>{const[a,s]=l.useState(null),[u,i]=l.useState(null),{state:x}=we(),j=Je(),{data:f=[],isLoading:R}=He(x,a?W(a).format("YYYY-MM-DD"):null,u?W(u).format("YYYY-MM-DD"):null),L=()=>{s(null),i(null)};return e.jsxs(E,{children:[e.jsxs(w,{align:"center",gap:10,mb:10,children:[e.jsx(K,{w:200,value:a,onChange:k=>s(k),leftSection:e.jsx(O,{}),leftSectionPointerEvents:"none",placeholder:"From"}),e.jsx(K,{w:200,value:u,onChange:k=>i(k),leftSection:e.jsx(O,{}),leftSectionPointerEvents:"none",placeholder:"To"}),e.jsx(Ge,{onClick:L,size:30,style:{color:"#868e96",cursor:"pointer"}})]}),R?e.jsx(I,{children:"loading..."}):e.jsx(Ce,{columns:j,data:f})]})},xt=()=>e.jsx(Xe,{});export{xt as default};
