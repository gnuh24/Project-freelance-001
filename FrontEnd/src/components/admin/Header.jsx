import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import ToggleThemeButton from '../ingredient/ToggleThemeButton.jsx'
import { logoutUserThunk } from '../../reducers/auth/LogoutSlice.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export function HeaderDashboard() {
  const dispatch = useDispatch()
  const { status: statusLogout, error: errorLogout } = useSelector(
    (state) => state.logoutReducer,
  )
  const handleLogout = () => {
    dispatch(logoutUserThunk())
  }
  useEffect(() => {
    if (statusLogout === 'succeededLogoutUserThunk') {
      window.location.href = '/admin'
    }
  }, [statusLogout])
  return (
    <Navbar fluid className="fixed w-full z-30">
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Big Boys Sneaker Big Size
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <ToggleThemeButton />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="../../../public/image/logo/LOGO.png"
              rounded
            />
          }
        >
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  )
}
