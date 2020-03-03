const express = require("express")
const fileServer = require("serve-static")
const compress = require("compression")
const bodyParser = require("body-parser")
const cors = require("cors")
const fs = require("fs")
const path = require("path")
const mime = require("mime")
const pkg = require("./package.json")
const API = require("./api.js")
const favicon = require("serve-favicon")
const app = express()
const appDir = __dirname + "/client/"

// app.use(favicon(__dirname + "/favicon.ico"))
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

// stream resume
app.use("/fileserve", (req, res) => {
  const filePath = __dirname + "\\resume-2020.docx"
  const stat = fs.statSync(filePath)
  const filename = path.basename(filePath)
  const mimetype = mime.getType(filePath)
  res.setHeader("Content-disposition", "attachment; filename=" + filename)
  res.setHeader("Content-type", mimetype + ";charset=UTF-8")
  res.setHeader("Content-Length", stat.size)
  let filestream = fs.createReadStream(filePath)
  filestream.pipe(res)
  filestream.on("error", function(err) {
    res.end(err)
  })
})

app.use("/api", API)

module.exports = app
