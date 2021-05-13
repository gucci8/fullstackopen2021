const Filter = (props) => (
  <form>
    filter shown with <input value={props.filtCond} onChange={props.handler} />
  </form>
);

export default Filter;
