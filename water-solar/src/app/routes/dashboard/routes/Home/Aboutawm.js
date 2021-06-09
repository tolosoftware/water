import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function Aboutawm(props) {
  const {open,setOpen} = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        About AWM (AMO WATER MANAGEMENT)
        </DialogTitle>
        <DialogContent dividers>
          <h4 className='mb-1'>Version: 1.1</h4>
          <p>
          AWM is a non-profit online software which developed for planning and calculation of solar water pumping systems. Developing of this online software begin on 2019 and the user start its using on July 2021. 
          </p>
          <h4 className='mb-1'>Vision:</h4>
          <p>
          AWM team always tried to simplified and speed up the planning and designing of a solar water pumping system in all location of Afghanistan. 
          </p>
          <h4 className='mb-1'>Mission: </h4>
          <p>
          We want to institutionalize of this online software among the people in the next few years for accurately calculation the solar water pumping systems.
          </p>
          <h4 className='mb-1'>Copy right:</h4>
          <p>
          All privileges of this online software are registered in commercial and judicial organization of the Government of Afghanistan, and any copying and misuse of it will be illegal and violators will be dealt with severely.
          </p>
          <br/>
          <Typography className='mb-2'>
          For more information please contact:
          <p>
            <a href="mail:info@awm.solar">info@awm.solar</a> <br/>
            <a href="tel:+93790303132">+93790303132</a>
          </p>
          </Typography>
          
        </DialogContent>
      
      </Dialog>
    </div>
  );
}
