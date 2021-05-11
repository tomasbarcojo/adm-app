import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import ImageUploader from 'react-images-upload';
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

import { uploadProductImage } from '../../actions/uploadProductImage'

import '../../App.css'

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
}));

export default function Articles() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pricelists = [];
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showNew, setShowNew] = useState(false);
  var token = '';
  if (localStorage.length > 0) {
    token = JSON.parse(localStorage.getItem('token'));
  } else {
    token = JSON.parse(sessionStorage.getItem('token'));
  }
  const [files, setFiles] = useState(null);
  const [data, setData] = useState({
    articleName: '',
    cost: '',
    category: '',
    stock: '',
    obs: '',
  });

  const handleNewSupplier = () => {
    setShowNew(!showNew)
  }

  const handleChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value })
  }

  const filesHandler = function (files) {
    setFiles(files)
    console.log(files)
  };

  const resetForm = () => {
    setData({
      ...data,
      articleName: '',
      price: '',
      category: '',
      stock: '',
      obs: '',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // dispatch(addSupplier(data, token, enqueueSnackbar, closeSnackbar))
    resetForm()
  }
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Nuevo articulo</h4>
        {showNew ? null : <Button className={classes.buttonCard} color="info" onClick={handleNewSupplier}>Añadir</Button>}
      </CardHeader>
      {showNew ?
        <>
          <form onSubmit={handleSubmit}>
            <CardBody>
              <div class="containerArticleForm">
                <div id="contentForm">
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12} justifyContent='center' alignContent='center' alignItems='center'>
                      <TextField
                        className={classes.input}
                        label="Nombre"
                        id="articleName"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        value={data.name}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>Categoria</InputLabel>
                        <Select
                          onChange={handleChange}
                          fullWidth={true}
                          // className={classes.input}
                          menu
                        >
                          {
                            pricelists && pricelists.length > 0 ?
                              pricelists.map(pricelist => {
                                return (
                                  <MenuItem value={pricelist.id}>{pricelist.priceListName}</MenuItem>
                                )
                              })
                              :
                              <MenuItem disabled value={0}>No existen categorias</MenuItem>
                          }
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>Proveedor</InputLabel>
                        <Select
                          onChange={handleChange}
                          fullWidth={true}
                          // className={classes.input}
                          menu
                        >
                          {
                            pricelists && pricelists.length > 0 ?
                              pricelists.map(pricelist => {
                                return (
                                  <MenuItem value={pricelist.id}>{pricelist.priceListName}</MenuItem>
                                )
                              })
                              :
                              <MenuItem disabled value={0}>No existen proveedores</MenuItem>
                          }
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        className={classes.input}
                        label="Precio"
                        id="cost"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        type='number'
                        value={data.phone}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        className={classes.input}
                        label="Stock"
                        id="stock"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        type='number'
                        value={data.altPhone}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
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

                <div id="contentImage">
                  <h5>Imagen</h5>
                  <ImageUploader
                    withIcon={false}
                    buttonText='Choose images'
                    onChange={filesHandler}
                    imgExtension={['.jpg', '.png', '.jpeg']}
                    maxFileSize={5242880}
                    label={'Max file size: 5mb, accepted: jpg | jpeg | png'}
                    buttonText='Adjuntar imágenes'
                    withPreview={files ? true : false}
                  />

                  <input
                    accept="image/*"
                    className={classes.input}
                    multiple
                    type="file"
                  />
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
