import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios';
// @mui/material components
import { makeStyles } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Button from '../../components/CustomButtons/Button.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';
// core components
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import alt from '../../images/producto-sin-imagen.png';

import { getSuppliers } from '../../actions/suppliers';
import { getCategories } from '../../actions/categories';
import { createArticle } from '../../actions/article';
import Token from '../../Token/Token';

const { REACT_APP_URL_API } = process.env;

const useStyles = makeStyles((theme) => ({
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  articleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  article: {
    margin: '100px',
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
    alignItems: 'center',
  },
}));

export default function Articles() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showNew, setShowNew] = useState(true);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState(null);
  const [preview, setPreview] = useState(null);
  const suppliers = useSelector((state) => state.suppliers);
  const categories = useSelector((state) => state.categories);
  var token = Token();
  const [data, setData] = useState({
    name: '',
    code: '',
    price: '',
    categoryId: '',
    supplierId: '',
    stock: '',
    stockAlert: '',
    obs: '',
  });

  useEffect(() => {
    dispatch(getSuppliers(token));
    dispatch(getCategories(token));
  }, []);

  const resetForm = () => {
    setData({
      ...data,
      name: '',
      code: '',
      price: '',
      categoryId: '',
      supplierId: '',
      stock: '',
      stockAlert: '',
      obs: '',
    });
    setPreview(null);
    setProgress(0);
  };

  const handleNewSupplier = () => {
    setShowNew(!showNew);
  };

  const handleChange = (event) => {
    if (event.target.name !== '') {
      setData({ ...data, [event.target.name]: event.target.value });
    } else {
      setData({ ...data, [event.target.id]: event.target.value });
    }
  };

  const fileSelectedHandler = (event) => {
    if (event.target.files.length !== 0) {
      setFiles(event.target.files[0]);
      setPreview(URL.createObjectURL(event.target.files[0]));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', files);
    await axios
      .post(`${REACT_APP_URL_API}/upload`, formData, {
        onUploadProgress: (ProgressEvent) => {
          setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((img) => {
        const dataArticle = {
          name: data.name,
          code: data.code,
          price: data.price,
          categoryId: Number(data.categoryId),
          supplierId: Number(data.supplierId),
          stock: Number(data.stock),
          stockAlert: Number(data.stockAlert),
          image: img.data.path,
          obs: data.obs,
        };
        dispatch(createArticle(dataArticle, token, enqueueSnackbar, closeSnackbar));
        resetForm();
      });
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <div className={classes.card}>
                <h4 className={classes.cardTitleWhite}>Nuevo articulo</h4>
                {showNew ? null : (
                  <Button className={classes.buttonCard} color="info" onClick={handleNewSupplier}>
                    Añadir
                  </Button>
                )}
              </div>
            </CardHeader>
            {showNew ? (
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
                              id="name"
                              onChange={handleChange}
                              fullWidth
                              autoComplete="off"
                              value={data.name}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <Autocomplete
                              id="categoryId"
                              name="categoryId"
                              className={classes.input}
                              options={categories}
                              getOptionLabel={(option) => option.categoryName}
                              onChange={(event, newValue) => {
                                if (newValue) setData({ ...data, categoryId: newValue.id });
                                else setData({ ...data, categoryId: '' });
                              }}
                              fullWidth={true}
                              autoHighlight
                              renderInput={(params) => <TextField {...params} label="Categoria" />}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <Autocomplete
                              id="supplierId"
                              name="supplierId"
                              className={classes.input}
                              options={suppliers.data}
                              getOptionLabel={(option) => option.businessName}
                              onChange={(event, newValue) => {
                                if (newValue) setData({ ...data, supplierId: newValue.id });
                                else setData({ ...data, supplierId: '' });
                              }}
                              fullWidth={true}
                              autoHighlight
                              renderInput={(params) => <TextField {...params} label="Proveedor" />}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              className={classes.input}
                              label="Codigo"
                              id="code"
                              onChange={handleChange}
                              fullWidth
                              autoComplete="off"
                              type="number"
                              value={data.code}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              className={classes.input}
                              label="Precio"
                              id="price"
                              onChange={handleChange}
                              fullWidth
                              autoComplete="off"
                              type="number"
                              value={data.price}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              className={classes.input}
                              label="Stock inicial"
                              id="stock"
                              onChange={handleChange}
                              fullWidth
                              autoComplete="off"
                              type="number"
                              value={data.stock}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              className={classes.input}
                              label="Alerta de stock"
                              id="stockAlert"
                              onChange={handleChange}
                              fullWidth
                              autoComplete="off"
                              type="number"
                              value={data.stockAlert}
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
                              autoComplete="off"
                              value={data.obs}
                            />
                          </GridItem>
                        </GridContainer>
                      </div>

                      <div className="contentImage">
                        <h5>Imagen</h5>

                        {preview ? (
                          <img
                            style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain' }}
                            src={preview}
                            alt="Imagen del producto"
                          />
                        ) : (
                          <img
                            style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain' }}
                            src={alt}
                            alt="Sin imagen"
                          />
                        )}

                        <input
                          style={{ marginTop: '20px' }}
                          type="file"
                          onChange={fileSelectedHandler}
                          accept="image/*"
                        />

                        {progress > 0 ? (
                          <>
                            <LinearProgressWithLabel value={progress} />
                          </>
                        ) : null}
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" type="submit">
                      Listo
                    </Button>
                    <Button color="danger" onClick={handleNewSupplier}>
                      Cancelar
                    </Button>
                  </CardFooter>
                </form>
              </>
            ) : null}
          </Card>
          {/* // </GridItem> */}
        </GridItem>
      </GridContainer>
    </>
  );
}
