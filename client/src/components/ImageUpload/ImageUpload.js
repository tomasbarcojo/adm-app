import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { uploadProductImage } from '../../actions/uploadProductImage'
import { useDispatch } from "react-redux";

export default function ImageUpload() {
    const [files, setFiles] = useState(null);
    const dispatch = useDispatch();

    var token = '';
    if (localStorage.length > 0) {
        token = JSON.parse(localStorage.getItem('token'));
    } else {
        token = JSON.parse(sessionStorage.getItem('token'));
    }

    const fileSelectedHandler = (event) => {
        setFiles(event.target.files[0])
    }

    const fileUploadHandler = (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append("images", files);
        // formData.append("TEST", "123")
        // for (let i = 0; i < files.files.length; i++) {   // si hubiese muchas imagenes
        //     formData.append("files", files.files[i]);
        // }
        console.log(formData)
        fetch("http://localhost:3001/upload/uploadproductimage", {
            method: 'post',
            body: formData
        })
            .then((res) => console.log(res))
            .catch((err) => ("Error occured", err));


        // const fd = new FormData();
        // fd.append('images', files);
        // dispatch(uploadProductImage(fd, token))
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
