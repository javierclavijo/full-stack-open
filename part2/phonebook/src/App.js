import React, {useState, useEffect} from 'react';
import {getPersons, postPerson, deletePerson, updatePerson} from './services/persons.js';
import Entries from "./components/Entries";
import {PersonSearch, NewEntryForm} from "./components/Forms";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => getPersons()
        .then(response => setPersons(response)), []
    )

    function handleNewName(event) {
        setNewName(event.target.value);
    }

    function handleNewNumber(event) {
        setNewNumber(event.target.value);
    }

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    function handleDelete(person) {
        if (window.confirm(`Delete ${person.name}?`)) {
            deletePerson(person.id)
                .then(response => setPersons(response))
                .catch(() => alert(`The person ${person.name} was already deleted from server.`))
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber
        }

        let personInDB = persons.find(p => p.name === newName);

        if (personInDB !== undefined && window.confirm(`${newPerson.name} is already in the phonebook, replace the old number with a new one?`)) {
            updatePerson(newPerson, personInDB.id)
                .then(response => {
                    setPersons(response);
                });
        } else {
            postPerson(newPerson)
                .then(response => {
                    setPersons(persons.concat(response));
                });
        }
        setNewNumber('');
        setNewName('');
    }


    return (
        <div>
            <h1>Phonebook</h1>
            <PersonSearch search={search} handleSearch={handleSearch}/>
            <NewEntryForm
                handleSubmit={handleSubmit}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}/>
            <Entries persons={persons} search={search} handleDel={handleDelete}/>
        </div>
    );
}

export default App;