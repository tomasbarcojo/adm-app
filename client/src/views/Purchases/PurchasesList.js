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
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Table from "../../components/Table/Table.js";

import { clearArticleData, getArticlesBySupplierId } from '../../actions/article'
import { getPurchases, newPurchase } from '../../actions/purchases'
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
  }
}));

export default function PurchasesList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  var token = Token();
  const purchaseList = useSelector(state => state.purchase);
  const articles = useSelector(state => state.articles);
  const suppliers = useSelector(state => state.suppliers);
  const [supplierId, setSupplierId] = useState()
  const [showNew, setShowNew] = useState(true);
  const [purchaseState, setPurchaseState] = useState('')
  const total = useSelector(state => state.purchaseTotal)
  const createdPurchases = useSelector(state => state.createdPurchases)

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Compras</h4>
            <p className={classes.cardCategoryWhite}>
              Listado de compras
            </p>
          </CardHeader>
          <CardBody>
            {createdPurchases && createdPurchases.length > 0 ?
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Proveedor", "Estado", "Fecha", "Hora"]}
                tableData={
                  createdPurchases.map((purchase) => {
                    return {
                      id: purchase.id,
                      editpathname: 'editpricelist',
                      deletepathname: 'pricelist/deletepricelist',
                      data: [purchase.id,
                      purchase.supplier.businessName,
                      purchase.state,
                      purchase.createdAt.slice('T', 10),
                      purchase.createdAt.split('T')[1].slice(0, 5)
                      ]
                    }
                  })
                }
              />
              : <h5 style={{ display: "flex", justifyContent: "center" }}>No existen listados de precio</h5>}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}
