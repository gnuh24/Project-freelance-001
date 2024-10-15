import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginByUserThunk } from '../../reducers/auth/LoginSlice'
import { Link } from 'react-router-dom'
import { alertError } from '../sweeetalert/sweetalert'

const SignInFormForUser = () => {
  const emailInputRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { status, error } = useSelector((state) => state.loginReducer)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginByUserThunk({ email, password }))
  }

  const LoginWithGoogle = () => {
    const authUrl = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`
    window.location.href = authUrl
  }

  const LoginWithFacebook = () => {
    const authUrl = `${import.meta.env.VITE_API_URL}/oauth2/authorization/facebook`
    window.location.href = authUrl
  }

  useEffect(() => {
    console.log('loading', status)
    if (status === 'failed') {
      if (error) {
        alertError('Email hoặc mật khẩu không đúng')
      }
    }
  }, [status, error])

  return (
    <section className="mt-10">
      <div className="container h-full px-6 py-24">
        <div className="w-full mx-auto">
          <div className="flex justify-center items-center">
            <form className="w-1/2" onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Email address
                </label>
                <input
                  ref={emailInputRef}
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password input */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Remember me checkbox */}
              <div className="mb-6 flex items-center justify-between">
                {/* Terms and conditions link */}
                <Link
                  to="/signUp"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Chưa có tài khoản
                </Link>
                <Link
                  to="/forgetPassword"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Đăng nhập
              </button>

              {/* Error message */}
              {/* {error && ( */}
              {/*   <div className="mt-4 text-center text-red-500"> */}
              {/*     {error.message} */}
              {/*   </div> */}
              {/* )} */}

              {/* Divider */}
              <div className="my-4 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <p className="mx-4 mb-0 text-center font-semibold">OR</p>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Social login buttons */}
              <button
                onClick={() => LoginWithFacebook()}
                className="mb-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                style={{ backgroundColor: '#3b5998' }}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                Continue with Facebook
              </button>
              <button
                type="button"
                onClick={() => {
                  LoginWithGoogle()
                }}
                className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInFormForUser
