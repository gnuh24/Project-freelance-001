import React, { useState, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CloseIcon from '@mui/icons-material/Close';
import '../style.css';
import { DialogTitle } from '@mui/material';
import ImageNewUpload from './ImageNewUpload';

const AddNew = ({ open, handleOpen }) => {
    const [title, setTitle] = useState('');
    const [banner, setBanner] = useState(null);
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('true'); 
    const [imageFiles, setImageFiles] = useState([]);
    const [author, setAuthor] = useState('2'); 

    const quillRef = useRef(null);

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const files = Array.from(input.files);

            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    const imageUrl = reader.result;
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection();

                    if (range) {
                        quill.insertEmbed(range.index, 'image', imageUrl);
                        setImageFiles(prevFiles => [...prevFiles, file]);
                    } else {
                        console.error('Unable to get selection range for image insertion.');
                    }
                };
                reader.readAsDataURL(file);
            });
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image'],
                ['clean'],
            ],
            handlers: {
                image: handleImageUpload,
            }
        }
    }), []);

    const handleSubmit = async () => {
        const article = {
            title,
            content,
        };

        try {
            console.log('Title:', article.title);
            console.log('Banner:', banner);
            console.log('Content:', article.content);
            console.log('Image files:', imageFiles);
            console.log('Article and images saved successfully.');
        } catch (error) {
            console.error('Error saving article or images:', error);
        }
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value); 
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value); 
    };

    return open ? (
        <div className='w-full animate-dropdown h-screen fixed left-0 top-0 overflow-hidden flex items-center justify-center'>
            <div className='relative w-[30rem] p-10 md:w-[90rem] md:h-[700px] h-[600px] bg-white border rounded-md shadow-md overflow-y-auto'>
                <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
                    <CloseIcon className='text-2xl' />
                </button>
                <DialogTitle className='text-center'>
                    Thêm bài viết mới
                </DialogTitle>

                <div className='space-y-6'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="title">Tiêu đề</label>
                        <input
                            type="text"
                            id="title"
                            className='rounded-md w-full'
                            placeholder="Tiêu đề"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="banner">Thumbnail</label>
                        <ImageNewUpload
                            banner={banner}
                            setBanner={setBanner}
                        />
                    </div>
                    <div className='flex flex-col gap-2 h-[500px]'>
                        <label htmlFor="content">Nội dung</label>
                        <ReactQuill
                            ref={quillRef}
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            formats={['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image']}
                            placeholder="Nội dung bài viết..."
                            className="react-quill-container mb-20 p-4 "
                        />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <label htmlFor="status">Trạng thái</label>
                        <select
                            id="status"
                            className='rounded-md'
                            value={status}
                            onChange={handleStatusChange}
                        >
                            <option value="true">Hiển thị</option>
                            <option value="false">Ẩn</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label htmlFor="author">Tác giả</label>
                        <select
                            id="author"
                            className='rounded-md'
                            value={author}
                            onChange={handleAuthorChange}
                        >
                            <option value="1">Tác giả 1</option>
                            <option value="2">Tác giả 2</option>
                        </select>
                    </div>
                </div>
                <button className='mt-10 w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700' onClick={handleSubmit}>Lưu Bài Viết</button>
            </div>
        </div>
    ) : null;
};

export default AddNew;
