const Person = (props) => (
  <tr key={props.person.id}>
    <td>{props.person.name}</td>
    <td>{props.person.number}</td>
    <td><button onClick={props.deletePerson}>delete</button></td>
  </tr>
)

const Persons = (props) => {
  const filtered = props.persons.filter((p) =>
    p.name.toLowerCase().includes(props.filtStr.toLowerCase())
  )

  return (
    <table>
      <tbody>
        {filtered.map((person) =>
          <Person key={person.id} person={person} deletePerson={props.deletePerson(person.name, person.id)} />
        )}
      </tbody>
    </table>
    
  )
}

export default Persons;
