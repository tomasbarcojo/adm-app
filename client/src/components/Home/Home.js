import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Copyright from '../../utils/Copyright'
import NavBar from './NavBar'
import GridList from '@material-ui/core/GridList';
import CategoriesCard from '../CategoriesCard/CategoriesCard';

import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../actions/categories'

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  gridList: {
    display: 'flex',
    justifyContent: 'center',
    height: '80%',
  }
}));

const footers = [
  {
    title: 'Compania',
    description: ['Equipo', 'Historia', 'Contactanos', 'Ubicaciones'],
  },
  {
    title: 'Caracteristicas',
    description: ['Cosas interesantes', 'Caracteristica 2', 'Caracteristicas del equipo', 'Desarrolladores', 'Otros'],
  },
  {
    title: 'Recursos',
    description: ['Recurso', 'Recurso 2', 'Otro recurso', 'Recurso final'],
  },
  {
    title: 'Legal',
    description: ['Politica de privacidad', 'Terminos de uso'],
  },
];

export default function UsersManagment() {
  const classes = useStyles();
  const dispatch = useDispatch();
  var token = '';
  if (localStorage.length > 0) {
    token = JSON.parse(localStorage.getItem('token'));
  } else {
    token = JSON.parse(sessionStorage.getItem('token'));
  }
  const categories = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(getCategories(token));
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />

      <NavBar />

      {/* <div className='ProductCards'>
        <ProductCard /><ProductCard /><ProductCard />
      </div> */}

      {/* <GridList cellHeight={450} className={classes.gridList} cols={4} spacing={0}>
        <ProductCard /> <ProductCard /> <ProductCard /><ProductCard /><ProductCard /><ProductCard /><ProductCard /> <ProductCard /><ProductCard /><ProductCard /><ProductCard />
      </GridList> */}

      <GridList cellHeight={450} className={classes.gridList} cols={4} spacing={0}>
        {categories && categories.length > 0 ?
        categories.map(cat => {
          return (
            <CategoriesCard props={cat} />
          )
        })
        : <h5>No existen categorias</h5>
        }
      </GridList>

      {/* Hero unit */}
      {/* <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
          Gestion de usuarios
        </Typography>
      </Container> */}
      {/* End hero unit */}

      {/* FOOTER */}

      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}