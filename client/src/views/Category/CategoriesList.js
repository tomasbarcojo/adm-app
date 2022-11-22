import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../actions/categories';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Table from '../../components/Table/Table.js';

import Token from '../../Token/Token';

const styles = {
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
  input: {
    margin: '27px 0 0 0',
    paddingBottom: '10px',
  },
  searchInput: {
    backgroudColor: 'red',
    background: 'white',
  },
};

const useStyles = makeStyles(styles);

export default function CategoriesList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  var token = Token();

  useEffect(() => {
    dispatch(getCategories(token));
  }, []);

  const handleChangeSearchInput = (e) => {
    const name = { name: e.target.value };
    dispatch(getCategories(token));
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <div className={classes.card}>
                <div>
                  <h4 className={classes.cardTitleWhite}>Categorias</h4>
                  <p className={classes.cardCategoryWhite}>Listado de Categorias</p>
                </div>
                <input
                  className="searchInput"
                  type="search"
                  placeholder="Buscar..."
                  onChange={handleChangeSearchInput}
                />
              </div>
            </CardHeader>
            <CardBody>
              {categories && categories.length > 0 ? (
                <Table
                  tableHeaderColor="primary"
                  tableHead={['ID', 'Name', 'Image']}
                  tableData={
                    categories && categories.length > 0
                      ? categories.map((categories, index) => {
                          return {
                            id: categories.id,
                            data: [categories.id, categories.categoryName, categories.image],
                          };
                        })
                      : null
                  }
                />
              ) : (
                <h5 style={{ display: 'flex', justifyContent: 'center' }}>No existen categorias</h5>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}