import React from "react";

const Entries = ({persons, search, handleDel}) => (
    <div>
        <h2>Numbers</h2>
        {persons.filter(p => new RegExp(search, 'i').test(p.name))
            .map(p => <Person key={p.id} person={p} handleDelete={handleDel}/>)}
    </div>
);

const Person = ({person, handleDelete}) => {
    return (
        <div>
            <p>{person.name} {person.number}</p>
            <button onClick={() => handleDelete(person)}>Delete</button>
        </div>
    );
}

export default Entries;