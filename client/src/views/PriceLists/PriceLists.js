import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import { getPriceList, addPriceList } from '../../actions/pricelists'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";
import CardFooter from "../../components/Card/CardFooter.js";

import { getArticles } from '../../actions/article'
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
  articleRow: {
    backgroundColor: '#F6F6F6',
    margin: '10px',
    padding: '15px',
    borderRadius: '5px'
  },
  articleInput: {
    padding: '5px 0px 5px 0px',
  },
}));

export default function PriceLists() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  var token = Token();
  const pricelists = useSelector(state => state.pricelists);
  const articles = useSelector(state => state.articles)
  const [showNew, setShowNew] = useState(false);
  const [priceListName, setpriceListName] = useState('')
  const data = []

  useEffect(() => {
    dispatch(getPriceList(token));
    dispatch(getArticles(token));
  }, []);

  const resetForm = () => {
    setpriceListName('')
    for (let i = 1; i < articles.length + 1; i++) {
      document.getElementById(i).value = '' 
    }
  };

  const handleNewClient = () => {
    setShowNew(!showNew)
  };

  const handleChangepriceListName = (event) => {
    setpriceListName(event.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = {
      priceListName: priceListName,
      data: data
    }
    dispatch(addPriceList(dataObj, token, enqueueSnackbar, closeSnackbar));
    resetForm();
  };

  const handleChangeInput = (event) => {
    var changeMade = false
    if (data.length > 0) {
      data.map(el => {
        if (el.articleId === event.target.id) {
          el.percentage = event.target.value;
          changeMade = true;
        }
      })
      if (!changeMade) {
        const newData = {
          articleId: event.target.id,
          percentage: event.target.value
        }
        data.push(newData)
      }
    } else {
      const newData = {
        articleId: event.target.id,
        percentage: event.target.value
      }
      data.push(newData)
    }
  }

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
                    <GridItem xs={12} sm={12} md={3}>
                      <TextField
                        className={classes.input}
                        label="Nombre del listado"
                        id="priceListName"
                        onChange={handleChangepriceListName}
                        fullWidth
                        autoComplete='off'
                        value={priceListName}
                      />
                    </GridItem>
                  </GridContainer>
                  <h5>Articulos:</h5>

                  {
                    articles && articles.length > 0 ?
                      articles.map((article) => {
                        return (
                          <div key={article.id} className={classes.articleRow}>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={9}>
                                <label>{article.articleName}</label>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={3}>
                                <input id={article.id} onChange={handleChangeInput} type="number" className={classes.articleInput} />
                              </GridItem>
                            </GridContainer>
                          </div>
                        )
                      })
                      : <h6>No existen articulos</h6>
                  }

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
          : <h5 style={{ display: "flex", justifyContent: "center"}}>No existen listados de precio</h5>}            
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}