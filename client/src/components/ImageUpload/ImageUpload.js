import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function ImageUpload() {
    const [files, setFiles] = useState(null);

    const fileSelectedHandler = (event) => {
        setFiles(event.target.files[0])
    }

    const fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', files);
        axios.post('http://localhost:3001/uploadimage')
    }

    return (
        <div>
            <input type='file' 
            onChange={fileSelectedHandler}
            />
            <button onClick={fileUploadHandler}>
                Upload
            </button>
        </div>
    )
}
