import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/components.js'

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filtStr, setFiltStr ] = useState('')

  const api_key = process.env.REACT_APP_API_KEY

  const handleFiltStrChange = (event) => {
    setFiltStr(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  return (
    <div>
      <form>
        find countries <input value={filtStr} onChange={handleFiltStrChange} />
      </form>
      <Countries countries={countries} filtStr={filtStr} />
    </div>
  )
}

export default App