import { useState } from 'react'
import TableColor from '../../components/admin/color/TableColor'
import FormColor from '../../components/admin/color/FormColor'

const Color = () => {
  const [openModal, setOpenModal] = useState(true)
  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  return (
    <>
      <div className="h-[90.2vh]">
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
          <div className="w-full mb-1">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                All Colors
              </h1>
            </div>
            <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div className="flex items-center mb-4 sm:mb-0">
                <form className="sm:pr-3" action="#" method="GET">
                  <label htmlFor="colors-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                    <input
                      type="text"
                      name="search"
                      id="colors-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search..."
                      onChange={handleSearch}
                    />
                  </div>
                </form>
              </div>
              <div className="ml-1 sm:ml-2">
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-blue-600 text-white flex items-center py-3 px-4 rounded-lg"
                >
                  <i className="fa-solid fa-plus text-center mr-2"></i>
                  <span>Add Color</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <TableColor search={search} />
        <FormColor openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </>
  )
}

export default Color
