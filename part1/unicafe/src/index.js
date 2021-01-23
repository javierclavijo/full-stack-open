import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ stats }) => {
  const good = stats.good;
  const neutral = stats.neutral;
  const bad = stats.bad;

  const all = good + bad + neutral;
  const average = (good - bad) / (good + bad + neutral);
  const positive = (good / (good + bad + neutral)) * 100;

  if (all === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={all} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive (%)" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ text, setter }) => {
  return <button onClick={setter}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (stat, callback) => {
    callback(stat + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button setter={() => handleClick(good, setGood)} text="Good" />
      <Button setter={() => handleClick(neutral, setNeutral)} text="Neutral" />
      <Button setter={() => handleClick(bad, setBad)} text="Bad" />
      <Statistics stats={{ good, neutral, bad }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
