import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import { getPriceList, addPriceList } from '../../actions/pricelists'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";
import CardFooter from "../../components/Card/CardFooter.js";

import { clearArticleData, getArticles, getArticlesBySupplierId } from '../../actions/article'
import Token from '../../Token/Token'
import { getSuppliers } from "../../actions/suppliers";
import TableHtml from "../../components/Table/TableHtml";

const useStyles = makeStyles((theme) => ({
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
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    margin: '27px 0 0 0',
    paddingBottom: '10px',
  },
  articleRow: {
    backgroundColor: '#F6F6F6',
    margin: '10px',
    padding: '15px',
    borderRadius: '5px'
  },
  articleInput: {
    padding: '5px 0px 5px 0px',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PriceLists() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  var token = Token();
  const purchaseList = useSelector(state => state.purchase);
  const articles = useSelector(state => state.articles);
  const suppliers = useSelector(state => state.suppliers);
  const [supplierId, setSupplierId] = useState()
  const [showNew, setShowNew] = useState(false);
  const [purchaseState, setPurchaseState] = useState('')
  const data = []

  useEffect(() => {
    dispatch(clearArticleData())
    dispatch(getSuppliers(token));
  }, []);

  useEffect(() => {
    if (supplierId) dispatch(getArticlesBySupplierId(token, supplierId))
  }, [supplierId])

  // const resetForm = () => {
  //   setpriceListName('')
  //   for (let i = 1; i < articles.length + 1; i++) {
  //     document.getElementById(i).value = ''
  //   }
  // };

  const handleNewPurchase = () => {
    setShowNew(!showNew)
  };

  const handleChangePriceListName = (value) => {
    if (value) setSupplierId(value.id)
    else dispatch(clearArticleData())
  };

  const handleChangePurchaseState = (event) => {
    console.log(event)
    setPurchaseState(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = {
      state: purchaseState,
      supplierId: supplierId,
      data: purchaseList
    }
    dispatch(addPriceList(purchaseList, token, enqueueSnackbar, closeSnackbar));
    // resetForm();
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className={classes.card}>
              <h4 className={classes.cardTitleWhite}>Nueva compra</h4>
              {showNew ? null : <Button color="info" onClick={handleNewPurchase}>Añadir</Button>}
            </div>
          </CardHeader>
          {showNew ?
            <>
              <form onSubmit={handleSubmit}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <Autocomplete
                        id="Supplier"
                        options={suppliers}
                        getOptionLabel={(option) => option.businessName}
                        onChange={(event, value) => handleChangePriceListName(value)}
                        fullWidth={true}
                        renderInput={(params) => <TextField {...params} label="Proveedor" />}
                      />
                    </GridItem>
                  </GridContainer>

                  {
                    articles && articles.length > 0 ?
                      <>
                        <h5>Articulos:</h5>
                        <TableHtml
                          tableData={articles && articles.length > 0 ?
                            articles.map((article) => {
                              return {
                                id: article.id,
                                articleName: article.articleName,
                                stock: article.stock
                              }
                            })
                            : null}
                        />

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={8}>
                            <FormControl className={classes.formControl}>
                              <InputLabel>Estado de la compra</InputLabel>
                              <Select
                                fullWidth
                                value={purchaseState}
                                onChange={handleChangePurchaseState}
                                defaultValue={'en transito'}
                              >
                                <MenuItem value={'en transito'}>En transito</MenuItem>
                                <MenuItem value={'procesando'}>Procesando</MenuItem>
                                <MenuItem value={'completa'}>Completa</MenuItem>
                              </Select>
                            </FormControl>
                          </GridItem>
                        </GridContainer>
                      </>
                      : <h6 style={{ display: "flex", justifyContent: "center" }}>Seleccione un proveedor para desplegar sus productos</h6>
                  }

                </CardBody>
                <CardFooter>
                  <Button color="primary" type='submit'>Listo</Button>
                  <Button color="danger" onClick={handleNewPurchase}>Cancelar</Button>
                </CardFooter>
              </form>
            </>
            : null
          }
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Listados</h4>
            <p className={classes.cardCategoryWhite}>
              Listado de precios
            </p>
          </CardHeader>
          <CardBody>
            {/* {pricelists && pricelists.length > 0 ?
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Nombre de listado"]}
                tableData={
                  pricelists.map((pl) => {
                    return {
                      id: pl.id,
                      editpathname: 'editpricelist',
                      deletepathname: 'pricelist/deletepricelist',
                      data: [pl.id, pl.priceListName]
                    }
                  })
                }
              />
              : <h5 style={{ display: "flex", justifyContent: "center" }}>No existen listados de precio</h5>} */}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}