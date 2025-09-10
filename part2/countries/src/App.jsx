import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries.jsx'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [newFilter, setNewFilter] = useState('')
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const match = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredCountries(match)
  }
  const handleShowDetails = (country) => {
    setFilteredCountries([country])
  }
  return (
    <div>
      <div>
        find countries <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <Countries countries={filteredCountries} handleShowDetails={handleShowDetails} />
    </div>
  )
}

export default App
