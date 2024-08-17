import { Label, Modal, TextInput } from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { postColorApiThunk } from '../../../reducers/productReducer/ColorSlice' // Update import to match the new reducer

const FormColor = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch()

  const handleSubmitColor = (event) => {
    event.preventDefault()
    const colorName = event.target.colorName.value
    dispatch(postColorApiThunk({ colorName })) // Update action to match the new reducer
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
            Add Color
          </h3>
        </Modal.Header>
        <Modal.Body>
          <form className="max-w-none mx-auto" onSubmit={handleSubmitColor}>
            <div className="py-2 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label value="Color Name" />
                  </div>
                  <TextInput id="colorName" placeholder="Red" required />
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-5">
              <button
                type="submit"
                className="w-1/2 bg-blue-600 text-white flex items-center py-3 px-4 rounded-lg justify-center"
              >
                <span>Add Color</span> {/* Updated button text */}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default FormColor
