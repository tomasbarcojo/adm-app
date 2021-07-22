import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { addSupplier, getSuppliers, getSuppliersByName } from '../../actions/suppliers'
import MaterialTable from 'material-table'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Table from "../../components/Table/Table.js";

import avatar from "../../images/faces/marc.jpg";
import Token from '../../Token/Token'

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
    },
    searchInput: {
      backgroudColor: 'red',
      background: 'white'
    }
  };
  
  const useStyles = makeStyles(styles);

export default function SuppliersList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const suppliers = useSelector(state => state.suppliers);
    var token = Token();

    const handleChangeSearchInput = (e) => {
        const name = {name: e.target.value}
        if (name.name.length > 0) {
          dispatch(getSuppliersByName(token, name))
        } else {
          dispatch(getSuppliers(token))
        }
      }

    return (
        <div>
            <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <div className={classes.card}>
                <div>
                  <h4 className={classes.cardTitleWhite}>Proveedores</h4>
                  <p className={classes.cardCategoryWhite}>
                    Listado de proveedores
                  </p>
                </div>
                <input className='searchInput' type="search" placeholder="Buscar..." onChange={handleChangeSearchInput}/>
              </div>
            </CardHeader>
            <CardBody>
              {suppliers && suppliers.length > 0 ?
                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Razon Social", "CUIT", "Test1", "Test2"]}
                  tableData={suppliers && suppliers.length > 0 ?
                    suppliers.map((supplier, index) => {
                      return {
                        id: supplier.id,
                        data: [supplier.id, supplier.businessName, supplier.cuit, supplier.phone, supplier.CP]
                      }
                    })
                    : null}
                />
                : <h5 style={{ display: "flex", justifyContent: "center" }}>No existen proveedores</h5>
              }
            </CardBody>
          </Card>
        </GridItem>
        </div>
    )
}
