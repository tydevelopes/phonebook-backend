(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),l=t(14),o=t(2),i=function(e){return r.a.createElement("div",null,"filter shown with"," ",r.a.createElement("input",{onChange:e.handleSearchTermChange,value:e.searchTerm}))},m=function(e){return r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:e.handleNameChange,value:e.newName})),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{onChange:e.handleNumberChange,value:e.newNumber})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){return r.a.createElement("div",null,e.persons.map(function(n){return r.a.createElement("div",{key:n.id},n.name," ",n.number,r.a.createElement("button",{onClick:function(){return e.handleDelete(n)}},"delete"))}))},d=t(3),f=t.n(d),h="/api/persons",b=function(){return f.a.get(h).then(function(e){return e.data})},E=function(e){return f.a.post(h,e).then(function(e){return e.data})},p=function(e){return f.a.delete("".concat(h,"/").concat(e)).then(function(e){return e.status})},v=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:n.type},n.content)},w=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),d=Object(o.a)(c,2),f=d[0],h=d[1],w=Object(a.useState)(""),g=Object(o.a)(w,2),j=g[0],C=g[1],O=Object(a.useState)(""),N=Object(o.a)(O,2),S=N[0],y=N[1],T=Object(a.useState)(null),k=Object(o.a)(T,2),D=k[0],P=k[1];Object(a.useEffect)(function(){b().then(function(e){return u(e)})},[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{message:D}),r.a.createElement(i,{handleSearchTermChange:function(e){y(e.target.value)},searchTerm:S}),r.a.createElement("h2",null,"add a new contact"),r.a.createElement(m,{addPerson:function(e){e.preventDefault(),E({name:f,number:j}).then(function(e){P({content:"Added ".concat(e.name),type:"success"}),u([].concat(Object(l.a)(t),[e])),setTimeout(function(){P(null)},3e3)}).catch(function(e){P({content:e.response.data,type:"failure"}),setTimeout(function(){P(null)},3e3)}),h(""),C(""),y("")},handleNameChange:function(e){h(e.target.value)},newName:f,handleNumberChange:function(e){C(e.target.value)},newNumber:j}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(s,{persons:S?function(e){return e.trim()?t.filter(function(n){return n.name.toLowerCase().includes(e.trim().toLowerCase())}):t}(S):t,handleDelete:function(e){var n=e.id,a=e.name;window.confirm("Delete ".concat(a,"?"))&&p(n).then(function(e){u(t.filter(function(e){return e.id!==n}))})}}))};t(38);c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.34654769.chunk.js.map