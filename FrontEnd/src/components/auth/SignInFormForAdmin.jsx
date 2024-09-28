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
      <div className="flex justify-center items-center h-screen">
        <div className="xl:w-[700px] px-10 h-[400px] rounded-3xl xl:shadow-xl">
          <h1 className="text-center text-3xl font-bold mt-2 mb-2">Login</h1>
          <hr />
          <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmitSignInForAdmin}>
              <input
                type="text"
                name="email"
                id="email"
                className="py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-indigo-400"
                placeholder="Enter your email"
              />
              <br></br>
              <input
                type="password"
                name="password"
                id="password"
                className="py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-indigo-400"
                placeholder="Enter your password"
              />

              <button
                type="submit"
                className="py-3 bg-indigo-400 text-white w-full rounded-md font-bold"
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
