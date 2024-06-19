import { useState } from 'react'

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState(null)
  // const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // await signUp({ email, password, passwordConfirmation })
      history.push('/')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Password Confirmation</label>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  )
}
export default SignUpForm
