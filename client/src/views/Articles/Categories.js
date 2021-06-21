import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import ImageUploader from 'react-images-upload';
import axios from 'axios'
import { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
// core components
import Quote from "../../components/Typography/Quote.js";
import Muted from "../../components/Typography/Muted.js";
import Primary from "../../components/Typography/Primary.js";
import Info from "../../components/Typography/Info.js";
import Success from "../../components/Typography/Success.js";
import Warning from "../../components/Typography/Warning.js";
import Danger from "../../components/Typography/Danger.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardAvatar from "../../components/Card/CardAvatar.js";

import alt from '../../images/producto-sin-imagen.png'

import { getSuppliers } from '../../actions/suppliers'
import { createCategory } from '../../actions/categories'
import Token from '../../Token/Token'

const useStyles = makeStyles((theme) => ({
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  articleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  article: {
    margin: '100px'
  },
  input: {
    margin: '27px 0 0 0',
    paddingBottom: '10px',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  formControl: {
    display: 'flex',
    margin: '27px 0 0 0',
    minWidth: 120,
    paddingBottom: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
}));

export default function Articles() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showNew, setShowNew] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState(null);
  const [preview, setPreview] = useState(null);
  var token = Token();
  const [data, setData] = useState({
    categoryName: '',
    obs: ''
  });

  useEffect(() => {
    dispatch(getSuppliers(token))
  }, [])

  const resetForm = () => {
    setData({
      ...data,
      categoryName: '',
      obs: ''
    })
    setPreview(null);
  }

  const handleNewSupplier = () => {
    setShowNew(!showNew)
  }

  const handleChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value })
  }

  const fileSelectedHandler = (event) => {
    if (event.target.files.length !== 0) {
      setFiles(event.target.files[0])
      setPreview(URL.createObjectURL(event.target.files[0]))
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("images", files);
    await axios.post('http://localhost:3001/upload/', formData, {
      onUploadProgress: ProgressEvent => {
        setProgress(ProgressEvent.loaded / ProgressEvent.total * 100)
      }
    })
      .then(img => {
        setData({ ...data, 'image': img.data })
        const dataCategory = {
          categoryName: data.categoryName,
          image: img.data,
          obs: data.obs
        }
        dispatch(createCategory(dataCategory, token, enqueueSnackbar, closeSnackbar))
        resetForm()
      })
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
    <Card>
      <CardHeader color="primary">
        <div className={classes.card}>
          <h4 className={classes.cardTitleWhite}>Nueva categoria</h4>
          {showNew ? null : <Button className={classes.buttonCard} color="info" onClick={handleNewSupplier}>Añadir</Button>}
        </div>
      </CardHeader>
      {showNew ?
        <>
          <form onSubmit={handleSubmit}>
            <CardBody>
              <div className="containerForm">
                <div className="contentForm">
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        className={classes.input}
                        label="Nombre"
                        id="categoryName"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        value={data.categoryName}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        className={classes.input}
                        label="Descripcion"
                        id="obs"
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        autoComplete='off'
                        value={data.obs}
                      />
                    </GridItem>
                  </GridContainer>
                </div>

                <div className="contentImage">
                  <h5>Imagen</h5>

                  {preview ?
                    <img style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain' }} src={preview} alt="Imagen del producto" />
                    :
                    <img style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain' }} src={alt} alt="Sin imagen" />
                  }

                  <input
                    style={{ marginTop: '20px' }}
                    type='file'
                    onChange={fileSelectedHandler}
                    accept="image/*"
                  />

                  {/* <button
                    onClick={fileUploadHandler}>
                    Upload
                  </button> */}

                  {progress > 0 ?
                    <>
                      <LinearProgressWithLabel value={progress} />
                    </>
                    : null
                  }
                </div>
              </div>

            </CardBody>
            <CardFooter>
              <Button color="primary" type='submit'>Listo</Button>
              <Button color="danger" onClick={handleNewSupplier}>Cancelar</Button>
            </CardFooter>
          </form>
        </>
        : null
      }
    </Card>
    // </GridItem>
  );
}
