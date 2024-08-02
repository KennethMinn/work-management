import{h as s,c as a}from"./index-6tmHN736.js";const o=(e="")=>s({queryKey:["employees",e],queryFn:async()=>await(await a.get(`/employees?company_id=${e}`)).data.employees});export{o as u};
