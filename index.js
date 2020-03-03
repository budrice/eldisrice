const http = require("http")
const app = require("./app.js")
const cluster = require("cluster")
const port = 3005

// get cpu count
const numberOfCPUs = require("os").cpus().length
let cpus = numberOfCPUs
if (process.argv[2] === 0 || process.argv[2] === undefined) {
  cpus = numberOfCPUs
} else if (process.argv[2] < 0 && process.argv[2] !== undefined) {
  cpus = 1
} else if (process.argv[2] > numberOfCPUs) {
  cpus = numberOfCPUs
} else {
  cpus = process.argv[2]
}

if (cluster.isWorker) {
  var server = http.createServer(app).listen(port)
  server.on("error", onError)
  server.on("listening", onListening)
} else {
  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error
  }
  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges")
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(bind + " is already in use")
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  let addr = server.address()
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
  console.log("server listening on " + bind)
}
