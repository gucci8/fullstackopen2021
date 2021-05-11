const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const sum = course.parts
    .map((p) => p.exercises)
    .reduce((acc, curr) => acc + curr);
  return <h3>total of {sum} exercises</h3>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
      <Total course={course} />
    </div>
  );
};

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
  </div>
);

export default Course