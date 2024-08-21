import {
  Dropdown,
  Label,
  Modal,
  TextInput,
  Textarea,
  Tooltip,
} from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandsNoPageApiThunk } from '../../../reducers/productReducer/BrandSlice'
import { useEffect, useState } from 'react'
import { getShoeTypesNoPageApiThunk } from '../../../reducers/productReducer/ShoeTypeSlice'
import { getColorsNoPageApiThunk } from '../../../reducers/productReducer/ColorSlice'
import { Dialog } from '@mui/material'

const FormProduct = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch()
  const {
    data: dataBrand,
    loading: loadingBrand,
    error: errorBrand,
  } = useSelector((state) => state.brandReducer)
  const {
    data: dataShoeType,
    loading: loadingShoeType,
    error: errorShoeType,
  } = useSelector((state) => state.shoeTypeReducer)

  const {
    data: dataColor,
    loading: loadingColor,
    error: errorColor,
  } = useSelector((state) => state.colorReducer)

  const [openModalSize, setOpenModalSize] = useState(false)
  const [openModalColor, setOpenModalColor] = useState(false)
  const [size, setSize] = useState()
  const [price, setPrice] = useState()
  const [dataSize, setDataSize] = useState([])
  const [arrayColor, setArrayColor] = useState([])
  const [dataImage, setDataImages] = useState([])
  const [indexLink, setIndexLink] = useState()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const onCloseModalSize = () => {
    setOpenModalSize(false)
  }
  const onCloseModalColor = () => {
    setOpenModalColor(false)
  }

  useEffect(() => {
    dispatch(getBrandsNoPageApiThunk())
    dispatch(getShoeTypesNoPageApiThunk())
    dispatch(getColorsNoPageApiThunk())
  }, [dispatch])

  if (loadingBrand || loadingShoeType || loadingColor) {
    return <div>Loading...</div>
  }

  if (errorBrand || errorShoeType || errorColor) {
    return (
      <div>
        {errorBrand && <div>Error loading brands: {errorBrand}</div>}
        {errorShoeType && <div>Error loading shoe types: {errorShoeType}</div>}
        {errorColor && <div>Error loading colors: {errorColor}</div>}
      </div>
    )
  }

  const handleAddSize = (indexImage) => {
    if (size && price) {
      setDataSize((prevDataSize) => {
        const updatedDataSize = [...prevDataSize]

        // Check if there is already an entry for the given indexImage
        if (updatedDataSize[indexImage]) {
          // If it exists, add the new size and price to the existing entry
          updatedDataSize[indexImage].sizes.push({ size, price })
        } else {
          // If it doesn't exist, create a new entry for the indexImage
          updatedDataSize[indexImage] = {
            sizes: [{ size, price }],
          }
        }

        return updatedDataSize
      })
    }
  }

  const handleRemoveSize = (sizeIndex) => {
    setDataSize((prevDataSize) => {
      const updatedDataSize = [...prevDataSize]

      // Remove the size at the specified index
      updatedDataSize[indexLink].sizes.splice(sizeIndex, 1)

      // Remove the entire entry if no sizes are left
      if (updatedDataSize[indexLink].sizes.length === 0) {
        updatedDataSize.splice(indexLink, 1)
      }

      return updatedDataSize
    })
  }

  const handleRemoveSizeWhenRemoveImage = (indexImage) => {
    setDataSize((prevDataSize) => {
      const updatedDataSize = [...prevDataSize]
      // Remove the size at the specified index
      updatedDataSize.splice(indexImage, 1)
      return updatedDataSize
    })
  }

  const handleAddColor = (index) => {
    // Get the selected color from the dropdown
    const selectedColorId = +document.getElementById('color').value

    // Find the color properties based on the selected color ID
    const selectedColor = dataColor.find(
      (color) => color.id === selectedColorId,
    )
    console.log(selectedColor)

    if (selectedColor) {
      // Update the color data for the specific image by its index
      setArrayColor((prevDataColor) => {
        const updatedDataColor = [...prevDataColor]

        if (!updatedDataColor[index].colors) {
          updatedDataColor[index].colors = []
        }

        updatedDataColor[index].colors.push({
          id: selectedColor.id,
          colorName: selectedColor.colorName,
        })

        return updatedDataColor
      })
    }
  }
  console.log(arrayColor)

  const handleAddFileImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDataImages((prevImages) => [
          ...prevImages,
          { name: file.name, data: reader.result, default: false }, // Ensure full data URL is stored
        ])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveFileImage = (index) => {
    setDataImages((prevImages) => prevImages.filter((_, i) => i !== index))
    handleRemoveSizeWhenRemoveImage(index)
  }

  const handleChangeDefaultImage = (index) => {
    setDataImages((prevImages) =>
      prevImages.map((image, i) => {
        if (i === index) {
          // Toggle the clicked image to be the default if it's not already the default
          return { ...image, default: true }
        } else {
          // Set all other images' default to false
          return { ...image, default: false }
        }
      }),
    )
  }

  const handleSubmitFormProduct = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', e.target.name.value)
    formData.append('status', true)
    formData.append('description', e.target.comment.value)
    formData.append('priority', false)
    formData.append('brandId', e.target.brand.value)
    formData.append('shoeTypeId', e.target.shoeType.value)
    formData.append('shoeColorId', e.target.color.value)
    formData.append('shoeSizes', JSON.stringify(dataSize))
    formData.append('shoeImages', JSON.stringify(dataImage))
  }

  return (
    <>
      <div
        className={openModal ? 'fixed w-full h-screen bg-white overflow-hidden flex items-center': 'hidden' }
        
      >
        
        <div className='flex items-center justify-center'>
          <form
            className="max-w-none mx-auto"
            onSubmit={handleSubmitFormProduct}
          >
            <div className="py-2 space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add Product
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label value="Product Name" />
                  </div>
                  <TextInput id="name" placeholder="jordan 1" required />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label value="Brand" />
                  </div>
                  <select
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {dataBrand?.map((properties) => (
                      <option
                        key={properties.brandId}
                        value={properties.brandId}
                      >
                        {properties.brandName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label value="Shoe type" />
                  </div>
                  <select
                    id="shoeType"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {dataShoeType?.map((properties) => (
                      <option
                        key={properties.shoeTypeId}
                        value={properties.shoeTypeId}
                      >
                        {properties.shoeTypeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Description" />
                </div>
                <Textarea
                  id="comment"
                  placeholder="Your description..."
                  required
                  rows={4}
                />
              </div>
              <div className="col-span-full">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  onChange={handleAddFileImageChange}
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {dataSize.length > 0 &&
                dataSize[indexLink]?.sizes?.length > 0 && (
                  <>
                    <div className="relative mb-3">
                      <button
                        id="dropdownDefaultButton"
                        onClick={toggleDropdown}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                      >
                        Thông tin size và giá
                        <svg
                          className="w-2.5 h-2.5 ms-3 absolute top-1/2 end-2 transform -translate-y-1/2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>

                      <div
                        id="dropdown"
                        className={`z-10 ${
                          dropdownOpen ? '' : 'hidden'
                        } w-full absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
                      >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                          {dataSize[indexLink].sizes.map(
                            (properties, sizeIndex) => (
                              <li
                                key={sizeIndex}
                                className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                {`Size: ${properties.size} - Price: $${properties.price}`}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSize(sizeIndex)}
                                  className="ms-2 text-red-600"
                                >
                                  <i className="fa-solid fa-circle-xmark"></i>
                                </button>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              {/* <div> */}
              {/*   {dataSize.length > 0 && ( */}
              {/*     <> */}
              {/*       <div className="mb-2 block"> */}
              {/*         <Label value="Thông tin màu" /> */}
              {/*       </div> */}
              {/*       <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> */}
              {/*         {dataSize.map((properties, index) => ( */}
              {/*           <option */}
              {/*             key={index} */}
              {/*           >{`Size: ${properties.size} - Price: $${properties.price}`}</option> */}
              {/*         ))} */}
              {/*       </select> */}
              {/*     </> */}
              {/*   )} */}
              {/* </div> */}
            </div>

            <div className="flex w-full justify-center pt-2 flex-wrap flex-row gap-5">
              {dataImage?.map((image, index) => (
                <div key={index} className="image-item relative max-w-60">
                  <button
                    type="button"
                    className="absolute -top-3 -right-2 z-100"
                    onClick={() => handleRemoveFileImage(index)}
                  >
                    <i className="fa-solid fa-circle-xmark text-xl"></i>
                  </button>
                  <Tooltip content="default image">
                    <button
                      className="absolute top-1 left-1 z-100"
                      type="button"
                      onClick={() => handleChangeDefaultImage(index)}
                    >
                      {image.default ? (
                        <i className="fa-solid fa-star text-yellow-400"></i>
                      ) : (
                        <i className="fa-regular fa-star text-black"></i>
                      )}
                    </button>
                  </Tooltip>
                  <img
                    className="cursor-pointer"
                    onClick={() => setIndexLink(index)}
                    src={image.data}
                    alt={image.name}
                  />
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIndexLink(index)
                        setOpenModalSize(true)
                      }}
                      className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Size
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIndexLink(index)
                        setOpenModalColor(true)
                      }}
                      className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Color
                    </button>
                  </div>
                  <div>
                    <Modal
                      show={openModalSize}
                      size="md"
                      onClose={onCloseModalSize}
                      popup
                    >
                      <Modal.Header />
                      <Modal.Body>
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Size and Price
                          </h3>
                          <div>
                            <div className="mb-2 block">
                              <Label value="Size" />
                            </div>
                            <TextInput
                              id="size"
                              type="number"
                              placeholder="Size 40 ..."
                              onChange={(e) => setSize(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <div className="mb-2 block">
                              <Label htmlFor="price" value="Price for size" />
                            </div>
                            <TextInput
                              id="price"
                              type="number"
                              placeholder="1000$"
                              onChange={(e) => {
                                setPrice(e.target.value)
                              }}
                              required
                            />
                          </div>
                          <button
                            onClick={() => {
                              setIndexLink(index)
                              handleAddSize(indexLink)
                            }}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          >
                            Add Size
                          </button>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                  <div>
                    <Modal
                      show={openModalColor}
                      size="md"
                      onClose={onCloseModalColor}
                      popup
                    >
                      <Modal.Header />
                      <Modal.Body>
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Color
                          </h3>
                          <div>
                            <div className="mb-2 block">
                              <Label value="Color" />
                            </div>
                            <select
                              id="color"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              {dataColor?.map((properties) => (
                                <option
                                  key={properties.id}
                                  value={properties.id}
                                >
                                  {properties.colorName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            onClick={() => {
                              setIndexLink(index)
                              handleAddColor(indexLink)
                            }}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          >
                            Add color
                          </button>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center pt-5">
              <button
                type="submit"
                className="w-1/2 bg-blue-600 text-white flex items-center py-3 px-4 rounded-lg justify-center"
              >
                <span>Add product</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormProduct
