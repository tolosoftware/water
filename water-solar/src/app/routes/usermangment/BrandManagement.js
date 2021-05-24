import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Spinner from 'react-spinner-material';

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
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

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
  const [visibility,setVisibility]= useState(false);
  const [pumpBrand,setPumpBrand]= useState([]);
  const [solarBrand,setSolarBrand]= useState([]);
  const [inverterBrand,setInverterBrand]= useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  //drop down
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;

  useEffect(() => {
    const getUserBrand=async (userId) => {
      setVisibility(true);
     axios.get('api/userBrand/'+userId)
        .then(
            res => {
              setVisibility(false);
              setPumpBrand(res.data.pumpBrand);
              setSolarBrand(res.data.solarBrand);
              setInverterBrand(res.data.inverterBrand);
            }
        ).catch(err =>{
              setVisibility(false);
              console.log(err);
              NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
            }
           
        )
    };
    if(open){
      getUserBrand(userId);
    }
  }, [open, userId])

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
            <div className="row">
            {visibility ? (
                <span className="row justify-content-center">
                  <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
                </span>
              ) : 
              <>
                <div className="col-xl-4 col-lg-4 col-md-4 col-4">
                  <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Pump Brand</FormLabel>
                      <FormGroup>
                        {pumpBrand?.map((brand, index) => 
                          <FormControlLabel key={index}
                            control={<Checkbox checked={jason} onChange={handleChange} name={brand?.name} />}
                            label={brand?.name}
                          />
                        )}
                        
                        <FormControlLabel
                          control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                          label="Jason Killian"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                          label="Antoine Llorca"
                        />
                      </FormGroup>
                      <FormHelperText>Be careful</FormHelperText>
                    </FormControl>
                  </div>
                </div>
            
                <div className="col-xl-4 col-lg-4 col-md-4 col-4">
                  <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Solar Brand</FormLabel>
                      <FormGroup>
                        {solarBrand?.map((brand, index) => 
                          <FormControlLabel key={index}
                            control={<Checkbox checked={gilad} onChange={handleChange} name={brand?.name} />}
                            label={brand?.name}
                          />
                        )}
                        <FormControlLabel
                          control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                          label="Jason Killian"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                          label="Antoine Llorca"
                        />
                      </FormGroup>
                      <FormHelperText>Be careful</FormHelperText>
                    </FormControl>
                  </div>
                </div>
            
                <div className="col-xl-4 col-lg-4 col-md-4 col-4">
                  <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Inverter Brand</FormLabel>
                      <FormGroup>
                        {inverterBrand?.map((brand, index) => 
                          <FormControlLabel key={index}
                            control={<Checkbox checked={gilad} onChange={handleChange} name={brand?.name} />}
                            label={brand?.name}
                          />
                        )}
                        <FormControlLabel
                          control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                          label="Jason Killian"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                          label="Antoine Llorca"
                        />
                      </FormGroup>
                      <FormHelperText>Be careful</FormHelperText>
                    </FormControl>
                  </div>
                </div>
              </>
              }
              
            </div>
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
