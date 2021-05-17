import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import Persons from './components/Persons.js'
import PersonForm from './components/PersonForm.js'
import service from './services/util.js'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtStr, setFiltStr ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const p = persons.find(o => o.name.includes(newName))
        const changedObj = { ...p, number: newNumber }
        service
          .update(p.id, changedObj)
          .then(returnedPerson => {
            setPersons(persons.map(o => o.id !== p.id ? o : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    const personObj = { name: newName, number: newNumber }

    service
      .create(personObj)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
  }


  const deletePerson = (name, id) => {
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        service
          .del(id)
          .then(() => {
            setPersons(persons.filter(o => o.id !== id))
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
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
    service
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filtCond={filtStr} handler={handleFiltStrChange} />

      <h3>Add a new</h3>

      <PersonForm addNew={addPerson} newName={newName} nameHandler={handleNameChange} newNumber={newNumber} numHandler={handleNumberChange} />

      <h3>Numbers</h3>

      <table>
        <tbody>
          <Persons persons={persons} filtStr={filtStr} deletePerson={deletePerson} />
        </tbody>
      </table>
      
    </div>
  )
}

export default App