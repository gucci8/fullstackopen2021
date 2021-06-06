const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD':
        const newStateG = {
          good: state.good + 1,
          ok: state.ok,
          bad: state.bad
        }
        return newStateG
      case 'OK':
        const newStateO = {
          good: state.good,
          ok: state.ok + 1,
          bad: state.bad
        }
        return newStateO
      case 'BAD':
        const newStateB = {
          good: state.good,
          ok: state.ok,
          bad: state.bad + 1
        }
        return newStateB
      case 'ZERO':
        state = {
          good: 0,
          ok: 0,
          bad: 0
        }
        return state
      default: return state
    }
    
  }
  
  export default counterReducer