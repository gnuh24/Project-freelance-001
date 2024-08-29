import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { IoMdCloseCircleOutline } from "react-icons/io"


const AddSizeDialog = ({
    isOpen,
    onClose,
    productId,
    setSizeSelected
}) => {





    return (
        <Dialog open={isOpen}>

            <DialogContent className="overflow-hidden">
                <div className='relative w-[35rem] space-y-2 overflow-hidden'>
                    <button
                        className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
                        onClick={onClose}
                    >
                        <IoMdCloseCircleOutline className="text-2xl" />
                    </button>
                    <DialogTitle className='text-center'>
                        Thêm thương size mới
                    </DialogTitle>


                    <form className="space-y-4 overflow-hidden">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="size" className="font-semibold">Size</label>
                            <input type="text" className="rounded-md" placeholder="Nhập size" />

                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price" className="font-semibold">Giá</label>
                            <input type="text" className="rounded-md" placeholder="Nhập giá" />

                        </div>


                        <button>Thêm</button>

                    </form>



                </div>
            </DialogContent>



        </Dialog>
    )
}

export default AddSizeDialog