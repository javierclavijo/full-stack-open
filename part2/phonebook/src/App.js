import React, {useState, useEffect} from 'react';
import {getPersons, postPerson, deletePerson, updatePerson} from './services/persons.js';
import Entries from "./components/Entries";
import {PersonSearch, NewEntryForm} from "./components/Forms";

const Notification = ({message, color}) => {
    const style = {
        color: color,
        background: 'whitesmoke',
        fontSize: 20,
        borderStyle: `solid`,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        style.display = 'none'
    }

    return (
        <span style={style}>{message}</span>
    );
}

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');
    const [notification, setNotification] = useState({message: null, color: 'green'});

    useEffect(() => getPersons()
        .then(response => setPersons(response)), []
    );

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
                .catch(() => showNotification(`'${person.name}' was already deleted from server.`, 'red'))
        }
    }

    function showNotification(message, color) {
        setNotification({...notification, message: message, color: color});
        setTimeout(() => setNotification({...notification, message: null}), 4000)
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
            showNotification(`Changed number of '${newName}'`, 'green');
        } else {
            postPerson(newPerson)
                .then(response => {
                    setPersons(persons.concat(response));
                    showNotification(`Added '${newName}'`, 'green');
                })
                .catch(err => {
                    showNotification(err.response.data.error, 'red');
                })
        }
        setNewNumber('');
        setNewName('');
    }


    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={notification.message} color={notification.color}/>
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