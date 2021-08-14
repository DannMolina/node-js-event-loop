/**
 * Events & Event Driven Architecture for nodejs
 */

/**
 * Event emitter -> Event Listener -> Attached Callback function
 * Event emitter > Event listener(OBSERVER PATTERN)
 */
const EventEmitter = require("events");
const http = require("http");

// * used eventEmitter for custom event
class Sales extends EventEmitter {
  constructor() {
    super(); // access all the methods of the parent class, parent class is the EventEmitter
  }
}

// * instance of the class Sales
const myEmitter = new Sales();

// * listener
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Dann");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} left in the stock.`);
});

/**
 * Note: not always we have to use to actually also emit events.
 * that is more when we try to use the EventEmitter on our own.
 */
// * trigger
// * emit event on our own
myEmitter.emit("newSale", 9);

/**
 * Create server
 */

/**
 * if we're going to use a built in node module
 */
const server = http.createServer();

/**
 * on means that the code is listening for an event,
 * then these functions in there will many time emit their own events,
 * and we have to do is listen to them
 */
server.on("request", (req, res) => {
  console.log("Request received");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request 😃");
});

server.on("close", () => {
  console.log("Server closed");
});

// * start the server
// * port, host
server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for request");
});
