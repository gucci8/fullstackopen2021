import React from 'react'
import { connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { newAnecNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    props.createAnec(content)
    props.newAnecNotification(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div>
          <input name='anec' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filtStr: state.filtStr
  }
}

const mapDispatchToProps = {
  createAnec,
  newAnecNotification
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm