import { useRef, useState } from 'react'
import SignInForm from '../auth/SignInForm'

const Header = () => {
  const [descriptionSale, setDescriptionSale] = useState(
    'khuyen mai sale 70% cho sản phẩm',
  )
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="bg-black">
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
          <form className="relative block" action="" method="">
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-6 h-6"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>{' '}
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="bạn cần tìm gì..."
              type="text"
              name="search"
            />
          </form>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-8 h-auto ml-8 cursor-pointer fill-current text-white"
            onClick={() => setOpenModal(true)}
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="w-8 h-auto ml-8 cursor-pointer fill-current text-white"
          >
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
          </svg>
        </div>
      </div>
      <SignInForm show={openModal} onClose={() => setOpenModal(false)} />
    </div>
  )
}

export default Header
