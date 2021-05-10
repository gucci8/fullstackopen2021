import React, { useState } from 'react'

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>
    {text}
  </button>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticLine text={'Good'} value={props.good} />
      <StatisticLine text={'Neutral'} value={props.neutral} />
      <StatisticLine text={'Bad'} value={props.bad} />
      <StatisticLine text={'All'} value={props.all} />
      <StatisticLine text={'Average'} value={props.avg} />
      <StatisticLine text={'Positive'} value={props.pos} unit={'%'} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}{props.unit}</td>
  </tr>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad
  const avg = (good-bad)/all
  const pos = 100*good/all

  const goodHandler = () => setGood(good + 1)
  const neutralHandler = () => setNeutral(neutral + 1)
  const badHandler = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback:</h1>
      <div>
        <Button clickHandler={goodHandler} text={'Good'} />
        <Button clickHandler={neutralHandler} text={'Neutral'} />
        <Button clickHandler={badHandler} text={'Bad'} />
      </div>
      <h1>Statistics:</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} pos={pos} />
    </div>
  )
}

export default App
