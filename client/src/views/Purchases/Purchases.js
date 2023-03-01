import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import 'date-fns';
// @mui/material components
import { makeStyles } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// core components
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Button from '../../components/CustomButtons/Button.js';
import CardFooter from '../../components/Card/CardFooter.js';

import { clearArticleData } from '../../actions/article';
import { addDataPurchase, newPurchase } from '../../actions/purchases';
import Token from '../../Token/Token';
import { getSuppliers } from '../../actions/suppliers';
import TableHtml from '../../components/Table/TableHtml';
import SearchProductsInput from '../../components/SearchProductsInput/SearchProductInput';
import SearchSuppliersInput from '../../components/SearchSuppliersInput/SearchSuppliersInput';

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
  const productList = useSelector((state) => state.newPurchase.productList);
  const newPurchaseSupplierId = useSelector((state) => state.newPurchase.supplierId);
  const total = useSelector((state) => state.purchaseTotal);
  const [haveExpDate, setHaveExpDate] = useState(false);
  const [purchaseData, setPurchaseData] = useState({
    supplierId: null,
    receiptType: 'Comprobante de compra',
    purchaseState: 'En transito',
    paymentExpDate: new Date(),
  });

  useEffect(() => {
    dispatch(clearArticleData());
    dispatch(getSuppliers(token));
  }, []);

  useEffect(() => {
    // console.log(!purchaseData.supplierId);
    // console.log(productList.productList.every((obj) => obj.hasOwnProperty('quantity') && obj['quantity'] !== 0));
    // console.log(
    //   !purchaseData.supplierId ||
    //     productList.productList.forEach((obj) => obj.hasOwnProperty('quantity') && obj['quantity'] !== 0),
    // );
    console.log(!newPurchaseSupplierId);
    console.log(productList.length === 0);
    console.log(!newPurchaseSupplierId || productList.length !== 0);
  }, [newPurchaseSupplierId, productList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = {
      supplierId: newPurchaseSupplierId,
      productList,
      purchaseState: purchaseData.purchaseState.toLocaleLowerCase(),
    };
    if (purchaseData.paymentExpDate) dataObj.paymentExpirationDate = purchaseData.paymentExpDate;
    dispatch(newPurchase(dataObj, token, enqueueSnackbar, closeSnackbar));
    // resetForm();
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
                    {/* <Autocomplete
                      id="Supplier"
                      autoComplete={true}
                      options={suppliers.length > 0 ? suppliers.data : []}
                      getOptionLabel={(option) => option.businessName}
                      onChange={(event, value) => {
                        setPurchaseData({ ...purchaseData, supplierId: value ? value.id : '' });
                        dispatch(addDataPurchase({ data: productList.productList, supplierId: value.id }));
                      }}
                      fullWidth={true}
                      renderInput={(params) => <TextField error={false} helperText="" {...params} label="Proveedor" />}
                      getOptionSelected={(option, value) => option.id === value.id}
                    /> */}
                    <SearchSuppliersInput />
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
                      sx={{
                        'button.MuiAutocomplete-clearIndicator': {
                          visibility: 'visible',
                        },
                      }}
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
                      tableData={productList.map((product) => {
                        return {
                          productId: product.productId,
                          name: product.name,
                          stock: product.stock,
                          price: product.price,
                        };
                      })}
                    />

                    <div className={classes.checkboxrow}>
                      <FormControlLabel
                        className={classes.checkbox}
                        control={<Checkbox onClick={handleHaveExpDate} color="primary" />}
                        label="Añadir fecha de vencimiento de pago"
                      />

                      {haveExpDate ? (
                        // <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                        //   <KeyboardDatePicker
                        //     className={classes.datePicker}
                        //     orientation="landscape"
                        //     openTo="date"
                        //     showTodayButton
                        //     variant="outlined"
                        //     format="dd/MM/yyyy"
                        //     margin="normal"
                        //     id="date-picker-inline"
                        //     label="Vencimiento de pago"
                        //     value={purchaseData.paymentExpDate}
                        //     onChange={(date) => {
                        //       setPurchaseData({ ...purchaseData, paymentExpDate: date ? date : 'Invalid Date' });
                        //     }}
                        //     KeyboardButtonProps={{
                        //       'aria-label': 'change date',
                        //     }}
                        //     cancelLabel="Cancelar"
                        //     okLabel="OK"
                        //     todayLabel="HOY"
                        //     disablePast
                        //     emptyLabel
                        //     leftArrowIcon
                        //     loadingIndicator
                        //   />
                        // </MuiPickersUtilsProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Basic example"
                            value={value}
                            onChange={(newValue) => {
                              setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
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
                ) : null}
              </CardBody>
              <CardFooter>
                <Button disabled={!newPurchaseSupplierId || productList.length === 0} color="primary" type="submit">
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
