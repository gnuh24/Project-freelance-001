import { Label, Modal, TextInput, Textarea, Tooltip } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandsNoPageApiThunk } from '../../../reducers/productReducer/BrandSlice'
import { useEffect, useState } from 'react'
import { getShoeTypesNoPageApiThunk } from '../../../reducers/productReducer/ShoeTypeSlice'
import { getColorsNoPageApiThunk } from '../../../reducers/productReducer/ColorSlice'

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
  const [size, setSize] = useState('')
  const [price, setPrice] = useState('')
  const [dataSize, setDataSize] = useState([])
  const [dataImage, setDataImages] = useState([])

  function onCloseModalSize() {
    setOpenModalSize(false)
  }

  useEffect(() => {
    dispatch(getBrandsNoPageApiThunk())
    dispatch(getShoeTypesNoPageApiThunk())
    dispatch(getColorsNoPageApiThunk())
  }, [dispatch])

  console.log(dataBrand, dataShoeType, dataColor)

  if (loadingBrand || loadingShoeType || loadingColor) {
    return <div>Loading...</div>
  }

  console.log(dataColor)

  if (errorBrand || errorShoeType || errorColor) {
    return (
      <div>
        {errorBrand && <div>Error loading brands: {errorBrand}</div>}
        {errorShoeType && <div>Error loading shoe types: {errorShoeType}</div>}
        {errorColor && <div>Error loading colors: {errorColor}</div>}
      </div>
    )
  }

  const handleAddSize = () => {
    if (size && price) {
      setDataSize([...dataSize, { size, price }])
      setSize('')
      setPrice('')
      onCloseModalSize()
    }
  }

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
    console.log(index)
    setDataImages((prevImages) => prevImages.filter((_, i) => i !== index))
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
      <Modal
        show={openModal}
        size="4xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
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
              <div className="grid grid-cols-2 gap-4">
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
                        key={properties.shoeColorId}
                        value={properties.shoeColorId}
                      >
                        {properties.shoeColorName}
                      </option>
                    ))}
                  </select>
                </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label value="Size" />
                  </div>
                  <button
                    type="button"
                    className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={() => setOpenModalSize(true)}
                  >
                    Size
                  </button>
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
                          onClick={handleAddSize}
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
                  {dataSize.length > 0 && (
                    <>
                      <div className="mb-2 block">
                        <Label value="Information for size" />
                      </div>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {dataSize.map((properties, index) => (
                          <option
                            key={index}
                          >{`Size: ${properties.size} - Price: $${properties.price}`}</option>
                        ))}
                      </select>
                    </>
                  )}
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
            <div className="flex w-full justify-center pt-2 flex-wrap flex-row gap-5">
              {dataImage?.map((image, index) => (
                <div key={index} className="image-item relative max-w-60">
                  <button
                    className="absolute top-3 -right-1 z-100"
                    onClick={() => handleRemoveFileImage(index)}
                  >
                    <i className="fa-solid fa-circle-xmark text-xl"></i>
                  </button>
                  <Tooltip content="default image">
                    <button
                      className="absolute top-7 left-1 z-100"
                      onClick={() => handleChangeDefaultImage(index)}
                    >
                      {image.default ? (
                        <i className="fa-solid fa-star text-yellow-400"></i>
                      ) : (
                        <i className="fa-regular fa-star text-black"></i>
                      )}
                    </button>
                  </Tooltip>
                  <button></button>
                  <img src={image.data} alt={image.name} />
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
        </Modal.Body>
      </Modal>
    </>
  )
}

export default FormProduct
