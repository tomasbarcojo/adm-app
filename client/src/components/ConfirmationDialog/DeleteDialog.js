import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/core/styles";
// import { removeProduct, removeCategory } from "../../actions";

const useStyles = makeStyles((theme) => ({
  IconButton: {
    padding: '0px 5px 0px 5px'
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({props, categoria}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch()
  const url = useLocation()

  const handleCancel = () => {
    setOpen(false)
  }

  const handleClose = (e) => {
    e.preventDefault()
    // if (url.pathname === '/admin/editCategory') {
    //   dispatch(removeCategory(categoria.id))
    //   setOpen(false);
    // }
    // else if (url.pathname === '/admin/products/edit') {
    //   dispatch(removeProduct(props.productos.id))
    //   setOpen(false);
    // }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} className={classes.IconButton}>
        <Tooltip title='Editar'>
            <EditIcon color='primary' />
        </Tooltip>
        </IconButton>
        <IconButton onClick={handleClickOpen} className={classes.IconButton}>
        <Tooltip title='Eliminar'>
            <DeleteIcon color='primary' />
        </Tooltip>
        </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"¿Desea eliminar?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Esta accion borra para siempre
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}