const CountryFull = ({ name, capital, area, languages, flag }) => {
    const flagStyle = {
        fontSize: 100
    }
    if (name === "") {
        return(
            <></>
        )
    }
    return (
        <div>
            <h1>{name}</h1>
            <p>Capital city: {capital[0]}</p>
            <p>Area: {area} km2</p>
            <h3>Languages</h3>
            <ul>

                {languages.map(lang => <li>{lang}</li>)}
            </ul>
            <div style={flagStyle}>{flag}</div>
        </div>
    )
}

export default CountryFull