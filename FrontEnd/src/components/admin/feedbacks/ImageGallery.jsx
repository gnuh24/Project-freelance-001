// ImageGallery.jsx
import React from 'react';

const ImageGallery = ({ images }) => {
    if (!images || images.length === 0) return <p>No images available</p>;

    return (
        <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image.url}
                    alt={`Feedback image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-md shadow-md"
                />
            ))}
        </div>
    );
};

export default ImageGallery;
