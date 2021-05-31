import Notification from './Notification'

const LoginForm = ({
  login,
  username,
  password,
  usernameHandler,
  passwordHandler,
  errorMessage
}) => (
  <div>
    <h2>Log in to application</h2>
    <Notification message={errorMessage.msg} color={errorMessage.color} />
    <form onSubmit={login}>
      <div>
        username
        <input value={username} onChange={usernameHandler} />
      </div>
      <div>
        password
        <input type="password" value={password} onChange={passwordHandler} />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm
