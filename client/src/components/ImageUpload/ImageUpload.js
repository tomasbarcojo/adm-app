import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { uploadProductImage } from '../../actions/uploadProductImage'
import { useDispatch } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export default function ImageUpload() {
    const [files, setFiles] = useState(null);
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);

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
        // console.log(formData)
        // fetch("http://localhost:3001/upload/uploadproductimage", {
        //     method: 'post',
        //     body: formData
        // })
        //     .then((res) => console.log(res))
        //     .catch((err) => ("Error occured", err));

        axios.post('http://localhost:3001/upload/', formData, {
            onUploadProgress: ProgressEvent => {
                setProgress(ProgressEvent.loaded / ProgressEvent.total * 100)
            }
        })
            .then(res => {
                console.log(res)
            })
        // const fd = new FormData();
        // fd.append('images', files);
        // dispatch(uploadProductImage(fd, token))
    }

    function LinearProgressWithLabel(props) {
        return (
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <div>
            <input 
                type='file'
                onChange={fileSelectedHandler}
            />
            <button 
                onClick={fileUploadHandler}>
                Upload
            </button>
            { progress > 0 ?
                <>
                    <LinearProgressWithLabel value={progress} />
                </>
                : null

            }
        </div>
    )
}
