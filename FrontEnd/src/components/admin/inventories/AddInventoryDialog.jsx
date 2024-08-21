import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

const AddInventoryDialog = ({
    open,
    handleOpen
}) => {
  return (
    <Dialog
        open={open}
    >
        <div className='relative w-[35rem]'>
        <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
          <CloseIcon className='text-2xl' />
        </button>
            <DialogTitle className='text-center'>
                Thêm phiếu nhập
            </DialogTitle>

            <DialogContent>
                <form >
                    
                </form>
            </DialogContent>
        </div>
    </Dialog>
  )
}

export default AddInventoryDialog