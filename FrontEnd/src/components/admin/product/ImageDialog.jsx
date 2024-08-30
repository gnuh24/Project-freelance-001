import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { IoMdClose } from "react-icons/io";
import UploadProductImage from "./UploadProductImage";
import { useState } from "react";

import { patchImage } from "../../../reducers/productReducer/ProductsSlice";
import toast from "react-hot-toast";
import AxiosAdmin from "../../../apis/AxiosAdmin";



const ImageDialog = ({
    open,
    handleOpen,
    url,
    onChangeUrl,
    values,
    onChangeImage,
    imageId
}) => {



    const [formValues, setFormValues] = useState({
        image: File || null
    })


    const handleSubmit = async () => {

        let valid = true

        

        if(imageId){
            const newform = new FormData()
            console.log(imageId)
            newform.append('shoeImage', formValues.image)
            newform.forEach((value, key)=>{
                console.log(key, value)
               
            })

            try {
                const response = await  AxiosAdmin.patch(`http://localhost:8080/ShoeImage/${imageId}`, newform);
                if(response.data){
                    const data = response.data
                    toast.success("Sửa ảnh thành công")
                    onChangeImage({...values, shoeImages: [...values.shoeImages, data]})
                    handleOpen()
                }
            } catch (error) {
                toast.error("Đã xảy ra l��i, vui lòng thử lại sau")
                console.log(error)
            }
            
        }
    }


    if (url) {
        return (
            <Dialog open={open}>

                <div className="w-[30rem] h-[30rem] relative flex flex-col items-center justify-center">
                    <button
                        className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
                        onClick={handleOpen}
                    >
                        <IoMdClose className="text-2xl" />
                    </button>
                    <DialogTitle>
                        Sửa ảnh
                    </DialogTitle>
                    <div className="relative w-[20rem]">

                        <img className="w-[20rem] h-[20rem] object-cover rounded-md" src={`data:image/webp;base64,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`} alt="" />
                        <button onClick={()=> onChangeUrl('')} className="absolute text-white right-0 top-0 flex items-center justify-center bg-rose-400">
                            <IoMdClose size={20} />
                        </button>


                    </div>

                </div>


            </Dialog>
        )
    }

    return (
        <Dialog open={open}>
            <div className="relative w-[30rem] p-2 space-y-4">
                <button
                    className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
                    onClick={handleOpen}
                >
                    <IoMdClose className="text-2xl" />
                </button>
                <DialogTitle className="text-center">Sửa ảnh</DialogTitle>

                <div >
                <UploadProductImage
                    onChangeFormValues={setFormValues}
                    formValues={formValues}
                    imageId={imageId}
                />

                </div>


                <button onClick={handleSubmit} className="bg-blue-600 w-full hover:bg-blue-700 transition py-2 text-white">Lưu</button>

            </div>


        </Dialog>
    )
}

export default ImageDialog