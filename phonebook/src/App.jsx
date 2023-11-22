import { useState } from 'react'
import Contact from "./components/Contact"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (e) => {
    e.preventDefault()
    
    let found = persons.find(person => person.name === newName)
    if (found === undefined) {
      const newPerson = {
        name: newName,
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }

  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange} />
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
        <Contact name={person.name} key={person.name} />
        )}
    </ul>
    </div>
  )
}

export default App