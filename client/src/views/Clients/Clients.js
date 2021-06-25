import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getClients, addClient } from '../../actions/clients'
import { getPriceList } from '../../actions/pricelists'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";
import CardFooter from "../../components/Card/CardFooter.js";

import Token from '../../Token/Token'

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
  formControl: {
    display: 'flex',
    margin: '27px 0 0 0',
    minWidth: 120,
    paddingBottom: '10px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Clients() {
  // const useStyles = makeStyles(styles);
  const classes = useStyles();
  const dispatch = useDispatch()
  const url = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  var token = Token();
  const clients = useSelector(state => state.clients);
  const pricelists = useSelector(state => state.pricelists);
  const [showNew, setShowNew] = useState(false);
  const [data, setData] = useState({
    businessName: '',
    cuit: '',
    phone: '',
    altphone: '',
    address: '',
    city: '',
    CP: '',
    pricelistId: '',
    obs: ''
  });

  useEffect(() => {
    dispatch(getClients(token));
    dispatch(getPriceList(token));
  }, [url.pathname])

  const resetForm = () => {
    setData({
      ...data,
      businessName: '',
    cuit: '',
    phone: '',
    altphone: '',
    address: '',
    city: '',
    CP: '',
    pricelistId: '',
    obs: ''
    })
  }

  const handleNewClient = () => {
    setShowNew(!showNew)
  }

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addClient(data, token, enqueueSnackbar, closeSnackbar))
    resetForm()
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className={classes.card}>
              <h4 className={classes.cardTitleWhite}>Nuevo cliente</h4>
              {showNew ? null : <Button color="info" onClick={handleNewClient}>Añadir</Button>}
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
                        name="businessName"
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
                        name="cuit"
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
                        name="phone"
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
                        name="altphone"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        type='number'
                        value={data.altphone}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        className={classes.input}
                        label="Direccion"
                        name="address"
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
                        name="city"
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
                        name="CP"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        value={data.CP}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>Listado de precio</InputLabel>
                        <Select
                          onChange={handleChange}
                          fullWidth={true}
                          name="pricelistId"
                          value={data.pricelistId && data.pricelistId}
                        >
                          {
                            pricelists && pricelists.length > 0 ?
                            pricelists.map(pricelist => {
                              return (
                                <MenuItem value={pricelist.id}>{pricelist.priceListName}</MenuItem>
                              )
                            })
                            :
                              <MenuItem disabled value={0}>No existen listados de precio</MenuItem>
                          }
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        className={classes.input}
                        label="Observaciones"
                        name="obs"
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
                  <Button color="danger" onClick={handleNewClient}>Cancelar</Button>
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
            <h4 className={classes.cardTitleWhite}>Clientes --EQUIPOS ASOCIADOS?--</h4>
            <p className={classes.cardCategoryWhite}>
              Listado de clientes
            </p>
          </CardHeader>
          <CardBody>
            {clients && clients.length > 0 ?
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Razon social", "Cuit", "Telefono", "Direccion", "Equipo asociado"]}
                tableData={clients && clients.length > 0 ?
                  clients.map((client, index) => {
                    return {
                      id: client.id,
                      data: [client.id, client.businessName, client.cuit, client.phone, client.address, client.pricelistId ]
                    }
                  })
                  : null}
              />
              : <h5 style={{ display: "flex", justifyContent: "center" }}>No existen clientes</h5>
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
