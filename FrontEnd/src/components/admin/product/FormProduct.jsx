import { PhotoIcon } from '@heroicons/react/16/solid'
import { Label, Modal, TextInput, Textarea } from 'flowbite-react'

const FormProduct = ({ openModal, setOpenModal }) => {
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
          <div className="py-2 space-y-6 border-b-2 border-gray-200">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add Product
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2 block">
                  <Label value="Product Name" />
                </div>
                <TextInput id="name" placeholder="name@company.com" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Category" />
                </div>
                <TextInput id="category" placeholder="Nike" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2 block">
                  <Label value="Brand" />
                </div>
                <TextInput id="brand" placeholder="Nike" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Price" />
                </div>
                <TextInput
                  type="number"
                  id="price"
                  placeholder="$1000"
                  required
                />
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
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:border-gray-50">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-gray-400"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 dark:text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600 dark:text-white">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <button className="bg-blue-600 text-white flex items-center py-3 px-4 rounded-lg">
              <span>Add product</span>
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default FormProduct
