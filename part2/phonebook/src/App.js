import React, { useState } from 'react'

const Filter = (props) => (
  <form>
    filter shown with <input value={props.filtCond} onChange={props.handler} />
  </form>
)

const PersonForm = (props) => (
  <form onSubmit={props.addNew}>
    <div>name: <input value={props.newName} onChange={props.nameHandler} /></div>
    <div>number: <input value={props.newNumber} onChange={props.numHandler} /></div>
    <button type="submit">add</button>
  </form>
)

const Persons = (props) => {
  const filtered = props.persons.filter(p => p.name.toLowerCase().includes(props.filtStr.toLowerCase()))

  return (
    filtered.map(person =>
      <p key={person.name}>{person.name} {person.number}</p>
    )
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtStr, setFiltStr ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      window.alert(`${newName} is already added to the phonebook.`)
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFiltStrChange = (event) => {
    setFiltStr(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filtCond={filtStr} handler={handleFiltStrChange} />

      <h3>Add a new</h3>

      <PersonForm addNew={addPerson} newName={newName} nameHandler={handleNameChange} newNumber={newNumber} numHandler={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={persons} filtStr={filtStr} />
    </div>
  )
}

export default App