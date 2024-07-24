import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoginApiThunk } from '../../reducers/auth/LoginSlice'

const SignInForm = ({ show, onClose }) => {
  const emailInputRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.loginReducer)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(LoginApiThunk({ email, password }))
  }

  return (
    <Modal
      show={show}
      size="md"
      popup
      onClose={onClose}
      initialFocus={emailInputRef}
    >
      <Modal.Header />
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              ref={emailInputRef}
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <a
              href="#"
              className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
            >
              Lost Password?
            </a>
          </div>
          <div className="w-full">
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in to your account'}
            </Button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <Link
              to="/signUp"
              className="text-cyan-700 hover:underline dark:text-cyan-500"
            >
              Create account
            </Link>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
export default SignInForm
