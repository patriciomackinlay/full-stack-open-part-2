import { useEffect, useState } from 'react'
import countriesService from "./services/restcountries"
import Country from './components/Country'
import Notification from './components/Notification'
import CountryFull from './components/CountryFull'

function App() {
  const [countries, setCountries] = useState([])
  const [searched, setSearched] = useState("")
  let countryFull = {}
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
  
  let countryFullName = ""
  let countryFullCapital = []
  let countryFullArea = ""
  let countryFullLanguages = []
  let countryFullFlag = ""

  if(countriesToShow.length === 1) {
    countryFull = countriesToShow[0]
    countriesToShow= []
    countryFullName = countryFull.name.common
    countryFullCapital = countryFull.capital
    countryFullArea = countryFull.area
    countryFullLanguages = Object.values(countryFull.languages)
    countryFullFlag = countryFull.flag
    console.log(countryFullName, countryFullCapital, countryFullArea, countryFullLanguages, countryFullFlag)
  }

  const handleShowCountry = (country) => {
    countriesToShow = [country]
    console.log(countriesToShow)
    setCountries(countriesToShow)
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
          <Country key={country.name.common} name={country.name.common} country={country} show={() => handleShowCountry (country)}/>
      )}
    </ul>
    <CountryFull name={countryFullName} capital={countryFullCapital} area={countryFullArea} languages={countryFullLanguages} flag={countryFullFlag}/>
   </div>
  )
}

export default App
