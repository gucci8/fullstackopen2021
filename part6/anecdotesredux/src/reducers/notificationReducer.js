let timeoutId = 0

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEWANEC_NOTI':
      return `You added '${action.data}'`
    case 'VOTE_NOTI':
      return `You voted '${action.data}'`
    case 'TIMER_OUT':
      return ''
    default:
      return state
  }
}

export const newAnecNotification = (content) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'NEWANEC_NOTI',
      data: content
    })
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const voteNotification = (content) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'VOTE_NOTI',
      data: content
    })
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const clearNotification = () => {
  return {
    type: 'TIMER_OUT'
  }
}

export default notificationReducer