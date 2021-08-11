/***
 * * Simulate how node js event loop works
 */
// * Note: callback functions run in the event loop
// * Async = non blocking code
// * Sync = blocking code(wait till the prev block executed)

/**
 * *
 * 4 phases of nodejs event loop
 * # 1 Expired timer callbacks
 * # 2 1/O polling and callbacks
 * # 3 setImmediate callbacks
 * # 4 close callbacks
 */

// * Single Thread (Sequence of instructions)* //
// * #1 Initialize program
// * #2 Execute "top-level" code
// * #3 Require modules
// * #4 Register event callbacks
// * #5 Start event loop

// * require module
const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => {
  console.log("Timer 1 finished");
}, 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("----------------");

  setTimeout(() => {
    console.log("Timer 2 finished");
  }, 0);
  setTimeout(() => {
    console.log("Timer 3 finished");
  }, 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
}); // callback

console.log("Hello from the top level code"); // top level code means not within the callback function, this code executed first

// ## Close Callbacks
// ## Expired timers or I/O task? if "YES" proceed to first phase of event loop if "NO" EXIT program
