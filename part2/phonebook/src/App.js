import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import Persons from './components/Persons.js'
import PersonForm from './components/PersonForm.js'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
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

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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