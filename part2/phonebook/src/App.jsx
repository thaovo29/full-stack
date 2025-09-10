import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [noti, setNoti] = useState(null)
  useEffect(() => {
    personService.getPersons().then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        personService
          .updatePerson(person.id, { ...person, number: newNumber })
          .then(returnedPerson => {
            setNoti({isError: false, message: `Updated ${returnedPerson.name}'s number`})
            setTimeout(() => {
              setNoti(null)
            }, 5000)
            setPersons(persons.map(p => (p.id !== person.id ? p : returnedPerson)))
            setFilteredPersons(filteredPersons.map(p => (p.id !== person.id ? p : returnedPerson)))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            if (error.response?.status === 404) {
              setNoti({isError: true, message: `Information of ${person.name} has already been removed from server`})
              setTimeout(() => {
                setNoti(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== person.id))
              setFilteredPersons(filteredPersons.filter(p => p.id !== person.id))
            }
          })
      }
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    personService
    .addPerson(nameObject)
    .then(returnedPerson => {
      setNoti({isError: false, message: `Added ${returnedPerson.name}`})
      setTimeout(() => {
        setNoti(null)
      }, 5000)
      setPersons(persons.concat(returnedPerson))
      setFilteredPersons(filteredPersons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })

  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setFilteredPersons(filteredPersons.filter(person => person.id !== id))
      })
      .catch(error => {
        setNoti({isError: true, message: `Information of ${person.name} has already been removed from server`})
        setTimeout(() => {
          setNoti(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
        setFilteredPersons(filteredPersons.filter(p => p.id !== person.id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification  message={noti} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson} 
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App