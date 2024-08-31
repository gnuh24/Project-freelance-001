import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";

const ImageNewUpload = ({ setBanner, banner }) => {
   
    const [file, setFile] = useState(banner instanceof File ? banner : null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
       
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);

           
            return () => URL.revokeObjectURL(url);
        } else {
            setImageUrl(null);
        }
    }, [file]);

    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            setFile(newFile);
            setBanner(newFile);
        }
    };

    const handleRemove = () => {
        setFile(null);
        setImageUrl(null);
        setBanner(null);
    };

    return (
        <div className="relative h-20 w-20">
            {imageUrl ? (
                <>
                    <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="rounded-md w-[5rem] h-[5rem] object-cover"
                    />
                    <button
                        onClick={handleRemove}
                        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                        type="button"
                    >
                        <IoMdClose className="h-4 w-4"/>
                    </button>
                </>
            ) : (
                <input
                    type="file"
                    onChange={handleFileChange}
                />
            )}
        </div>
    );
};

export default ImageNewUpload;
