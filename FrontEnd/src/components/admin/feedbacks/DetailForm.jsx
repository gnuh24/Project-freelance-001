// DetailForm.jsx
import React, { useEffect, useState } from 'react'
import ImageGallery from './ImageGallery' // Import the ImageGallery component
import AxiosAdmin from '../../../apis/AxiosAdmin'

const DetailForm = ({ feedbackId, onClose }) => {
  if (!feedbackId) return null

  const [feedback, setFeedback] = useState(null)
  console.log(feedbackId)

  useEffect(() => {
    const getFeedbackById = async () => {
      try {
        const response = await AxiosAdmin.get(
          `${import.meta.env.VITE_API_URL}/Feedback/${feedbackId}`,
        )

        console.log(response.data)

        setFeedback(response.data)
      } catch (error) {
        console.error('Error fetching feedback:', error)
      }
    }

    getFeedbackById()
  }, [feedbackId])

  console.log(feedback)

  if (!feedback) return null

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-[35rem] p-8 rounded-lg shadow-lg max-w-lg mx-4 sm:mx-auto">
        <h3 className="text-xl text-center font-semibold mb-6 border-b pb-2 border-gray-300">
          Detail Information
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">ID</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.id}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Title</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.title}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Content</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.content}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Create Time</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.createTime}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Order ID</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.orderId}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Full Name</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.fullname}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Phone Number</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.phoneNumber}
            </p>
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
  )
}

export default DetailForm
