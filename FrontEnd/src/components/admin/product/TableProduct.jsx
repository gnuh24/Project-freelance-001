import { useState } from "react"
import * as React from 'react';
import EditProductDialog from "./EditProductDialog"
import ViewProductDetail from "./ViewProductDetail"
import { FaSortDown, FaSortUp } from "react-icons/fa";


const TableProduct = ({ data, types, brands, colors, filterValues, onChangeFilter }) => {



  if (!data || !brands || !colors) {
    return null;
  }

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isMounted, setIsMounted] = useState(false)


  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
      if (key === "brand") {
        onChangeFilter({ ...filterValues, sort: `brandName,${direction}` })
      }
      if (key === "shoeType") { 
        onChangeFilter({ ...filterValues, sort: `shoeType,${direction}` })
      }
    }
    if (key === "brand") {
      onChangeFilter({ ...filterValues, sort: `brandName,${direction}` })
    }
    if (key === "shoeType") {
      onChangeFilter({ ...filterValues, sort: `shoeType,${direction}` })
    }
    onChangeFilter({ ...filterValues, sort: `${key},${direction}` })
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


  React.useEffect(()=> {
    if( data && types && colors && brands){
      setIsMounted(true)
    }
  },[data, types, brands, colors])

  if(!isMounted) return <div>
    <div className="w-full flex items-center justify-center">
      <div className="text-xl text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    </div>
  </div>


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

                        <div className="flex items-center justify-center gap-2">

                          Id {getSortIcon('shoeId')}
                        </div>



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
                        <div className="flex items-center justify-center gap-2">

                          Tên {getSortIcon('shoeName')}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center justify-center gap-2">

                          Trạng thái {getSortIcon('status')}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('createDate')}
                      >
                        <div className="flex items-center justify-center gap-2">

                          Ngày tạo {getSortIcon('createDate')}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('priority')}
                      >
                        <div className="flex items-center justify-center gap-2">

                          Ưu tiên {getSortIcon('priority')}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('brand')}
                      >
                        <div className="flex items-center justify-center gap-2">

                          Thương hiệu {getSortIcon('brand')}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="cursor-pointer flex  items-center px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={() => handleSort('shoeType')}
                      >
                        <div className="flex items-center justify-center gap-2">

                          Loại {getSortIcon('shoeType')}
                        </div>

                      </th>

                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Xem
                      </th>

                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Sửa
                      </th >
                    
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {/* Replace with dynamic content using map or similar */}
                    {data.length > 0 && data.map((properties) => {
                      return (
                        <tr key={properties.shoeId}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">

                              <span>{properties?.shoeId}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <img
                              src={"http://localhost:8080/ShoeImage/Image/" + properties?.defaultImage}
                              // src="../../../../public/image/images.jpg"
                              alt=""
                              className="h-12 w-12 object-cover rounded"
                            />
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                            <span>{properties?.shoeName}</span>
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
                            <span>{properties?.createDate}</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {properties.priority ? (
                              <>
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                                  <span>{properties?.priority ? 'Có' : "không"}</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                  <span>{properties?.priority ? 'Có' : "không"}</span>
                                </div>
                              </>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <span>{properties?.brand?.brandName}</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <span>{properties?.shoeType?.shoeTypeName}</span>
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
                         
                        </tr>
                      )
                    })}

                    {data.length === 0 && (
                      <div>no item</div>
                    )}
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
