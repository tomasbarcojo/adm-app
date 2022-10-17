import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Copyright from '../../utils/Copyright';
import NavBar from '../Home/NavBar';
import GridList from '@material-ui/core/GridList';
import ProductCard from '../ProductCard/ProductCard';

import { useDispatch, useSelector } from 'react-redux';
import { getArticlesByCategoryId } from '../../actions/article';

import Token from '../../Token/Token';

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
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
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
  },
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

export default function CategoryProducts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  var token = '';
  const { id } = useParams();
  var token = Token();
  const articles = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(getArticlesByCategoryId(token, id));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />

      <NavBar />

      <GridList cellHeight={450} className={classes.gridList} cols={4} spacing={0}>
        {articles && articles.length > 0 ? (
          articles.map((article) => {
            console.log(article);
            return <ProductCard props={article} />;
          })
        ) : (
          <h5 style={{ display: 'flex', justifyContent: 'center' }}>No existen productos</h5>
        )}
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
