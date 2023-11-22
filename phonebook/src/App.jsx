import { useState } from 'react'
import Contact from "./components/Contact"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  const filteredPhonebook = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

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
      <div>
          filter: <input
          value={newFilter}
          onChange={handleFilterChange} />
        </div>
      <h2>Add new contact</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button 
          type="submit"
          >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    <ul>
      {filteredPhonebook.map(person =>
        <Contact name={person.name} key={person.name} number={person.number} />
        )}
    </ul>
    </div>
  )
}

export default App