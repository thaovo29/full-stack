import Weather from "./Weather"

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages:</h2>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={`flag of ${country.name.common}`} width="150" />
            <Weather name={country.name.common} lat={country.latlng[0]} lon={country.latlng[1]} />
        </div>
    )
}

export default Country