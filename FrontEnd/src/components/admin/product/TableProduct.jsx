import { useState, useMemo } from 'react';
import * as React from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

const TableProduct = ({
  products,
  filterValues,
  onChangeFilter,
}) => {
  if (!products) {
    return null;
  }

  const handleSort = (field) => {
    onChangeFilter((prev) => {
      const [currentField, currentDirection] = prev.sort.split(',');
      const newDirection = currentField === field && currentDirection === 'asc' ? 'desc' : 'asc';
      return { ...prev, sort: `${field},${newDirection}` };
    });
  };

  const renderSortButton = (field, label) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-x-2">
      {label}
      {filterValues.sort.startsWith(field) && (
        <span className={`ml-2 ${filterValues.sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}>
          {filterValues.sort.endsWith('asc') ? '▲' : '▼'}
        </span>
      )}
    </button>
  );

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
                      >
                        {renderSortButton('shoeId', 'Id')}
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
                      >
                        {renderSortButton('shoeName', 'Tên sản phẩm')}
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center justify-center gap-2">
                          {renderSortButton('status', 'Trạng thái')}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >

                        {renderSortButton('createDate', 'Ngày tạo')}
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        {renderSortButton('priority', 'Ưu tiên')}
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm cursor-pointer font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >

                        {renderSortButton('brand', 'Thương hiệu')}
                      </th>
                      <th
                        scope="col"
                        className="cursor-pointer flex items-center px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        {renderSortButton('shoeType', 'Loại')}
                      </th>

                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Xem
                      </th>

                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Sửa
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {products?.length > 0 &&
                      products.map((product) => {
                        return (
                          <tr key={product.shoeId}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <span>{product?.shoeId}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <img
                                src={
                                  `${import.meta.env.VITE_API_URL}/ShoeImage/Image/` +
                                  product?.defaultImage
                                }
                                alt=""
                                className="h-12 w-12 object-cover rounded"
                              />
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                              <span>{product?.shoeName}</span>
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
                              <span>{product?.createDate}</span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {product.priority ? (
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                                  <span> Có </span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                  <span> Không </span>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <span>{product?.brand?.brandName}</span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <span>{product?.shoeType?.shoeTypeName}</span>
                            </td>
                            <td className="relative py-3.5 px-4">
                              <button
                                type="button"
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
                                onClick={() => handleView(product.shoeId)}
                              >
                                Xem
                              </button>
                            </td>
                            <td className="relative py-3.5 px-4">
                              <button
                                type="button"
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
                                onClick={() => handleEdit(product.shoeId)}
                              >
                                Sửa
                              </button>
                            </td>
                          </tr>
                        );
                      })}
 {products?.length === 0 && (
    <tr className='w-full flex items-center justify-center'>
      <td className='w-full flex items-center justify-center text-center py-4'>
        <p className='text-zinc-400'>Không có sản phẩm nào</p>
      </td>
    </tr>
  )}


                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TableProduct;
