import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { addSupplier, getSuppliers } from '../../actions/suppliers'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Table from "../../components/Table/Table.js";

import avatar from "../../images/faces/marc.jpg";

const styles = {
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
  }
};

const useStyles = makeStyles(styles);

export default function Suppliers() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const url = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const token = JSON.parse(localStorage.getItem('token'));
  const suppliers = useSelector(state => state.suppliers);
  const [showNew, setShowNew] = useState(false);
  const [data, setData] = useState({
    businessName: '',
    cuit: '',
    phone: '',
    altPhone: '',
    address: '',
    city: '',
    CP: '',
    bankaccount1: '',
    bankaccount2: '',
    bankaccount3: '',
    obs: ''
  });

  useEffect(() => {
    dispatch(getSuppliers(token));
  }, [url.pathname])

  const resetForm = () => {
    setData({
      ...data,
      businessName: '',
      cuit: '',
      phone: '',
      altPhone: '',
      address: '',
      city: '',
      CP: '',
      bankaccount1: '',
      bankaccount2: '',
      bankaccount3: '',
      obs: '',
    })
  }

  const handleNewSupplier = () => {
    setShowNew(!showNew)
  }

  const handleChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addSupplier(data, token, enqueueSnackbar, closeSnackbar))
    resetForm()
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <div className={classes.card}>
                <h4 className={classes.cardTitleWhite}>Nuevo proveedor</h4>
                {showNew ? null : <Button className={classes.buttonCard} color="info" onClick={handleNewSupplier}>Añadir</Button>}
              </div>
            </CardHeader>
            {showNew ?
              <>
                <form onSubmit={handleSubmit}>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={9}>
                        <TextField
                          className={classes.input}
                          label="Razon social"
                          id="businessName"
                          onChange={handleChange}
                          fullWidth
                          autoComplete='off'
                          value={data.businessName}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          className={classes.input}
                          label="Cuit"
                          id="cuit"
                          onChange={handleChange}
                          fullWidth
                          autoComplete='off'
                          type='number'
                          value={data.cuit}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          className={classes.input}
                          label="Telefono"
                          id="phone"
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
                          label="Telefono 2 (opcional)"
                          id="altPhone"
                          onChange={handleChange}
                          fullWidth
                          autoComplete='off'
                          type='number'
                          value={data.altPhone}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          className={classes.input}
                          label="Direccion"
                          id="address"
                          onChange={handleChange}
                          fullWidth
                          autoComplete='off'
                          value={data.address}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          className={classes.input}
                          label="Ciudad"
                          id="city"
                          onChange={handleChange}
                          fullWidth
                          autoComplete='off'
                          value={data.city}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          className={classes.input}
                          label="Codigo postal"
                          id="CP"
                          onChange={handleChange}
                          fullWidth
                          autoComplete='off'
                          value={data.CP}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          className={classes.input}
                          label="Cuenta bancaria 1"
                          id="bankaccount1"
                          onChange={handleChange}
                          fullWidth
                          autoComplete='off'
                          value={data.bankaccount1}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          className={classes.input}
                          label="Cuenta bancaria 2"
                          id="bankaccount2"
                          onChange={handleChange}
                          fullWidth
                          autoComplete='off'
                          value={data.bankaccount2}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          className={classes.input}
                          label="Cuenta bancaria 3"
                          id="bankaccount3"
                          onChange={handleChange}
                          fullWidth
                          autoComplete='off'
                          value={data.bankaccount3}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        {/* <InputLabel style={{ color: "#AAAAAA" }}>Observaciones</InputLabel> */}
                        <TextField
                          className={classes.input}
                          label="Observaciones"
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
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem> */}
        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Proveedores</h4>
            <p className={classes.cardCategoryWhite}>
              Listado de proveedores
            </p>
          </CardHeader>
          <CardBody>
            {suppliers && suppliers.length > 0 ?
            <Table
              tableHeaderColor="primary"
              tableHead={["Razon Social", "CUIT", "Test1", "Test2", "Test3"]}
              tableData={suppliers && suppliers.length > 0 ? 
                suppliers.map((supplier, index) => {
                  return [supplier.businessName, supplier.cuit, supplier.phone, supplier.CP]
                })
              : null}
            />
            : <h5 style={{ display: "flex", justifyContent: "center"}}>No existen proveedores</h5>
            }
          </CardBody>
        </Card>
      </GridItem>
      </GridContainer>
    </div>
  );
}
