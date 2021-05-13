const PersonForm = (props) => (
  <form onSubmit={props.addNew}>
    <div>
      name: <input value={props.newName} onChange={props.nameHandler} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.numHandler} />
    </div>
    <button type="submit">add</button>
  </form>
);

export default PersonForm;
