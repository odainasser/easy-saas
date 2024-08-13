 
console.log('START');
Promise.resolve()
.then(() => console.log('Promise 1'));
setTimeout(function () {
  console.log('Timeout 1');
});
setImmediate(function() {console.log('Immediate 2')});
setTimeout(function() {console.log('Timeout 3')});
Promise.resolve()
.then(() => console.log('Promise 2'));
setImmediate(function() {console.log('Immediate 4')});
console.log('END');