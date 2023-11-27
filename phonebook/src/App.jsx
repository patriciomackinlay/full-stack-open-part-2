import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  const filteredPhonebook = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addContact = (e) => {
    e.preventDefault()
    let found = persons.find(person => person.name === newName)
    if (found === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
    else {
      alert(`${newName} has already been added to the phonebook`)
    }

  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleChange={handleFilterChange}/>
      <h2>Add new contact</h2>
      <PersonForm addContact= {addContact} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons phonebook={filteredPhonebook} />
      </div>
  )
}

export default App