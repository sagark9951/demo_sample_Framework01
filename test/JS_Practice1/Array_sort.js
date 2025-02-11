let tasks = [
    { name : "ad hoc testing", priority :4},
    {name :"regression testing", priority:3},
    {name :"Smoke testing", priority:1},
    {name :"Integration testing", priority:2},

]

console.log("before Sort", tasks);

let sorted = tasks.sort((a,b)=>a.priority - b.priority)
// let sorted = tasks.sort((a,b)=>{a.priority - b.priority}) //this is not working due to "{ }" after arrow function()


console.log("after Sort", sorted);
