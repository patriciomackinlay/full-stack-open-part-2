import { useEffect, useState } from 'react'
import countriesService from "./services/restcountries"
import Country from './components/Country'
import Notification from './components/Notification'

function App() {
  const [countries, setCountries] = useState([])
  const [searched, setSearched] = useState("")
  let notif = ""

  useEffect(() => {
    
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        alert("error when fetching")
      })
  }, [searched])

  const handleSearchChange = (event) => {
    setSearched(event.target.value.toLowerCase())
  }

  let countriesToShow = ""
  if(searched === "") {
    countriesToShow = []
  } else {
    countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searched))
    
  }

  if(countriesToShow.length > 10) {
      countriesToShow = []
      notif = "too many matches"
  } else {
    notif = ""
  }
  

  return (
   <div>
    <form>
      <input
        value={searched}
        onChange={handleSearchChange}
      />
    </form>
    <p>{notif}</p>
    <ul>
      {countriesToShow.map(country => 
        <Country key={country.name.common} name={country.name.common} />)}
    </ul>
   </div>
  )
}

export default App
