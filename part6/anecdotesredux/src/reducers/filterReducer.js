const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETFIL':
      return action.data
    default:
      return state
  }
}

export const setFilter = (str) => {
  return {
    type: 'SETFIL',
    data: str
  }
}

export default filterReducer