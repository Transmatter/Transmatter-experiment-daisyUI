import axios from 'axios'

const graphqlAxiosInstant = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
})

const graphqlClient = (query) => {
    return graphqlAxiosInstant.post('/graphql', query)
}

export default graphqlClient;