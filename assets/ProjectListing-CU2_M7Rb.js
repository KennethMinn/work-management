import{d as B,r as M,j as e,B as Y,T as o,F as a,G as R,e as v,_ as z}from"./index-GMjYCCZP.js";import{A as ee,D as te}from"./AlertModal-DUMj9F5n.js";import{z as x,u as ne,c as G,a as V,t as $,M as W,C as j,I as re}from"./index-xlF32sg_.js";import{u as K}from"./useGetAllCustomers-CA1W3JJA.js";import{u as H}from"./useGetAllEmployees-B947KqJi.js";import{D as k,d as E}from"./DatePickerInput-BBVkyZTS.js";import{u as L,a as U}from"./axiosInstance-BCsj8OtX.js";import{S as J}from"./Stack-ImU5974r.js";import{F as O,I as X}from"./IconCloudUpload-C7hDo13j.js";import{B as h}from"./Button-sFRrCIcf.js";import{T as b}from"./TextInput-CdohHagb.js";import{S as N}from"./Select-DS7k8gKG.js";import{I as se}from"./IconEdit-BfwqRLLd.js";import{u as ae}from"./useGetAllProjects-DcqO0Uyv.js";import{I as oe}from"./IconPlus-DN1aYvKt.js";const Z=x.object({name:x.string().min(1,"name is required"),customer_id:x.string().min(1,"customer is required"),description:x.string().min(1,"description is required"),value:x.string().min(1,"value is required"),contract_date:x.date().refine(s=>!isNaN(s.getTime()),"Invalid date"),start_date:x.date().refine(s=>!isNaN(s.getTime()),"Invalid date"),end_date:x.date().refine(s=>!isNaN(s.getTime()),"Invalid date"),user_id:x.string().min(1,"user is required")}),ce=s=>{const t=B();return L({mutationFn:async d=>{await U.post(`/projects-update/${s}`,d)},onSuccess:()=>{t.invalidateQueries(["projects"])}})},ie=s=>ne({queryKey:["project",s],queryFn:async()=>await(await U.get(`/projects/${s}`)).data.project,enabled:!!s}),le=({id:s})=>{var I,r,c;const[t,{open:d,close:g}]=G(!1),{mutate:y,isPending:w}=ce(s),{data:l}=ie(s),{data:f}=K(),{data:P}=H(),[p,q]=M.useState(null),C=M.useRef(null),A=()=>{var n;q(null),(n=C.current)==null||n.call(C)},{register:F,handleSubmit:_,control:u,setValue:m,formState:{errors:S}}=V({resolver:$(Z)}),T=n=>{const i={...n,contract_date:E(n.contract_date).format("YYYY-MM-DD"),start_date:E(n.start_date).format("YYYY-MM-DD"),end_date:E(n.end_date).format("YYYY-MM-DD"),document:p},D=new FormData;for(const Q in i)D.append(Q,i[Q]);y(D,{onSuccess:()=>{g(),z.success("Project Updated Successfully.")},onError:()=>{z.error("Something went wrong.")}})};return M.useEffect(()=>{l&&(m("name",l.name),m("description",l.description),m("value",l.value.toString()),m("customer_id",l.customer_id.toString()),m("user_id",l.user_id.toString()),m("contract_date",new Date(l.contract_date)),m("start_date",new Date(l.start_date)),m("end_date",new Date(l.end_date)))},[l,m]),e.jsxs(Y,{children:[e.jsx(W,{size:650,padding:30,opened:t,onClose:g,title:"Edit Project Form",centered:!0,styles:{title:{fontSize:"20px",fontWeight:600}},children:e.jsx(Y,{my:10,children:e.jsxs("form",{onSubmit:_(T),children:[e.jsxs(J,{gap:20,children:[p&&e.jsxs(o,{size:"sm",ta:"center",mt:"sm",children:["Picked file: ",p.name]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Document"}),e.jsxs(R,{style:{width:"100%"},children:[e.jsx(O,{resetRef:C,onChange:q,children:n=>e.jsx(h,{leftSection:e.jsx(X,{}),...n,children:"Upload doc"})}),e.jsx(h,{disabled:!p,color:"red",onClick:A,children:"Reset"})]})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Name"}),e.jsx(b,{style:{width:"100%"},placeholder:"Enter project name",...F("name"),error:(I=S.name)==null?void 0:I.message})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Description"}),e.jsx(b,{style:{width:"100%"},placeholder:"Enter description name",...F("description"),error:(r=S.description)==null?void 0:r.message})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Value"}),e.jsx(b,{style:{width:"100%"},placeholder:"Enter value",...F("value"),error:(c=S.value)==null?void 0:c.message})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Customers"}),e.jsx(j,{name:"customer_id",control:u,render:({field:n})=>{var i;return e.jsx(N,{style:{width:"100%"},placeholder:"Pick customer",data:f==null?void 0:f.map(D=>({label:D.name,value:D.id.toString()})),...n,error:(i=S.customer_id)==null?void 0:i.message})}})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Employees"}),e.jsx(j,{name:"user_id",control:u,render:({field:n})=>{var i;return e.jsx(N,{style:{width:"100%"},placeholder:"Pick employee",data:P==null?void 0:P.map(D=>({label:D.name,value:D.id.toString()})),...n,error:(i=S.user_id)==null?void 0:i.message})}})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:130,fw:500,children:"Contract Date"}),e.jsx(j,{name:"contract_date",control:u,render:({field:n})=>e.jsx(k,{...n,value:n.value?new Date(n.value):null,onChange:i=>n.onChange(i),leftSection:e.jsx(v,{}),leftSectionPointerEvents:"none",placeholder:"Pick date"})})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:130,fw:500,children:"Start Date"}),e.jsx(j,{name:"start_date",control:u,render:({field:n})=>e.jsx(k,{...n,value:n.value?new Date(n.value):null,onChange:i=>n.onChange(i),leftSection:e.jsx(v,{}),leftSectionPointerEvents:"none",placeholder:"Pick date"})})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:130,fw:500,children:"End Date"}),e.jsx(j,{name:"end_date",control:u,render:({field:n})=>e.jsx(k,{...n,value:n.value?new Date(n.value):null,onChange:i=>n.onChange(i),leftSection:e.jsx(v,{}),leftSectionPointerEvents:"none",placeholder:"Pick date"})})]})]}),e.jsxs(a,{justify:"end",gap:15,mt:20,children:[e.jsx(h,{radius:4,size:"sm",onClick:g,color:"dark",children:"Cancel"}),e.jsx(h,{type:"submit",radius:4,size:"sm",loading:w,disabled:w,color:"blue",children:"Create"})]})]})})}),e.jsx(se,{onClick:d,style:{color:"#4361ee",cursor:"pointer"}})]})},de=()=>{const s=B();return L({mutationFn:async t=>await U.delete(`/projects-delete/${t}`),onSuccess:()=>{s.invalidateQueries(["projects "])}})},ue=({id:s})=>{const[t,{open:d,close:g}]=G(!1),{mutate:y,isPending:w}=de(),l=()=>{y(s,{onSuccess:()=>{g(),z.success("Project deleted successfully.")}})};return e.jsxs(Y,{children:[e.jsx(ee,{isLoading:w,title:"Project Delete",description:"This action cannot be undone.",opened:t,close:g,onConfirm:l}),e.jsx(re,{onClick:d,style:{color:"#ef233c",cursor:"pointer"}})]})},me=()=>[{name:"Id",selector:t=>t.id,width:"50px"},{name:"Name",selector:t=>t.name,width:"100px"},{name:"Description",selector:t=>t.description,width:"140px"},{name:"Customer",selector:t=>t.customer.name,width:"100px"},{name:"User",selector:t=>t.employee.name,width:"150px"},{name:"Value",selector:t=>t.value,width:"100px"},{name:"Contract Date",selector:t=>t.contract_date,width:"130px"},{name:"Start Date",selector:t=>t.start_date,width:"130px"},{name:"End Date",selector:t=>t.end_date,width:"130px"},{name:"Doc",cell:t=>e.jsx(o,{onClick:()=>window.open(t.fileURL,"_blank"),style:{textDecoration:"underline",cursor:"pointer"},c:"blue",children:"doc"}),width:"100px"},{name:"Actions",cell:t=>e.jsxs(a,{align:"center",gap:20,children:[e.jsx(le,{id:t.id}),e.jsx(ue,{id:t.id})]})}],je=()=>{const s=B();return L({mutationFn:async t=>{await U.post("/project-create",t)},onSuccess:()=>{s.invalidateQueries(["projects"])}})},pe=()=>{var S,T,I;const[s,{open:t,close:d}]=G(!1),{mutate:g,isPending:y}=je(),{data:w}=K(),{data:l}=H(),[f,P]=M.useState(null),p=M.useRef(null),q=()=>{var r;P(null),(r=p.current)==null||r.call(p)},{register:C,handleSubmit:A,reset:F,control:_,formState:{errors:u}}=V({resolver:$(Z)}),m=r=>{const c={...r,contract_date:E(r.contract_date).format("YYYY-MM-DD"),start_date:E(r.start_date).format("YYYY-MM-DD"),end_date:E(r.end_date).format("YYYY-MM-DD"),document:f},n=new FormData;for(const i in c)n.append(i,c[i]);g(n,{onSuccess:()=>{F(),d(),z.success("Project Created Successfully.")},onError:()=>{z.error("Something went wrong.")}})};return e.jsxs(Y,{children:[e.jsx(W,{size:650,padding:30,opened:s,onClose:d,title:"Create Project Form",centered:!0,styles:{title:{fontSize:"20px",fontWeight:600}},children:e.jsx(Y,{my:10,children:e.jsxs("form",{onSubmit:A(m),children:[e.jsxs(J,{gap:20,children:[f&&e.jsxs(o,{size:"sm",ta:"center",mt:"sm",children:["Picked file: ",f.name]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Document"}),e.jsxs(R,{style:{width:"100%"},children:[e.jsx(O,{resetRef:p,onChange:P,children:r=>e.jsx(h,{leftSection:e.jsx(X,{}),...r,children:"Upload doc"})}),e.jsx(h,{disabled:!f,color:"red",onClick:q,children:"Reset"})]})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Name"}),e.jsx(b,{style:{width:"100%"},placeholder:"Enter project name",...C("name"),error:(S=u.name)==null?void 0:S.message})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Description"}),e.jsx(b,{style:{width:"100%"},placeholder:"Enter description name",...C("description"),error:(T=u.description)==null?void 0:T.message})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Value"}),e.jsx(b,{style:{width:"100%"},placeholder:"Enter value",...C("value"),error:(I=u.value)==null?void 0:I.message})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Customers"}),e.jsx(j,{name:"customer_id",control:_,render:({field:r})=>{var c;return e.jsx(N,{style:{width:"100%"},placeholder:"Pick customer",data:w==null?void 0:w.map(n=>({label:n.name,value:n.id.toString()})),...r,error:(c=u.customer_id)==null?void 0:c.message})}})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:170,fw:500,children:"Employees"}),e.jsx(j,{name:"user_id",control:_,render:({field:r})=>{var c;return e.jsx(N,{style:{width:"100%"},placeholder:"Pick employee",data:l==null?void 0:l.map(n=>({label:n.name,value:n.id.toString()})),...r,error:(c=u.user_id)==null?void 0:c.message})}})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:130,fw:500,children:"Contract Date"}),e.jsx(j,{name:"contract_date",control:_,render:({field:r})=>e.jsx(k,{...r,value:r.value?new Date(r.value):null,onChange:c=>r.onChange(c),leftSection:e.jsx(v,{}),leftSectionPointerEvents:"none",placeholder:"Pick date"})})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:130,fw:500,children:"Start Date"}),e.jsx(j,{name:"start_date",control:_,render:({field:r})=>e.jsx(k,{...r,value:r.value?new Date(r.value):null,onChange:c=>r.onChange(c),leftSection:e.jsx(v,{}),leftSectionPointerEvents:"none",placeholder:"Pick date"})})]}),e.jsxs(a,{align:"center",gap:"lg",children:[e.jsx(o,{w:130,fw:500,children:"End Date"}),e.jsx(j,{name:"end_date",control:_,render:({field:r})=>e.jsx(k,{...r,value:r.value?new Date(r.value):null,onChange:c=>r.onChange(c),leftSection:e.jsx(v,{}),leftSectionPointerEvents:"none",placeholder:"Pick date"})})]})]}),e.jsxs(a,{justify:"end",gap:15,mt:20,children:[e.jsx(h,{radius:4,size:"sm",onClick:d,color:"dark",children:"Cancel"}),e.jsx(h,{type:"submit",radius:4,size:"sm",loading:y,disabled:y,color:"blue",children:"Create"})]})]})})}),e.jsx(a,{justify:"end",children:e.jsx(h,{onClick:t,leftSection:e.jsx(oe,{size:16}),children:"Create"})})]})},xe=()=>{const s=me(),{data:t,isLoading:d}=ae();return e.jsxs(Y,{children:[e.jsx(pe,{}),d?e.jsx("div",{children:"table"}):e.jsx(te,{columns:s,data:t})]})},Fe=()=>e.jsx(xe,{});export{Fe as default};
