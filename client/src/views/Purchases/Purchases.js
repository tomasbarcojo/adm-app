import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import 'date-fns';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// core components
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Button from '../../components/CustomButtons/Button.js';
import CardFooter from '../../components/Card/CardFooter.js';

import { clearArticleData, getArticles } from '../../actions/article';
import { newPurchase } from '../../actions/purchases';
import Token from '../../Token/Token';
import { getSuppliers } from '../../actions/suppliers';
import TableHtml from '../../components/Table/TableHtml';
import { useQueryParams } from '../../utils/useQueryParams.js';
import { getCategories } from '../../actions/categories.js';
import SearchProductsInput from '../../components/SearchProductsInput/SearchProductInput';

const useStyles = makeStyles((theme) => ({
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
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleRow: {
    backgroundColor: '#F6F6F6',
    margin: '10px',
    padding: '15px',
    borderRadius: '5px',
  },
  articleInput: {
    padding: '5px 0px 5px 0px',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  checkbox: {
    color: 'black',
    margin: '10px 10px 0 0',
    paddingBottom: '10px',
  },
  checkboxrow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0px 10px 0px',
  },
  datePicker: {
    margin: '0',
  },
}));

export default function Purchase() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  var token = Token();
  const productList = useSelector((state) => state.newPurchase);
  const articles = useSelector((state) => state.articles);
  const suppliers = useSelector((state) => state.suppliers);
  const total = useSelector((state) => state.purchaseTotal);
  const categories = useSelector((state) => state.categories);
  const [haveExpDate, setHaveExpDate] = useState(false);
  const filters = useQueryParams();
  const castedFilters = {
    supplierId: filters.params.supplierId || '',
    categoryId: filters.params.categoryId || '',
    search: filters.params.search || '',
    page: filters.params.page || 1,
    limit: filters.params.limit || 1,
  };
  const [purchaseData, setPurchaseData] = useState({
    supplierId: null,
    receiptType: 'Comprobante de compra',
    purchaseState: 'En transito',
    paymentExpDate: null,
  });

  useEffect(() => {
    dispatch(clearArticleData());
    dispatch(getSuppliers(token));
    // dispatch(getCategories(token));
  }, []);

  useEffect(() => {
    // dispatch(
    //   getArticles({
    //     token,
    //     supplierId: castedFilters.supplierId,
    //     categoryId: castedFilters.categoryId,
    //     search: castedFilters.search,
    //     page: castedFilters.page,
    //     limit: castedFilters.limit
    //   }),
    // );
    // console.log(!purchaseData.supplierId && productList.length !== 0)
    console.log(!purchaseData.supplierId);
    console.log(productList.every((obj) => obj.hasOwnProperty('quantity') && obj['quantity'] !== 0));
    console.log(
      !purchaseData.supplierId || productList.forEach((obj) => obj.hasOwnProperty('quantity') && obj['quantity'] !== 0),
    );
  }, [purchaseData, productList]);

  // const resetForm = () => {
  //   setpriceListName('')
  //   for (let i = 1; i < articles.length + 1; i++) {
  //     document.getElementById(i).value = ''
  //   }
  // };

  const handleChangeSupplierId = (value) => {
    if (value) filters.setParam('supplierId', value.id);
    else filters.setParam('supplierId', '');
  };

  const handleChangeCategoryId = (value) => {
    if (value) filters.setParam('categoryId', value.id);
    else filters.setParam('categoryId', '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = {
      supplierId: purchaseData.supplierId,
      productList,
      purchaseState: purchaseData.purchaseState.toLocaleLowerCase(),
    };
    if (purchaseData.paymentExpDate) dataObj.paymentExpirationDate = purchaseData.paymentExpDate;
    dispatch(newPurchase(dataObj, token, enqueueSnackbar, closeSnackbar));
    // resetForm();
  };

  const handleChangeName = (e) => {
    filters.setParam('search', e.target.value);
  };

  const handleHaveExpDate = () => {
    setHaveExpDate(!haveExpDate);
    console.log(haveExpDate);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className={classes.card}>
              <h4 className={classes.cardTitleWhite}>Nueva compra</h4>
            </div>
          </CardHeader>
          <>
            <form onSubmit={handleSubmit}>
              <CardBody>
                <h5>Informacion del Comprobante</h5>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <Autocomplete
                      id="Supplier"
                      autoComplete={true}
                      options={suppliers.data}
                      getOptionLabel={(option) => option.businessName}
                      onChange={(event, value) =>
                        setPurchaseData({ ...purchaseData, supplierId: value ? value.id : '' })
                      }
                      fullWidth={true}
                      renderInput={(params) => <TextField {...params} label="Proveedor" />}
                      getOptionSelected={(option, value) => option.id === value.id}
                    />
                  <p>Error</p>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <Autocomplete
                      id="ReceiptType"
                      options={['Comprobante de compra', 'Factura']}
                      value={purchaseData.receiptType}
                      getOptionLabel={(option) => option}
                      onChange={(event, value) => setPurchaseData({ ...purchaseData, receiptType: value })}
                      fullWidth={true}
                      renderInput={(params) => <TextField {...params} label="Tipo de comprobante" />}
                      getOptionSelected={(option, value) => option.id === value.id}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <Autocomplete
                      id="PurchaseState"
                      options={['En transito', 'Recibida']}
                      value={purchaseData.purchaseState}
                      getOptionLabel={(option) => option}
                      onChange={(event, value) => setPurchaseData({ ...purchaseData, purchaseState: value })}
                      fullWidth={true}
                      renderInput={(params) => <TextField {...params} label="Estado de la compra" />}
                      getOptionSelected={(option, value) => option.id === value.id}
                    />
                  </GridItem>
                </GridContainer>
                <h5>Filtros de busqueda:</h5>
                <SearchProductsInput />
                {/* <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <TextField
                      className={classes.input}
                      label="Nombre"
                      id="name"
                      onChange={handleChangeName}
                      fullWidth
                      autoComplete="off"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <Autocomplete
                      id="Supplier"
                      // value={castedFilters.supplierId}
                      options={suppliers.data}
                      getOptionLabel={(option) => option.businessName}
                      onChange={(event, value) => handleChangeSupplierId(value)}
                      fullWidth={true}
                      renderInput={(params) => <TextField {...params} label="Proveedor" />}
                      getOptionSelected={(option, value) => option.id === value.id}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <Autocomplete
                      id="Cateogry"
                      options={categories}
                      getOptionLabel={(option) => option.categoryName}
                      onChange={(event, value) => handleChangeCategoryId(value)}
                      fullWidth={true}
                      renderInput={(params) => <TextField {...params} label="Categoria" />}
                      getOptionSelected={(option, value) => option.id === value.id}
                    />
                  </GridItem>
                </GridContainer> */}

                {productList && productList.length > 0 ? (
                  <>
                    <h5>Detalle de compra</h5>
                    <TableHtml
                      tableData={
                        productList && productList.length > 0
                          ? productList.map((article) => {
                              return {
                                productId: article.productId,
                                name: article.name,
                                stock: article.stock,
                                price: article.price,
                              };
                            })
                          : null
                      }
                    />

                    <div className={classes.checkboxrow}>
                      <FormControlLabel
                        className={classes.checkbox}
                        control={<Checkbox onClick={handleHaveExpDate} color="primary" />}
                        label="Añadir fecha de vencimiento de pago"
                      />

                      {haveExpDate ? (
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                          <KeyboardDatePicker
                            className={classes.datePicker}
                            orientation="landscape"
                            openTo="date"
                            showTodayButton
                            variant="outlined"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Vencimiento de pago"
                            value={purchaseData.paymentExpDate}
                            onChange={(date) =>
                              setPurchaseData({ ...purchaseData, paymentExpDate: date.toISOString() })
                            }
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            cancelLabel="Cancelar"
                            okLabel="OK"
                            todayLabel="HOY"
                            disablePast
                            emptyLabel
                            leftArrowIcon
                            loadingIndicator
                          />
                        </MuiPickersUtilsProvider>
                      ) : null}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                      <h3>
                        {'Total de la compra: ' +
                          total.toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                      </h3>
                    </div>
                  </>
                ) : (
                  <h5 className="messageEmptyDataTable">Seleccione un proveedor para desplegar sus productos</h5>
                )}
              </CardBody>
              <CardFooter>
                <Button disabled={!purchaseData.supplierId} color="primary" type="submit">
                  Añadir
                </Button>
                <Button color="danger">Cancelar</Button>
              </CardFooter>
            </form>
          </>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
