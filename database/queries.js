const mysql = require("mysql")
const config = require("./../config.json")

const db = mysql.createPool({
  connectionLimit: config.connectionLimit,
  connectTimeout: config.connectTimeout,
  multipleStatements: config.multipleStatements,
  host: config.dbServerIP,
  user: config.dbUser,
  password: config.dbPass,
  database: config.db
})
db.on("error", error => {
  console.log(error)
})

module.exports = function() {
  return {
    GetResumeContent: getResumeContent,
    GetHeaderContent: getHeaderContent,
    PostMessage: postMessage
  }

  function getResumeContent() {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM `eldis-resume`.home; \
         \
         SELECT * FROM `eldis-resume`.experiences; \
         \
         SELECT * FROM `eldis-resume`.education; \
         \
         SELECT * FROM `eldis-resume`.skills; \
         \
         SELECT * FROM `eldis-resume`.about; \
         \
         SELECT * FROM `eldis-resume`.icons;"
      try {
        db.query(sql, (error, result) => {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            resolve(result)
          }
        })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  function getHeaderContent() {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT firstname, lastname, video FROM `eldis-resume`.home; \
         \
        SELECT * FROM `eldis-resume`.slider;"
      try {
        db.query(sql, (error, result) => {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            resolve(result)
          }
        })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  function postMessage(message) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO `eldis-resume`.messages SET ?"
      try {
        db.query(sql, [message], (error, result) => {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            resolve(result)
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
