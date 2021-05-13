const Persons = (props) => {
  const filtered = props.persons.filter((p) =>
    p.name.toLowerCase().includes(props.filtStr.toLowerCase())
  );

  return filtered.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));
};

export default Persons;
