var l=Object.defineProperty;var n=Object.getOwnPropertySymbols;var i=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var r=(e,a,s)=>a in e?l(e,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[a]=s,t=(e,a)=>{for(var s in a||(a={}))i.call(a,s)&&r(e,s,a[s]);if(n)for(var s of n(a))k.call(a,s)&&r(e,s,a[s]);return e};import{r as m,a as c,aW as g,a_ as d,j as o,a$ as h,aT as x}from"./vendor.3fe63d51.js";const y=[{title:"Name",dataIndex:"name",render:e=>e},{title:"Age",dataIndex:"age"},{title:"Address",dataIndex:"address"}],u=[{key:"1",name:"John Brown",age:32,address:"New York No. 1 Lake Park"},{key:"2",name:"Jim Green",age:42,address:"London No. 1 Lake Park"},{key:"3",name:"Joe Black",age:32,address:"Sidney No. 1 Lake Park"},{key:"4",name:"Disabled User",age:99,address:"Sidney No. 1 Lake Park"}],b={onChange:(e,a)=>{console.log(`selectedRowKeys: ${e}`,"selectedRows: ",a)},getCheckboxProps:e=>({disabled:e.name==="Disabled User",name:e.name})},w=()=>{const[e,a]=m.exports.useState("checkbox");return c(g,{children:[c(d.Group,{onChange:({target:{value:s}})=>{a(s)},value:e,children:[o(d,{value:"checkbox",children:"Checkbox"}),o(d,{value:"radio",children:"radio"})]}),o(h,{}),o(x,{rowSelection:t({type:e},b),columns:y,dataSource:u})]})};export{w as default};
