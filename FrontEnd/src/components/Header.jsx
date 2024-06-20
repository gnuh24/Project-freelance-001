import { Avatar, Dropdown, FloatingLabel, Navbar } from 'flowbite-react'
import { useState } from 'react'
import ToggleThemeButton from './Button/ToggleThemeButton'

const Header = () => {
  const [descriptionSale, setDescriptionSale] = useState('khuyen mai')

  return (
    // <header className="bg-gray-800 text-white">
    //   <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    //     <div className="text-xl font-bold hotline">hotline: 0123456789</div>
    //    <div className="flex items-center programSale">{descriptionSale}</div>
    //     <div className="flex items-center search">
    //       <FloatingLabel variant="outlined" label="Label" />
    //     </div>
    //     <div className="flex items-center feature"></div>
    //   </div>
    // </header>
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          href="https://flowbite.com"
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
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
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
