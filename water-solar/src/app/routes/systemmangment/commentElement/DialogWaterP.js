import React from "react";
import { withStyles } from '@material-ui/core/styles';
// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import WaterPumpDeviceForm from './WaterPumpDeviceForm';
// end import for dialog 
// start of dialog modal for water pump
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
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  // end of dialog modal for water pump
export default function DialogWaterP(props){
    // start code of dialog modal for water pump
    const {openD, setOpenD} = props;
    const handleClickOpen = () => {
        setOpenD(true);
    };
    const handleClose = () => {
        setOpenD(false);
    };
    // end code of dialog modal for water pump
    return (
        <Dialog onClose={handleClose}  aria-labelledby="customized-dialog-title" open={openD}>
            
            <DialogTitle id="customized-dialog-title" className='customizedDialog1' onClose={handleClose}>
            
            </DialogTitle>
            <DialogContent dividers>
                <WaterPumpDeviceForm />
            </DialogContent>
            
            <DialogActions>
                
            </DialogActions>
        </Dialog>
    );
}