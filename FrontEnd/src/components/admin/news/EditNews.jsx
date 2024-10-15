import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../style.css'
import { DialogTitle } from '@mui/material'
import ImageNewUpload from './ImageNewUpload'
import AxiosAdmin from '../../../apis/AxiosAdmin.jsx'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack, IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'

function extractFileNameFromSrc(content, imageFiles) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')

  const images = doc.querySelectorAll('img')

  images.forEach((img, index) => {
    const src = img.getAttribute('src')

    // Kiểm tra xem có ảnh trong mảng imageFiles hay không trước khi thay đổi src
    if (src.startsWith('data:image') && imageFiles[index]) {
      img.setAttribute('src', imageFiles[index].name)
    }
  })
  console.log(content)

  return doc.body.innerHTML
}

const EditNew = () => {
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

  const quillRef = useRef(null)

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
        } else {
          toast.error('Không tìm thấy tin tức!')
          redirect('/dashboard/news')
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (newId) {
      getNewById()
    }
  }, [newId])

  const handleImageUpload = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = () => {
      const files = Array.from(input.files)

      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          const imageUrl = reader.result
          const quill = quillRef.current.getEditor()
          const range = quill.getSelection()

          if (range) {
            quill.insertEmbed(range.index, 'image', imageUrl)
            setImageFiles((prevFiles) => [...prevFiles, file])
          } else {
            console.error('Unable to get selection range for image insertion.')
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
    }),
    [],
  )

  const handleSubmit = async () => {
    let valid = true
    if (title === '') {
      setError({ ...error, title: 'Tiêu đề không được đê trống' })
      valid = false
    }

    if (content === '') {
      setError({ ...error, content: 'Nội dung không được đê trống' })
      valid = false
    }

    if (valid) {
      try {
        const formData = new FormData()
        formData.append('title', title)
        if (banner) {
          formData.append('banner', banner)
        }

        formData.append('content', extractFileNameFromSrc(content, imageFiles))
        formData.append('status', status)
        if (imageFiles.length > 0) {
          imageFiles.forEach((file, index) =>
            formData.append(`newsImageList[${index}]`, file),
          )
        }
        formData.append('id', newId)

        formData.append('priorityFlag', priority)

        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`)
        })
        const response = await AxiosAdmin.patch(
          `${import.meta.env.VITE_API_URL}/News`,
          formData,
        )
        if (response.status === 200) {
          toast.success('Chỉnh sửa viết thành công!')

          redirect('/dashboard/news')
        }
      } catch (error) {
        console.error('Error saving article or images:', error)
        toast.error('Sửa bài viết thất bại!')
      }
    }
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  return (
    <div className="h-[90.2vh]">
      <div className="relative w-full bg-white border overflow-y-auto p-5 rounded-md">
        <IoMdArrowRoundBack
          className="absolute left-4 top-4 cursor-pointer"
          size={30}
          onClick={() => redirect('/dashboard/news')}
        />
        <DialogTitle className="text-center">Chỉnh sửa bài viết</DialogTitle>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Tiêu đề</label>
            <input
              type="text"
              id="title"
              className="rounded-md w-full"
              placeholder="Tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error.title && <p className="text-rose-500">{error.title}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="banner">Thumbnail</label>
            {imageBanner ? (
              <div className="relative h-20 w-20">
                <img
                  src={
                    imageBanner
                      ? `${import.meta.env.VITE_API_URL}/NewsImage/${imageBanner}`
                      : 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                  }
                  alt="Uploaded"
                  className="rounded-md w-[5rem] h-[5rem] object-cover"
                />
                <button
                  onClick={() => setImageBanner('')}
                  className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                  type="button"
                >
                  <IoMdClose className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <ImageNewUpload banner={banner} setBanner={setBanner} />
            )}

            {error.banner && <p className="text-rose-500">{error.banner}</p>}
          </div>
          <div className="flex flex-col gap-2 h-screen">
            <label htmlFor="content">Nội dung</label>
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={setContent}
              modules={modules}
              formats={[
                'header',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'indent',
                'link',
                'image',
              ]}
              placeholder="Nội dung bài viết..."
              className="react-quill-container mb-16 p-4 "
            />
            {error.content && <p className="text-rose-500">{error.content}</p>}
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="status">Trạng thái</label>
            <select
              id="status"
              className="rounded-md"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="true">Hiển thị</option>
              <option value="false">Ẩn</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="status">Ưu tiên</label>
            <select
              id="status"
              className="rounded-md"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </div>
        </div>
        <button
          className="mt-10 w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Lưu Bài Viết
        </button>
      </div>
    </div>
  )
}

export default EditNew
