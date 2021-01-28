import React, {useState, useEffect} from 'react';
import axios from "axios";


const Input = ({name, value, onChange}) => {
    return <div>{name}: <input value={value} onChange={onChange}/></div>
}

const NewEntryForm = (props) => (
    <div>
        <h2>Add a new entry</h2>
        <form onSubmit={props.handleSubmit}>
            <Input name={"Name"} value={props.newName} onChange={props.handleNewName}/>
            <Input name={"Number"} value={props.newNumber} onChange={props.handleNewNumber}/>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </div>
);

const Entries = ({persons, search}) => (
    <div>
        <h2>Numbers</h2>
        {persons.filter(p => new RegExp(search, 'i').test(p.name))
            .map(p => <p key={p.name}>{p.name} {p.number}</p>)}
    </div>
);

const PersonSearch = ({search, handleSearch}) => (
    <div>
        <h2>Search</h2>
        <Input name={"Query"} value={search} onChange={handleSearch}/>
    </div>
)

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() =>
        axios
            .get("http://localhost:3001/db")
            .then(response => setPersons(response.data.persons)), []
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

    function handleSubmit(event) {
        const newPerson = {
            name: newName,
            number: newNumber
        }
        event.preventDefault();
        if (persons.findIndex(o => o.name === newName) !== -1) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewNumber('');
        }
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
            <Entries persons={persons} search={search}/>
        </div>
    )
}

export default App