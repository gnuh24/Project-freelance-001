// DetailForm.jsx
import React from 'react';
import ImageGallery from './ImageGallery'; // Import the ImageGallery component

const DetailForm = ({ feedback, onClose }) => {
    if (!feedback) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-4 sm:mx-auto">
                <h3 className="text-xl font-semibold mb-6 border-b pb-2 border-gray-300">Detail Information</h3>
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">ID</label>
                        <p className="text-gray-800">{feedback.id}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Title</label>
                        <p className="text-gray-800">{feedback.title}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Content</label>
                        <p className="text-gray-800">{feedback.content}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Create Time</label>
                        <p className="text-gray-800">{feedback.createTime}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Order ID</label>
                        <p className="text-gray-800">{feedback.orderId}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Full Name</label>
                        <p className="text-gray-800">{feedback.fullname}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Phone Number</label>
                        <p className="text-gray-800">{feedback.phoneNumber}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Images</label>
                        <ImageGallery images={feedback.feedbackImageDTOSList} />
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DetailForm;
