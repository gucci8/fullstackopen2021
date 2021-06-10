import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filtStr = useSelector(state => state.filtStr)

  const voteAnec = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(voteNotification(anecdote.content))
  }

  const filtered = ({ anecdotes, filtStr }) => {
    const sorted = anecdotes.sort((a, b) => b.votes - a.votes)
    console.log(sorted)
    return sorted.filter(a => a.content.toLowerCase().includes(filtStr.toLowerCase()))
  }

  return (
    <div>
      {filtered({ anecdotes, filtStr })
        .sort((a, b) => b.votes - a.votes)
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



export default AnecdoteList