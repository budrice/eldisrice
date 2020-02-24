const express = require("express")
const router = express.Router()

const Db = require("./database/queries.js")
const db = new Db()

router.get("/getresume", (req, res) => {
  db.GetResumeContent(req.body).then(
    result => {
      res.json(result)
    },
    error => {
      res.json(error)
    }
  )
})

module.exports = router
