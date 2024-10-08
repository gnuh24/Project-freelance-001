import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserThunk } from '../../reducers/auth/LogoutSlice'
import { setSearch } from '../../reducers/productReducer/ShoeSlice'
import { FaHome, FaRegUserCircle } from 'react-icons/fa'
import Cookies from 'js-cookie'
import { getCurrentEvent } from '../../reducers/eventReducer/EventSlice'

const Header = () => {
  const navigate = useNavigate()
  const [descriptionSale, setDescriptionSale] = useState(null)
  const [isOpenDropdown, setOpenDropdown] = useState(false)

  const dispatch = useDispatch()

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

  const [searchValue, setSearchValue] = useState('')
  const handleSearch = () => {
    console.log(searchValue)
    dispatch(setSearch(searchValue))
    if (location.pathname !== '/pageProduct') {
      navigate('/pageProduct')
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  console.log(data)

  return (
    <div className="bg-black fixed w-full" style={{ zIndex: 100000000000 }}>
      <div className="container mx-auto flex items-center justify-between py-4 flex-col md:flex-row">
        <div className="mb-2 md:mb-0">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            Hotline: 0704.411.832
          </span>
        </div>
        <div className="mb-2 md:mb-0 text-center">
          <h1 className="text-red-500 text-shadow-3d-white-left-up text-2xl md:text-4xl font-bold uppercase">
            {descriptionSale}
          </h1>
        </div>
        <div className="flex items-center justify-between w-full md:w-auto">
          <form
            className="relative w-full md:w-auto md:flex-grow"
            onSubmit={(e) => e.preventDefault()}
          >
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-6 h-6"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full md:w-64 border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="bạn cần tìm gì..."
              type="text"
              name="search"
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </form>
          {!Cookies.get('token') ? (
            <Link to="/signIn">
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
