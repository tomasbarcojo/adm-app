import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
// import { removeProduct, removeCategory } from "../../actions";

const useStyles = makeStyles((theme) => ({
  IconButton: {
    padding: '0px 5px 0px 5px',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ props, categoria }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const url = useLocation();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = (e) => {
    e.preventDefault();
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
        <Tooltip title="Editar">
          <EditIcon color="primary" />
        </Tooltip>
      </IconButton>
      <IconButton onClick={handleClickOpen} className={classes.IconButton}>
        <Tooltip title="Eliminar">
          <DeleteIcon color="primary" />
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
        <DialogTitle id="alert-dialog-slide-title">{'¿Desea eliminar?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Esta accion borra para siempre</DialogContentText>
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
