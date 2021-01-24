import React, { useState } from "react";
import ReactDOM from "react-dom";

const Votes = ({ props }) => {
  const maxVotes = props.votes.indexOf(Math.max.apply(null, props.votes));
  if (props.votes.every((e) => e === 0)) {
    return (
      <div>
        <h1>Anecdote with the most votes</h1>
        <p>No votes yet</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[maxVotes]}</p>
    </div>
  );
};

const AnecdoteOfTheDay = ({ anecdote, votes }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
    </div>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  function nextAnecdote() {
    let newState = selected;
    while (newState === selected) {
      newState = Math.floor(Math.random() * props.anecdotes.length);
    }
    setSelected(newState);
  }

  function voteAnecdote() {
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  return (
    <div>
      <AnecdoteOfTheDay
        anecdote={props.anecdotes[selected]}
        votes={votes[selected]}
      />
      <button onClick={voteAnecdote}>Vote</button>
      <button onClick={nextAnecdote}>Next anecdote</button>
      <Votes props={{ anecdotes, votes }} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
