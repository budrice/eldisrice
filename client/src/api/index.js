import axios from "axios"
// import { FileDownload } from "js-file-download"

export const fetchData = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get("http://127.0.0.1:3005/api/getresume") // dev
        // .get("/api/getresume") // prod
        .then(
          result => {
            resolve(result)
          },
          error => {
            console.log(`api error 15: ${error}`)
            reject(error)
          }
        )
        .catch(error => {
          console.log(`api error 20: ${error}`)
          reject(error)
        })
    } catch (error) {
      console.log(`api error 24: ${error}`)
      reject(error)
    }
  })
}
export const fetchHeader = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get("http://localhost:3005/api/getheader") // dev
        // .get("/api/getheader") // prod
        .then(
          result => {
            resolve(result)
          },
          error => {
            console.log(`api error 38: ${error}`)
            reject(error)
          }
        )
        .catch(error => {
          console.log(`api error 43: ${error}`)
          reject(error)
        })
    } catch (error) {
      console.log(`api error 47: ${error}`)
    }
  })
}
export const postMessage = message => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post("http://localhost:3005/api/postmessage", message)
        .then(
          result => {
            resolve(result)
          },
          error => {
            console.log(`api error 61: ${error}`)
            reject(error)
          }
        )
        .catch(error => {
          console.log(`api error 66: ${error}`)
          reject(error)
        })
    } catch (error) {
      console.log(`api error 70: ${error}`)
    }
  })
}
export const getFile = () => {
  axios
    .get("http://localhost:3005/fileserve", { responseType: "arraybuffer" })
    .then(result => {
      let newBlob = new Blob([result.data], {
        type:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      })
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob)
        return
      }
      const data = window.URL.createObjectURL(newBlob)
      let link = document.createElement("a")
      link.href = data
      link.download = "resume-2020.docx"
      link.click()
      setTimeout(function() {
        window.URL.revokeObjectURL(data)
      }, 100)
    })
    .catch(error => alert(error))
}
