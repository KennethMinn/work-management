import{u as s}from"./index-BTdhG7X8.js";import{a as r}from"./axiosInstance-xGXIEcIh.js";const u=(e="")=>s({queryKey:["employees",e],queryFn:async()=>await(await r.get(`/employees?company_id=${e}`)).data.employees});export{u};
