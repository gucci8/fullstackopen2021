const LoginForm = (props) => (
    <form onSubmit={props.login}>
      <div>
        username
        <input
          value={props.username}
          onChange={props.usernameHandler}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={props.password}
          onChange={props.passwordHandler}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
  
  export default LoginForm;
  