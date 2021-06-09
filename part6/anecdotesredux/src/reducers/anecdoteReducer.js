const getId = () => (100000 * Math.random()).toFixed(0)
  
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANEC':
      return [...state, action.data]
    case 'INIT_ANECS':
      return action.data
    case 'VOTE':
      const id = action.data.id
      return state.map(a =>
        a.id !== id ? a :  { ...a, votes: a.votes + 1 }
      )
    default:
      return state
  }
}

export const initializeAnecs = (anecdotes) => {
  return {
    type: 'INIT_ANECS',
    data: anecdotes
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnec = (data) => {
  return {
    type: 'NEW_ANEC',
    data
  }
}

export default anecdoteReducer