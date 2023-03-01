import React, { useState } from 'react';

// Material-UI imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';

const { REACT_APP_URL_API } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    maring: '0px 15px 0',
  },
  container: {
    // margin: theme.spacing(1, 8),
    width: '425px',
  },
  listItem: {
    padding: theme.spacing(0, 0),
    margin: '0px 15px 0',
  },
  title: {
    marginTop: theme.spacing(2),
  },
  resumen: {
    display: 'flex',
    padding: '0 15px',
  },
  list: {
    '&:hover': {
      background: 'black',
      color: '#3F75CE',
    },
  },
  text: {
    color: 'black',
  },
  totalText: {
    display: 'flex',
    marginTop: '1rem',
    color: 'black',
    fontWeight: '700',
  },
}));

export default function ButtonDetailPurchase({ purchaseId }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [purchaseDetail, setPurchaseDetail] = useState(null);

  const handleClickOpen = async () => {
    setOpen(true);
    const data = await fetch(`${REACT_APP_URL_API}/purchase/${purchaseId}`);
    const purchaseDetailData = await data.json();
    setPurchaseDetail(purchaseDetailData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <MenuOpenIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.container}>
          <DialogTitle id="alert-dialog-title">Compra</DialogTitle>
          <DialogContent>
            <div className={classes.resumen} style={{ justifyContent: 'space-between' }}>
              <Typography variant="body1" gutterBottom>
                Resumen de compra
              </Typography>
              <div style={{ marginLeft: 'auto' }}>
                <Typography variant="body1" gutterBottom>
                  Total
                </Typography>
              </div>
            </div>
            <Divider variant="middle" />
            <List disablePadding>
              {purchaseDetail &&
                purchaseDetail.products.map((product) => (
                  //   <Link key={purchase.id} to={{ pathname: `/purchases/${purchase.id}` }} className={classes.list} >
                  <ListItem key={product.productId} className={classes.listItem}>
                    <ListItemText
                      className={classes.text}
                      primary={`${product.name} x${product.quantity}`} /*secondary={purchase.description}*/
                    />
                    <Typography variant="body2">
                      {(product.price * product.quantity).toLocaleString('es-AR', {
                        style: 'currency',
                        currency: 'ARS',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  </ListItem>
                  //   </Link>
                ))}
              <Divider variant="middle" />
              <ListItem className={classes.listItem}>
                <ListItemText className={classes.totalText} primary="Total" />
                <Typography variant="subtitle1" className={classes.totalText}>
                  {purchaseDetail &&
                    purchaseDetail.total.toLocaleString('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </Typography>
              </ListItem>
            </List>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
