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
    Login: login,
    GetResumeContent: getResumeContent,
    GetHeaderContent: getHeaderContent,
    PostMessage: postMessage
  }

  function login(member) {
    return new Promise((resolve, reject) => {
      validate(error => {
        reject(error)
      })
        .then(updateMember, error => {
          reject(error)
        })
        .then(result => {
          resolve(result)
        })

      function validate() {
        let promise = new Promise((resolve, reject) => {
          if (!member.id) {
            resolve({ error: { message: "Unable to login." } })
          }
          let sql = `SELECT * FROM \`eldis-resume\`.member WHERE id = ?;`
          try {
            db.query(sql, [member.id], (error, result) => {
              if (error) {
                resolve({ error: error })
              } else {
                if (result.length > 0) {
                  if (bcrypt.compareSync(member.password, result[0].password)) {
                    resolve(result)
                  } else {
                    resolve({
                      error: { message: "Your password is incorrect." }
                    })
                  }
                } else {
                  resolve({
                    error: { message: "Your username is incorrect." }
                  })
                }
              }
            })
          } catch (error) {
            reject(error)
          }
        })
        return promise
      }
    })
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
