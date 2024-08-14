const PagingProduct = ({
  totalPages,
  pageNumber,
  onFilterSearchPagination,
}) => {
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages && newPage !== pageNumber) {
      onFilterSearchPagination({ pageNumber: newPage })
    }
  }

  const handlePreviousClick = () => {
    console.log('pageNumber', pageNumber)
    if (pageNumber > 1) {
      handlePageChange(pageNumber - 1)
    }
  }

  const handleNextClick = () => {
    console.log('pageNumber', pageNumber)
    if (pageNumber < totalPages) {
      handlePageChange(pageNumber + 1)
    }
  }

  return (
    <>
      <nav className="flex justify-center items-center mt-4">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              type="button"
              onClick={handlePreviousClick}
              disabled={pageNumber === 1}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1}>
              <button
                type="button"
                onClick={() => handlePageChange(i + 1)}
                className={`flex items-center justify-center px-4 h-10 leading-tight ${
                  pageNumber === i + 1
                    ? 'text-blue-600 bg-blue-100'
                    : 'text-gray-500 bg-white'
                } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={handleNextClick}
              disabled={pageNumber === totalPages}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default PagingProduct
