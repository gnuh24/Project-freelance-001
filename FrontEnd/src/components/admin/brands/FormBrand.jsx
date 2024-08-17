import { Label, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'
const FormBrand = ({ openModal, setOpenModal }) => {
  const [images, setImages] = useState([])

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    const newImages = files.map((file) => URL.createObjectURL(file))
    setImages(newImages) // Replace the previous images with the new ones
  }

  const handleRemoveImage = (imageUrl) => {
    setImages((prevImages) => prevImages.filter((image) => image !== imageUrl))
  }

  const handleSubmitBrand = (event) => {
    event.preventDefault()
    const formData = new FormData()
    images.forEach((image) => {
      formData.append('images', image)
    })
    formData.append('name', event.target.name.value)
    console.log(formData)
  }

  return (
    <>
      <Modal
        show={openModal}
        size="4xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <h3 className="p-4 text-xl font-medium text-gray-900 dark:text-white">
            Add Brand
          </h3>
        </Modal.Header>
        <Modal.Body>
          <form className="max-w-none mx-auto" onSubmit={handleSubmitBrand}>
            <div className="py-2 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label value="Brand Name" />
                  </div>
                  <TextInput id="name" placeholder="nike" required />
                </div>
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
                  onChange={handleFileChange}
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
              {images.map((image, index) => (
                <div key={index} className="image-item relative max-w-60">
                  <button
                    className="absolute -top-3 -right-1 z-100"
                    onClick={() => handleRemoveImage(image)}
                  >
                    <i className="fa-solid fa-circle-xmark text-xl"></i>
                  </button>
                  <img src={image} alt={`preview ${index}`} />
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
export default FormBrand
