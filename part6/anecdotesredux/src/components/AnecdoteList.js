import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => (
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
)

const AnecdoteList = (props) => {
  const voteAnec = (anecdote) => {
    props.vote(anecdote.id)
    props.voteNotification(anecdote.content)
  }

  return (
    <div>
      {props.anecdotes
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => voteAnec(anecdote)}
          />
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const anecs = state.anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter(a => a.content.toLowerCase().includes(state.filtStr.toLowerCase()))

  return {
    anecdotes: anecs,
    filtStr: state.filtStr
  }
}

const mapDispatchToProps = {
  vote,
  voteNotification
}

const ConnectedAnecs = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecs