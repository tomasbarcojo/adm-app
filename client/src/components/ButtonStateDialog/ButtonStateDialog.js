import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DialogContentText from '@material-ui/core/DialogContentText';
// import { cancelMail, dispatchMail } from "../../actions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 250,
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
  },
  stateButton: {
    color: 'black',
    '&:disabled': {
      color: 'black',
    },
  },
}));

export default function DialogSelect({ state, purchaseId, to, name }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [purchaseState, setPurchaseState] = useState(state);
  const [data, setData] = useState(null);

  const handleChange = async (event) => {
    setPurchaseState(event.target.value);
  };

  // const sendMail = () => {
  //   if(orderState === 'cancelada'){
  //     // envia mail cuando se cancela la orden
  //     cancelMail(to, 'Su orden ha sido cancelada', name, orderId)
  //   } else if( orderState === 'despacho') {
  //     // envia mail cuando se despacha la orden
  //     console.log('ENTRO AL IF DE DESPACHO')
  //     dispatchMail(to, 'Su orden ha sido despachada', name, orderId)
  //   }
  // }

  const handleClickOpen = async () => {
    setOpen(true);
    const data = await fetch(`http://localhost:3001/purchase/detail/${purchaseId}`);
    const purchaseAux = await data.json();
    setData(purchaseAux);
    console.log(purchaseAux);
  };

  const handleOkButton = () => {
    if (purchaseState === 'recibida' && purchaseState !== state) {
      data.purchase.map((prod) => {
        console.log(prod);
        let newStock = prod.article.stock + prod.quantity;
        const product = {
          stock: newStock,
        };
        try {
          fetch(`http://localhost:3001/article/stock/${prod.articleId}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (err) {
          console.log(err);
        }
      });
    }
    if (purchaseState !== state) {
      try {
        fetch(`http://localhost:3001/purchase/state/${purchaseId}`, {
          method: 'PUT',
          body: JSON.stringify({ state: purchaseState }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((e) => console.log(e));
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // else {
  //   try {
  //     fetch(`http://localhost:3001/orders/detail/${purchaseId}`, {
  //       method: 'PUT',
  //       body: JSON.stringify({ state: purchaseState }),
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //     })
  //       .then(res => res.json())
  //       .then(data => console.log(data))
  //       .catch(e => console.log(e))
  //     setOpen(false);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };
  // sendMail()
  // }

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        size={'small'}
        variant={purchaseState === 'en transito' ? 'outlined' : 'text'}
        disabled={purchaseState === 'en transito' ? false : true}
        classes={{
          root: classes.stateButton,
          disabled: classes.disabled,
        }}
      >
        {purchaseState}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cambiar estado</DialogTitle>
        <DialogContent>
          <DialogContentText>Compra con nº de ID #{purchaseId}</DialogContentText>
          <form className={classes.container}>
            {/* <FormControl className={classes.formControl}> */}
            <InputLabel>Estado</InputLabel>
            <Select native value={purchaseState} onChange={handleChange} style={{ width: '100%' }}>
              <option value={'en transito'}>En transito</option>
              <option value={'recibida'}>Recibida</option>
              <option value={'cancelada'}>Cancelada</option>
            </Select>
            {/* </FormControl> */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleOkButton} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
