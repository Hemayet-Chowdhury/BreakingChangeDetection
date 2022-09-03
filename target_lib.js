
// target library
//adding a parameter
function decrementAndAdd(a, b,f){
   function add(c, d){
      return c + d;
   }
   a--;
   b = b - 1;
   return add(a,b)
}

function incrementAndMultiply(a, b,f){
   function multiply(c, d){
     return c * d;
   }
   a++;
   b = b + 1;
   return multiply(a, b)
}
 
 // chaning parameter orders

//  function incrementAndMultiply(b, a){
//     function multiply(c, d){
//       return c * d;
//     }
//     a++;
//     b = b + 1;
//     return multiply(a, b)
// }

// //MULTIPLY NUMBERS DELETED

// //change parameter names
// function DivideAndDecrement(a, b){
//     function multiply(c, d){
//       return c * d;
//     }
//     a++;
//     b = b + 1;
//     return multiply(a, b)
// }

// function decrementAndAddTwo(a, b,e){
//     function add(c, d){
//        return c + d+e;
//     }
//     a--;
//     b = b - 1;
//     return add(a,b)
//  }

 
 


//  function decrementAndSubTwo(a, b,e){
//     function add(c, d){
//        return c + d+e;
//     }
//     a--;
//     b = b - 1;
//     return add(a,b)
//  }