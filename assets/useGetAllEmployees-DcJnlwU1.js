import{h as s,c as a}from"./index-BFU816dl.js";const o=(e="")=>s({queryKey:["employees",e],queryFn:async()=>await(await a.get(`/employees?company_id=${e}`)).data.employees});export{o as u};
