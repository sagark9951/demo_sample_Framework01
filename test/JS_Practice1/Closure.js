
function outer(){
    let aa ='have some fruits'

    function inner(){
        return console.log(aa);
    }
    inner();
}

outer()

function createCounter(){
    let count = 0;

    return {
        increment : function (){
            count = count+1
            return count
        },
        decrement : function(){
            count = count - 1
            return count;
        },
        getCount : function(){
            return count;
        }
    }
}

let counter = createCounter()


console.log("counter.increment() : ",counter.increment()); //1
console.log("counter.increment() : ",counter.increment()); //2
console.log("counter.increment() : ",counter.increment()); //3



console.log("counter.decrement() : ",counter.decrement()); // 2
console.log("counter.decrement() : ",counter.decrement()); // 1


console.log("counter.getCount() : ",counter.getCount()); //1


