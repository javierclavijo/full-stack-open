import React from "react";

export const NewEntryForm = (props) => (
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

export const PersonSearch = ({search, handleSearch}) => (
    <div>
        <h2>Search</h2>
        <Input name={"Query"} value={search} onChange={handleSearch}/>
    </div>
)

const Input = ({name, value, onChange}) => {
    return <div>{name}: <input value={value} onChange={onChange}/></div>
}