import anecdoteService from '../services/anecdoteService'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANEC':
      return [...state, action.data]
    case 'INIT_ANECS':
      return action.data
    case 'VOTE':
      const id = action.data.id
      return state.map(a =>
        a.id !== id ? a : action.data
      )
    default:
      return state
  }
}

export const initializeAnecs = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECS',
      data: anecdotes
    })
  }
}

export const vote = (id) => {
  return async dispatch => {
    const votedAnec = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: votedAnec
    })
  }
}

export const createAnec = content => {
  return async dispatch => {
    const response = await anecdoteService.createNew(asObject(content))
    dispatch({
      type: 'NEW_ANEC',
      data: response
    })
    console.log(response)
  }
}

export default anecdoteReducer