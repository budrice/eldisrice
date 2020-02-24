const http = require("http")
const app = require("./app.js")

const port = 3005
const server = http.createServer(app).listen(port)
server.on("error", onError)
server.on("listening", onListening)

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
  console.log("www.js Listening on " + bind)
}
