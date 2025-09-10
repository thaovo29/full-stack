const url = 'http://localhost:3001/persons'
import axios from 'axios'

const getPersons = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const addPerson = (newObject) => {
    const request = axios.post(url, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}
const updatePerson = (id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getPersons, addPerson, deletePerson, updatePerson }