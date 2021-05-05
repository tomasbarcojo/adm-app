import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
// core components
import Quote from "../../components/Typography/Quote.js";
import Muted from "../../components/Typography/Muted.js";
import Primary from "../../components/Typography/Primary.js";
import Info from "../../components/Typography/Info.js";
import Success from "../../components/Typography/Success.js";
import Warning from "../../components/Typography/Warning.js";
import Danger from "../../components/Typography/Danger.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
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
  articleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  article: {
    margin: '100px'
  }
};

const useStyles = makeStyles(styles);

export default function Articles() {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Nuevo articulo</h4>
      </CardHeader>
      <form >
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                className={classes.input}
                label="Razon social"
                id="businessName"
                // onChange={handleChange}
                fullWidth
                autoComplete='off'
              // value={data.businessName}
              />
            </GridItem>

          </GridContainer>

          <h5>Articulos:</h5>

          {/* {articles.map...} */}

          {/* <GridContainer>
              <GridItem xs={10} sm={10} md={8}> */}
          <div className={classes.articleRow}>
            <p className={classes.article}>Name article</p> <input />
          </div>
          {/* </GridItem>
              </GridContainer> */}
        </CardBody>
      </form>
    </Card>
  );
}
