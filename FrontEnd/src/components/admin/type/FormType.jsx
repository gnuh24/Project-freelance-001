import { Label, Modal, TextInput } from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { postShoeTypeApiThunk } from '../../../reducers/productReducer/ShoeTypeSlice'
const FormType = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch()

  const handleSubmitShoeType = (event) => {
    event.preventDefault()
    const formData = new FormData()

    formData.append('shoeTypeName', event.target.shoeTypeName.value)
    dispatch(postShoeTypeApiThunk(formData))
      .unwrap()
      .then(() => {
        // Handle successful addition
        console.log('Shoe type added successfully')
      })
      .catch((error) => {
        // Handle error
        console.error('Failed to add shoe type:', error)
      })
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
          <form className="max-w-none mx-auto" onSubmit={handleSubmitShoeType}>
            <div className="py-2 space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add Shoe Type
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label value="Shoe Type Name" />
                  </div>
                  <TextInput
                    id="shoeTypeName"
                    placeholder="Sneakers"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-5">
              <button
                type="submit"
                className="w-1/2 bg-blue-600 text-white flex items-center py-3 px-4 rounded-lg justify-center"
              >
                <span>Add Type</span>
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default FormType
