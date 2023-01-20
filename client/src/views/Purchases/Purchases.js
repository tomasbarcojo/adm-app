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

import { clearArticleData, getArticlesBySupplierId } from '../../actions/article';
import { getPurchases, newPurchase } from '../../actions/purchases';
import Token from '../../Token/Token';
import { getSuppliers } from '../../actions/suppliers';
import TableHtml from '../../components/Table/TableHtml';

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

export default function PriceLists() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  var token = Token();
  const productList = useSelector((state) => state.purchase);
  const articles = useSelector((state) => state.articles);
  const suppliers = useSelector((state) => state.suppliers);
  const [supplierId, setSupplierId] = useState();
  const [purchaseState, setPurchaseState] = useState('');
  const total = useSelector((state) => state.purchaseTotal);
  const createdPurchases = useSelector((state) => state.createdPurchases);
  const [paymentExpDate, setPaymentExpDate] = useState();
  const [haveExpDate, setHaveExpDate] = useState(false);

  useEffect(() => {
    dispatch(clearArticleData());
    dispatch(getSuppliers(token));
    dispatch(getPurchases(token));
  }, []);

  useEffect(() => {
    if (supplierId) dispatch(getArticlesBySupplierId(token, supplierId));
  }, [supplierId]);

  // const resetForm = () => {
  //   setpriceListName('')
  //   for (let i = 1; i < articles.length + 1; i++) {
  //     document.getElementById(i).value = ''
  //   }
  // };

  const handleChangePriceListName = (value) => {
    if (value) setSupplierId(value.id);
    else dispatch(clearArticleData());
  };

  const handleChangePurchaseState = (event) => {
    setPurchaseState(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = {
      supplierId,
      productList,
      paymentExpirationDate: paymentExpDate,
    };
    dispatch(newPurchase(dataObj, token, enqueueSnackbar, closeSnackbar));
    // resetForm();
  };

  const handleDateChange = (date) => {
    setPaymentExpDate(date.toISOString());
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
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className={classes.input}
                      label="Nombre"
                      id="name"
                      // onChange={handleChange}
                      fullWidth
                      autoComplete="off"
                      // value={data.name}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Autocomplete
                      id="Supplier"
                      options={suppliers.data}
                      getOptionLabel={(option) => option.businessName}
                      onChange={(event, value) => handleChangePriceListName(value)}
                      fullWidth={true}
                      renderInput={(params) => <TextField {...params} label="Proveedor" />}
                      getOptionSelected={(option, value) => option.id === value.id}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Autocomplete
                      id="Supplier"
                      options={suppliers.data}
                      getOptionLabel={(option) => option.businessName}
                      onChange={(event, value) => handleChangePriceListName(value)}
                      fullWidth={true}
                      renderInput={(params) => <TextField {...params} label="Categoria" />}
                      getOptionSelected={(option, value) => option.id === value.id}
                    />
                  </GridItem>
                </GridContainer>

                {articles && articles.data?.length > 0 ? (
                  <>
                    <h5>Articulos:</h5>
                    <TableHtml
                      tableData={
                        articles.data && articles.data.length > 0
                          ? articles.data.map((article) => {
                              return {
                                id: article.id,
                                articleName: article.name,
                                stock: article.stock,
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
                            value={paymentExpDate}
                            onChange={handleDateChange}
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

                    {/* <div className={classes.checkboxrow}>
                          <FormControlLabel
                            className={classes.checkbox}
                            control={
                              <Checkbox
                                onClick={handleHaveExpDate}
                                color="primary"
                              />
                            }
                            label="Añadir pago"
                          />

                          {haveExpDate ?
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                              <KeyboardDatePicker
                                className={classes.datePicker}
                                orientation="landscape"
                                variant="static"
                                openTo="date"
                                showTodayButton
                                variant="outlined"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Vencimiento de pago"
                                value={paymentExpDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                                cancelLabel='Cancelar'
                                okLabel='OK'
                                todayLabel='HOY'
                                disablePast
                                emptyLabel
                                leftArrowIcon
                                loadingIndicator
                              />
                            </MuiPickersUtilsProvider>
                            : null
                          }
                        </div> */}

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                      <h3>
                        Total de la compra: ${' '}
                        {total.toLocaleString('es-AR', {
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
                <Button color="primary" type="submit">
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
