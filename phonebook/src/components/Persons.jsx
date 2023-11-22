import Contact from "./Contact"

const Persons = (props) => {
    return (
        <ul>{
        props.phonebook.map(person =>
            <Contact name={person.name} key={person.name} number={person.number} />
        )}
        </ul>
    )
}

export default Persons