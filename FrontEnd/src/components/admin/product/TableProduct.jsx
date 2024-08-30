import { useState } from "react"
import * as React from 'react';
import EditProductDialog from "./EditProductDialog"
import ViewProductDetail from "./ViewProductDetail"
import { FaSortDown, FaSortUp } from "react-icons/fa";


const TableProduct = ({ data, types, brands, colors }) => {



  if (!data || !brands || !colors) {
    return null;
  }

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });


  const sortedProducts = React.useMemo(() => {
    if (!Array.isArray(data?.content)) {
      return [];
    }

    let sortableItems = [...data.content];

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        let cValue = a[sortConfig.key];
        let dValue = b[sortConfig.key];
        if (sortConfig.key === "brand") {
          aValue = a.brand.brandName;
          bValue = b.brand.brandName;
        }
        if (sortConfig.key === "shoeType") {
          cValue = a.shoeType.shoeTypeName;
          dValue = b.shoeType.shoeTypeName;
        }

        if(cValue < dValue){
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (cValue > dValue){
          return sortConfig.direction === "asc" ? 1 : -1;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data.content, sortConfig]);



  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };


  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return null;
  };

  const handleOpen = () => {
    setIsEditOpen(!isEditOpen)
  }



  const handleViewOpen = () => {

    setIsViewOpen(!isViewOpen)
  }




  return (
    <>
      <section className="px-4 mx-auto">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 cursor-pointer text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('shoeId')}
                      >

                        Id {getSortIcon('shoeId')}


                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Ảnh
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 cursor-pointer text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('shoeName')}
                      >
                        Tên {getSortIcon('shoeName')}
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('status')}
                      >
                        Trạng thái {getSortIcon('status')}
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('createDate')}
                      >
                        Ngày tạo {getSortIcon('createDate')}
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('priority')}
                      >
                        Ưu tiên {getSortIcon('priority')}
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('brand')}
                      >
                        Thương hiệu {getSortIcon('brand')}
                      </th>
                      <th
                        scope="col"
                        className="cursor-pointer flex  items-center px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('shoeType')}
                      >
                        Loại {getSortIcon('shoeType')}

                      </th>

                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Xem
                      </th>

                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Sửa
                      </th >
                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Xóa
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {/* Replace with dynamic content using map or similar */}
                    {sortedProducts && sortedProducts.map((properties) => {
                      return (
                        <tr key={properties.shoeId}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">

                              <span>{properties.shoeId}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <img
                              src={"http://localhost:8080/ShoeImage/Image/" + properties.defaultImage}
                              // src="../../../../public/image/images.jpg"
                              alt=""
                              className="h-12 w-12 object-cover rounded"
                            />
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                            <span>{properties.shoeName}</span>
                            {/* <span>nike</span> */}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-emerald-500"
                              >
                                <path
                                  d="M10 3L4.5 8.5L2 6"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <h2 className="text-sm font-normal">Paid</h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <span>{properties.createDate.toString()}</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {properties.priority ? (
                              <>
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                                  <span>{properties.priority.toString()}</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                  <span>{properties.priority.toString()}</span>
                                </div>
                              </>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <span>{properties.brand.brandName}</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <span>{properties.shoeType.shoeTypeName}</span>
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                            <div className="flex items-center gap-x-6 justify-center">
                              <button onClick={() => { setCurrentProduct(properties.shoeId), setIsViewOpen(true) }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Xem
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                            <div className="flex items-center gap-x-6 justify-center">
                              <button onClick={() => { setCurrentProduct(properties.shoeId), setIsEditOpen(true) }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Sửa
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                            <div className="flex items-center gap-x-6 justify-center">
                              <button onClick={() => { setCurrentProduct(properties.shoeId), setIsDeleteOpen(true) }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    {/* Repeat the above structure for each row */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </section>


      <div>

        {currentProduct && (
          <div>
            <EditProductDialog
              key={currentProduct}
              open={isEditOpen}
              handleOpen={handleOpen}
              types={types}
              brands={brands}
              colors={colors}
              productId={currentProduct}
            />
            <ViewProductDetail
              key={currentProduct}
              open={isViewOpen}
              handleOpen={handleViewOpen}
              types={types}
              brands={brands}
              productId={currentProduct}
              colors={colors}
            />
          </div>
        )}
      </div>
    </>
  )
}
export default TableProduct
