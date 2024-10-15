import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../style.css'
import { DialogTitle } from '@mui/material'
import ImageNewUpload from './ImageNewUpload'
import AxiosAdmin from '../../../apis/AxiosAdmin.jsx'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
async function urlToFile(url, filename) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch image')
  }

  const blob = await response.blob()

  const file = new File([blob], filename, { type: blob.type })

  return file
}

function extractFileNameFromSrc(content, imageFiles) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')

  const images = doc.querySelectorAll('img')

  images.forEach((img, index) => {
    const src = img.getAttribute('src')
    if (src.startsWith('data:image')) {
      img.setAttribute('src', imageFiles[index].name)
    }
  })

  return doc.body.innerHTML
}
function changeImageSrc(content) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')

  const images = doc.querySelectorAll('img')
  console.log('Number of images found:', images.length) // In số lượng hình ảnh tìm được

  images.forEach((img, index) => {
    const src = img.getAttribute('src')
    img.setAttribute('src', `${import.meta.env.VITE_API_URL}/NewsImage/` + src)
  })

  return doc.body.innerHTML
}

const ViewArticle = () => {
  const redirect = useNavigate()
  const newId = useSelector((state) => state.news.editId)

  const [title, setTitle] = useState('')
  const [banner, setBanner] = useState(null)
  const [imageBanner, setImageBanner] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('true')
  const [imageFiles, setImageFiles] = useState([])
  const [priority, setPriority] = useState('')
  const [error, setError] = useState({
    title: '',
    banner: '',
    content: '',
  })

  if (!newId || newId === undefined || newId === null) {
    redirect('/dashboard/news')
  }

  useEffect(() => {
    const getNewById = async () => {
      try {
        const response = await AxiosAdmin.get(
          `${import.meta.env.VITE_API_URL}/News/Admin/${newId}`,
        )
        if (response.data) {
          setTitle(response.data.title)
          setImageBanner(response.data.banner)
          setContent(response.data.content)
          setStatus(response.data.status)
          setPriority(response.data.priorityFlag)
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (newId) {
      getNewById()
    }
  }, [newId])

  console.log(content)

  return (
    <div className="h-[90.2vh]">
      <div className="relative w-full bg-white border overflow-y-auto p-5 rounded-md">
        <IoMdArrowRoundBack
          className="absolute left-4 top-4 cursor-pointer"
          size={30}
          onClick={() => redirect('/dashboard/news')}
        />
        <h3 className="font-bold text-2xl text-center">{title}</h3>

        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}

export default ViewArticle
