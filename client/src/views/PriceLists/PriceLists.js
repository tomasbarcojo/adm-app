import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import NumberFormat from 'react-number-format';
import { getPriceList, addPriceList } from '../../actions/pricelists'
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

export default function PriceLists() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const url = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const token = JSON.parse(localStorage.getItem('token'));
  const pricelists = useSelector(state => state.pricelists);
  const [showNew, setShowNew] = useState(true);
  const [data, setData] = useState({
    priceListName: '',
    percentage: '',
  });

  useEffect(() => {
    dispatch(getPriceList(token)); //cambiar
  }, [url.pathname]);

  const resetForm = () => {
    setData({
      ...data,
      priceListName: '',
      percentage: '',
    })
  };

  const handleNewClient = () => { //cambiar
    setShowNew(!showNew)
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPriceList(data, token, enqueueSnackbar, closeSnackbar)); //cambiar
    resetForm();
  };

  console.log(data.percentage)

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className={classes.card}>
              <h4 className={classes.cardTitleWhite}>Nuevo listado</h4>
              {showNew ? null : <Button color="info" onClick={handleNewClient}>Añadir</Button>}
            </div>
          </CardHeader>
          {showNew ?
            <>
              <form onSubmit={handleSubmit}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <TextField
                        className={classes.input}
                        label="Nombre del listado"
                        id="priceListName"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        value={data.priceListName}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        className={classes.input}
                        label="Porcentaje a aplicar"
                        id="percentage"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        type='number'
                        value={data.percentage}
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
            <h4 className={classes.cardTitleWhite}>Listados</h4>
            <p className={classes.cardCategoryWhite}>
              Listado de precios
            </p>
          </CardHeader>
          <CardBody>
            {pricelists && pricelists.length > 0 ?
              <Table
                tableHeaderColor="primary"
                tableHead={["Nombre", "Porcentaje"]}
                tableData={pricelists && pricelists.length > 0 ?
                  pricelists.map((pricelist, index) => {
                    return [pricelist.priceListName, "% " + pricelist.percentage]
                  })
                  : null}
              />
              : <h5 style={{ display: "flex", justifyContent: "center" }}>No existen listados de precios</h5>
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}