import React, { useState } from 'react';

// Material-UI imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

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

export default function OrderDetailPurchase({ purchaseId }) {
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
                  <ListItem className={classes.listItem}>
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
                  {purchaseDetail && purchaseDetail.total.toLocaleString('es-AR', {
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
