import React from "react";

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((p) => (
        <Part key={p.id} part={p} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  const sum = course.parts.reduce(
    (accumulator, part) => accumulator + part.exercises,
    0
  );
  return <p>Number of exercises {sum}</p>;
};

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
);

export default Course;
