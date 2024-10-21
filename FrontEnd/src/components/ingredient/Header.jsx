import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserThunk } from '../../reducers/auth/LogoutSlice'
import { FaHome, FaRegUserCircle } from 'react-icons/fa'
import { getCurrentEvent } from '../../reducers/eventReducer/EventSlice'

const Header = () => {
  const [descriptionSale, setDescriptionSale] = useState(null)
  const [isOpenDropdown, setOpenDropdown] = useState(false)
  const [flagCheckAccount, setFlagCheckAccount] = useState(false)

  const dispatch = useDispatch()
  const { status: statusLogout, error: errorLogout } = useSelector(
    (state) => state.logoutReducer,
  )
  const { data } = useSelector((state) => state.events)

  useEffect(() => {
    setDescriptionSale(data?.eventName)
  }, [data])

  useEffect(() => {
    dispatch(getCurrentEvent())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUserThunk())
  }

  useEffect(() => {
    if (statusLogout === 'succeededLogoutUserThunk') {
      setFlagCheckAccount(false)
    } else if (sessionStorage.getItem('token')) {
      setFlagCheckAccount(true)
    }
  }, [statusLogout, sessionStorage.getItem('token')])

  console.log(sessionStorage.getItem('token'))

  return (
    <div className="bg-black fixed w-full" style={{ zIndex: 100000000000 }}>
      <div className="container mx-auto flex items-center justify-between py-4 flex-col sm:flex-row">
        <div className="mb-2 sm:mb-0">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            Hotline: 0704.411.832
          </span>
        </div>
        <div className="mb-2 sm:mb-0 text-center">
          <h1 className="text-red-500 text-shadow-3d-white-left-up text-2xl sm:text-4xl font-bold uppercase">
            {descriptionSale}
          </h1>
        </div>
        <div className="flex items-center justify-between w-full sm:w-auto">
          {!flagCheckAccount ? (
            <Link to="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-8 h-auto ml-4 cursor-pointer fill-current text-white"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </Link>
          ) : (
            <div className="relative ml-4">
              <FaRegUserCircle
                onClick={() => setOpenDropdown(!isOpenDropdown)}
                className="cursor-pointer w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
              ></FaRegUserCircle>
              {isOpenDropdown && (
                <div className="absolute -right-32 z-10 mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Tài khoản
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pageCart"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Giỏ hàng
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/listOrderByUser"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Danh sách đơn hàng
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleLogout}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          <Link to="/" className="ml-4">
            <FaHome className="cursor-pointer w-10 h-10 overflow-hidden text-white" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
