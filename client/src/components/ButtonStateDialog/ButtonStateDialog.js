import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@mui/material/Select';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@mui/material/FormControl';
// import { cancelMail, dispatchMail } from "../../actions";
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { updatePurchaseStatus } from '../../actions/purchases';
import Token from '../../Token/Token';
import { useSnackbar } from 'notistack';

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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [purchaseNewStatus, setPurchaseNewState] = useState(state);
  const [purchaseActualStatus, setPurchaseActualState] = useState(state);
  const token = Token();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const handleChange = async (event) => {
    setPurchaseNewState(event.target.value);
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
    setPurchaseActualState(state);
    setOpen(true);
  };

  const handleOkButton = () => {
    dispatch(updatePurchaseStatus(token, { purchaseStatus: purchaseNewStatus }, purchaseId, enqueueSnackbar, closeSnackbar));
    setPurchaseActualState(purchaseNewStatus);
    // sendMail()
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setPurchaseNewState(state);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        size={'small'}
        variant={purchaseActualStatus === 'en transito' ? 'outlined' : 'text'}
        disabled={purchaseActualStatus === 'en transito' ? false : true}
        classes={{
          root: classes.stateButton,
          disabled: classes.disabled,
        }}
      >
        {purchaseActualStatus}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cambiar estado</DialogTitle>
        <DialogContent>
          <DialogContentText>Id de la compra: {purchaseId}</DialogContentText>
          <form className={classes.container}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select value={purchaseNewStatus} onChange={handleChange} style={{ width: '100%' }}>
                <MenuItem value={'en transito'}>En transito</MenuItem>
                <MenuItem value={'recibida'}>Recibida</MenuItem>
                <MenuItem value={'cancelada'}>Cancelada</MenuItem>
              </Select>
            </FormControl>
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
