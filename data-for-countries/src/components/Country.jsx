const Country = (props) => {
    return (
        <li>{props.name} <button onClick={props.show}>show</button></li>
    )
}
export default Country