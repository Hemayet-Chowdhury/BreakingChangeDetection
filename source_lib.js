// source library

function decrementAndAdd(a, b){
    function add(c, d){
       return c + d;
    }
    a--;
    b = b - 1;
    return add(a,b)
 }
 
 // test the code
 function incrementAndMultiply(a, b){
     function multiply(c, d){
       return c * d;
     }
     a++;
     b = b + 1;
     return multiply(a, b)
 }

//  function MultiplyNumbers(a, b){
//   function multiply(c, d){
//     return c * d;
//   }
//   a++;
//   b = b + 1;
//   return multiply(a, b)
// }

// function DivideAndDecrement(d, e){
//   function multiply(c, d){
//     return c * d;
//   }

//   return multiply(d, e)
// }

// function decrementAndAddTwo(a, b,e){
//   function add(c, d){
//      return c + d+e;
//   }
//   a--;
//   b = b - 1;
//   return add(a,b)
// }


// function decrementAndSubTwo(a, b,e){
//   function add(c, d){
//      return c + d+e;
//   }
//   a--;
//   b = b - 1;
//   return add(a,b)
// }