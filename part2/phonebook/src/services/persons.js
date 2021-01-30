import axios from 'axios';

const URL = "http://localhost:3001/persons";

export const getPersons = () => (
    axios.get(URL)
        .then(response => response.data)
);

export const postPerson = (person) => (
    axios
        .post(URL, person)
        .then(response => response.data)
)

export const deletePerson = (id) => (
    axios
        .delete(`${URL}/${id}`)
        .then(() => getPersons())
);

export const updatePerson = (newPerson, id) => (
    axios
        .put(`${URL}/${id}`, newPerson)
        .then(() => getPersons())
);