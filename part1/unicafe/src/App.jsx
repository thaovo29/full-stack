import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const GiveFeedback = ({handleGoodClick, handleBadClick, handleNeutralClick}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
    </div>
  )
}
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = `${good / total * 100} %`
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } 
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive}/>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }
  return (
    <div>
      <GiveFeedback 
        handleGoodClick={handleGoodClick}
        handleBadClick={handleBadClick}
        handleNeutralClick={handleNeutralClick}
      />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App