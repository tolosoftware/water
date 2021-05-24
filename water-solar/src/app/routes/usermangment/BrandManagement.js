import React /*, { useEffect, useState }*/ from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

// form dependency
// import { TextField, InputLabel, Select } from "@material-ui/core";
// import {
//   FormControl,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormHelperText,
// } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./stayle.css";
import axios from "axios";
import { useForm } from "react-hook-form";
//drop zoon
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";

//drop down
const useStyles = makeStyles((theme) => ({}));

//end drop down
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
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
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
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

export default function BrandManagement(props) {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const { open, setOpen, userId } = props;

  const handleClose = () => {
    setOpen(false);
  };
  //drop down
  const classes = useStyles();

  const onSubmit = (data) => {
    // console.log('data in post form', data);
    axios
      .post("api/user", data)
      .then((res) => {
        NotificationManager.success(
          <IntlMessages id="notification.successMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
        setOpen(false);
      })
      .catch((err) => {
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };

  return (
    <div className={classes.modlewidth}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth="md"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          User Brand Management Form
        </DialogTitle>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <div className="row">asdf</div>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className="pull-right"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <NotificationContainer />
    </div>
  );
}
