import React, { useState } from 'react'

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>
    {text}
  </button>
)

const Statistics = (props) => {
  const all = props.good+props.neutral+props.bad
  const avg = (props.good-props.bad)/all
  const pos = 100*props.good/all

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
      <Statistic text={'Good'} value={props.good} />
      <Statistic text={'Neutral'} value={props.neutral} />
      <Statistic text={'Bad'} value={props.bad} />
      <Statistic text={'All'} value={all} />
      <Statistic text={'Average'} value={avg} />
      <Statistic text={'Positive'} value={pos} unit={' %'} />
      </tbody>
    </table>
  )
}

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}{props.unit}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback:</h1>
      <div>
        <Button clickHandler={() => setGood(good + 1)} text={'Good'} />
        <Button clickHandler={() => setNeutral(neutral + 1)} text={'Neutral'} />
        <Button clickHandler={() => setBad(bad + 1)} text={'Bad'} />
      </div>
      <h1>Statistics:</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
