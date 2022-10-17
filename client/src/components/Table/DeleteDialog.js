import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import styles2 from '../../styles/components/tasksStyle.js';
import Token from '../../Token/Token';
import { universalDelete } from '../../actions/universalDelete.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles2 = makeStyles(styles2);

export default function AlertDialogSlide(props) {
  const [open, setOpen] = useState(false);
  const classes2 = useStyles2();
  const dispatch = useDispatch();
  var token = Token();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { path, id } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (path, id) => {
    dispatch(universalDelete(path, id, token, enqueueSnackbar, closeSnackbar));
    setOpen(false);
  };

  return (
    <>
      <Tooltip id="tooltip-top-start" title={`Eliminar ${id}`} placement="top" classes={{ tooltip: classes2.tooltip }}>
        <IconButton aria-label="Close" className={classes2.tableActionButton} onClick={() => handleClickOpen()}>
          <Close className={classes2.tableActionButtonIcon + ' ' + classes2.close} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">¿Desea eliminar?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Esta accion lo borrará para siempre</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleDelete(path, id)} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
