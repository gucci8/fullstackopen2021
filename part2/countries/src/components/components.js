const Countries = (props) => {
  const filtered = props.countries.filter((p) =>
    p.name.toLowerCase().includes(props.filtStr.toLowerCase())
  );
  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filtered.length === 1) {
    const c = filtered[0];
    return (
      <Country
        name={c.name}
        capital={c.capital}
        population={c.population}
        languages={c.languages}
        flag={c.flag}
      />
    );
  }

  return filtered.map((c) => <p key={c.name}>{c.name}</p>);
};

const Country = (props) => (
  <div>
    <h2>{props.name}</h2>
    <p>Capital: {props.capital}</p>
    <p>Population: {props.population}</p>
    <h3>Languages:</h3>
    <ul>
      <Languages languages={props.languages} />
    </ul>
    <img src={props.flag} alt="Flag" width="250" height="150" />
  </div>
);

const Languages = (props) => {
  return props.languages.map((l) => <li key={l.name}>{l.name}</li>);
};

export default Countries;