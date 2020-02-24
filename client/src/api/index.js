import axios from "axios"

export const fetchData = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3005/api/getresume") // dev
      // .get("/api/getresume") // prod
      .then(
        res => {
          console.log(res.data[6])
          resolve(res)
        },
        err => {
          console.log(err)
          reject(err)
        }
      )
      .catch(err => {
        console.log(err)
        reject(err)
      })
      .finally(() => {
        console.log("api data retrieved")
      })
  })
}
