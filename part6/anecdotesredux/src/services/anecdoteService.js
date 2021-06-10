import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async(id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

const vote = async (id) => {
  const anec = await getById(id)
  anec.votes = anec.votes + 1
  const response = await axios.put(`${baseUrl}/${id}`, anec)
  return response.data
}

export default { getAll, createNew, vote }