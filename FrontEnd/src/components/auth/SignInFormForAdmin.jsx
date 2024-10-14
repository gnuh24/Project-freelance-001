import { useDispatch, useSelector } from 'react-redux'
import { loginByAdminThunk } from '../../reducers/auth/LoginSlice'

const SignInFormForAdmin = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.loginReducer)
  const handleSubmitSignInForAdmin = (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    dispatch(loginByAdminThunk({ email, password }))
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-5 sm:px-10 h-[400px] rounded-3xl shadow-lg bg-white">
          <h1 className="text-center text-3xl font-bold mt-2 mb-2">Login</h1>
          <hr />
          <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmitSignInForAdmin} className="space-y-4">
              <input
                type="text"
                name="email"
                id="email"
                className="py-3 p-5 rounded-md bg-zinc-50 w-full outline-indigo-400 focus:outline-indigo-500 transition duration-200"
                placeholder="Enter your email"
              />
              <input
                type="password"
                name="password"
                id="password"
                className="py-3 p-5 rounded-md bg-zinc-50 w-full outline-indigo-400 focus:outline-indigo-500 transition duration-200"
                placeholder="Enter your password"
              />
              <button
                type="submit"
                className="py-3 bg-indigo-400 text-white w-full rounded-md font-bold hover:bg-indigo-500 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default SignInFormForAdmin
