import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTZjYTA2YTI1OTY4ZDZjY2E0Yjg5ODgzNmM1ODc2MyIsInN1YiI6IjY2MDRkNmRkYzU4NDBkMDE2MWM0MjNhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pp3_eV5uF72r9h8A-vFl3pVGBVQqe7kW4TxoJY0u3Rg'
      }
    
})

export default instance;