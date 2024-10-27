import { useDispatch, useSelector } from 'react-redux'
import { loginByAdminThunk, resetState } from '../../reducers/auth/LoginSlice'
import { useEffect } from 'react'
import { alertError } from '../sweeetalert/sweetalert'

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
  useEffect(() => {
    if (error) {
      alertError(error?.detailMessage)
      dispatch(resetState())
    }
  }, [error])
  return (
    <>
      <section className="flex items-center container w-full h-[100vh] max-w-md mx-auto">
        <div className="w-full bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-black">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Đang nhập
              </h1>
            </div>

            <div className="mt-5">
              <form className="w-full" onSubmit={handleSubmitSignInForAdmin}>
                <div className="grid gap-y-4">
                  {/* Email input */}
                  <div>
                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                      Địa chỉ email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-black focus:ring-black shadow-sm"
                      placeholder="Nhập Email"
                      required
                    />
                  </div>

                  {/* Password input */}
                  <div>
                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-black focus:ring-black shadow-sm"
                      placeholder="Nhập mật khẩu"
                      required
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default SignInFormForAdmin
