const notificationAtStart = ''
  
const initialState = notificationAtStart

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEWANEC_NOTI':
      return `You added '${action.data.content}'`
    case 'VOTE_NOTI':
      return `You voted '${action.data.content}'`
    case 'TIMER_OUT':
      return ''
    default:
      return state
  }
}

export const newAnecNotification = (content) => {
  return {
    type: 'NEWANEC_NOTI',
    data: { content }
  }
}

export const voteNotification = (content) => {
  return {
    type: 'VOTE_NOTI',
    data: { content }
  }
}

export const clearNotification = () => {
  const content = null
  return {
    type: 'TIMER_OUT',
    data: { content }
  }
}

export default notificationReducer