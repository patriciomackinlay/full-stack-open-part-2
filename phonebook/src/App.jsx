import { useState } from 'react'
import Contact from "./components/Contact"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "040-1234567",
   }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState("")

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person =>
        <Contact name={person.name} key={person.name} number={person.number} />
        )}
    </ul>
    </div>
  )
}

export default App