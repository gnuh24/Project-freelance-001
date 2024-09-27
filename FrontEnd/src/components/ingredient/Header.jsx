import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserThunk } from '../../reducers/auth/LogoutSlice'
import { setSearch } from '../../reducers/productReducer/ShoeSlice'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [descriptionSale, setDescriptionSale] = useState('khuyến mãi sale 70%')
  const [isOpenDropdown, setOpenDropdown] = useState(false)

  const dispatch = useDispatch()
  const { status: statusLogout, error: errorLogout } = useSelector(
    (state) => state.logoutReducer,
  )
  const { data } = useSelector((state) => state.events)

  useEffect(() => {
    if (location.pathname === '/events') {
      setDescriptionSale(data?.eventName)
    }
  }, [data, location])

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

  return (
    <div className="bg-black fixed w-full" style={{ zIndex: 100000000000 }}>
      <div className="container mx-auto flex items-center justify-between py-4">
        <div>
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            Hotline: 0123456789
          </span>
        </div>
        <div>
          <h1 className="text-red-500 text-shadow-3d-white-left-up text-4xl font-bold uppercase">
            {descriptionSale}
          </h1>
        </div>
        <div className="flex align-text-center md:order-2 ">
          <form className="relative block">
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
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="bạn cần tìm gì..."
              type="text"
              name="search"
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </form>
          {localStorage.getItem('token') === null ? (
            <Link to="/signIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-8 h-auto ml-8 cursor-pointer fill-current text-white"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </Link>
          ) : (
            <div className="relative">
              <div
                onClick={() => setOpenDropdown(!isOpenDropdown)}
                className="cursor-pointer ml-8 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
              >
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
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
                        type="button"
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
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="w-10 h-10 ml-8 cursor-pointer fill-current text-white"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H32c-18 0-32.2-14.1-32.2-32.1 0-18 15-32.1 32-32.1h32L64 32c0-22.1 17.9-40 40-40h49.6c4.5 0 8.8 .9 12.9 2.6l96 32c16.1 5.3 33.1 1.2 45.8-11.3l74.2-67.8c4-3.7 8.9-5.6 13.7-5.6c2.5 0 5 .4 7.4 1.3l87.6 36.3c7.2 3 12.4 10.5 12.4 18.1v16.2 48c0 3.3 1.5 6.4 4.1 8.4c2.8 2.2 6.6 3 10.3 1.6l87.1-33.5c16.1-5.3 33.1-1.2 45.8 11.3l74.2 67.8c4 3.7 8.9 5.6 13.7 5.6c2.5 0 5-.4 7.4-1.3l87.6-36.3c7.2-3 12.4-10.5 12.4-18.1v-16.2c0-5.4 2.7-10.6 7.4-13.6l46.4-27.6c11-6.6 15.3-21.2 8.7-32.8l-50-86.4c-3.4-5.8-10.1-9.3-17-9.3h-64.4c-5.7 0-10.9-4-12.7-9.6l-31.2-94.5c-3.8-11.6-14.7-19.6-26.8-19.6h-18.7c-1.6 0-3.1 .2-4.7 .6L272 0c-22.1 0-40 17.9-40 40v45.2L184.8 49.7C166.5 46.8 147.2 55.2 144.6 73.6L120 176H32c-18 0-32.2 14.1-32.2 32.1z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
