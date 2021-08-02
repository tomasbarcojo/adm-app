import React from 'react'
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

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
  }
}));

export default function ClientsList() {
  var token = Token();
  const classes = useStyles();
  const clients = useSelector(state => state.clients);

  return (
    <GridContainer >
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
                      data: [client.id, client.businessName, client.cuit, client.phone, client.address, client.pricelistId]
                    }
                  })
                  : null}
              />
              : <h5 style={{ display: "flex", justifyContent: "center" }}>No existen clientes</h5>
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer >
  )
}
