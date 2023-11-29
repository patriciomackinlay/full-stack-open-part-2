import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import personService from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  const filteredPhonebook = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('fail')
      })
  }, [])

  const addContact = (e) => {
    e.preventDefault()
    let found = persons.find(person => person.name === newName)
    if (found === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          console.log('fail')
        })
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

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
          .deletePerson(id)
          .catch(error => {
            console.log('fail')
          })
      setPersons(persons.filter(person => person.id !== id))
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleChange={handleFilterChange}/>
      <h2>Add new contact</h2>
      <PersonForm addContact= {addContact} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons phonebook={filteredPhonebook} handleDelete={handleDelete}/>
      </div>
  )
}

export default App