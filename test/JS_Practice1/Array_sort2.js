const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort(); //  by default the sort() function sorts values as strings. so it works on string beeter than numbers

console.log(fruits); // sorted - [ 'Apple', 'Banana', 'Mango', 'Orange' ]

console.log("fruits.reverse() :",fruits.reverse());  //reversing after sorting


// for numbers we need to use compare function
const points = [40, 100, 1, 5, 25, 10];
let sorted1 = points.sort(function(a, b){return b - a});
console.log(sorted1); //[ 100, 40, 25, 10, 5, 1 ]

console.log(points.sort((a,b)=>a-b)); //[ 1, 5, 10, 25, 40, 100 ]


