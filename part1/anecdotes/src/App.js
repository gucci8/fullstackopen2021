import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const points = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(points)
  const [favI, setFavI] = useState(0)

  const voteHandler = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    if (copy[selected] >= votes[favI]) setFavI(selected)
  }

  const nextHandler = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={voteHandler}>vote</button>
        <button onClick={nextHandler}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[favI]}</p>
      <p>has {votes[favI]} votes</p>
    </div>
  )
}

export default App