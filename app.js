const express = require("express")
const fileServer = require("serve-static")
const compress = require("compression")
const bodyParser = require("body-parser")
const cors = require("cors")
const pkg = require("./package.json")
const API = require("./api.js")

const app = express()
const appDir = __dirname + "./client"

app.use(compress())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileServer(appDir))
app.use(cors())
app.enable("trust proxy")
app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept, X-Access-Token, X-Key"
  )
  if (req.method == "OPTIONS") {
    res.status(200).end()
  } else {
    next()
  }
})
app.use("/", express.static(pkg.paths.client))
app.use("/appdata/", express.static(pkg.paths.client + "/appdata"))
app.use("/api", API)

module.exports = app
