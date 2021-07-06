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
import Divider from "@material-ui/core/Divider";

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import FormHelperText from '@material-ui/core/FormHelperText';
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
  const { handleSubmit } = useForm(); // initialize the hook
  const { open, setOpen, userId } = props;
  const [visibility,setVisibility]= useState(false);
  const [pumpBrand,setPumpBrand]= useState([]);
  const [solarBrand,setSolarBrand]= useState([]);
  const [inverterBrand,setInverterBrand]= useState([]);
  const [estimatedCost,setEstimatedCost]= useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  //drop down
  const classes = useStyles();
   
 
  const handleChangeP = (id, value) => {
    // console.log('pumpBrand', value);
    const newPumpBrand = pumpBrand.map(i => {
      if(i.id === id){
        i['user_brand_role'][0]['checked'] = value? "true":"false"
      }
      return i;
    })
    setPumpBrand(newPumpBrand);
  };
  const handleChangeS = (id, value) => {
    // console.log('solarBrand', value);
    const newBrand = solarBrand.map(i => {
      if(i.id === id){
        i['user_brand_role'][0]['checked'] = value? "true":"false"
      }
      return i;
    })
    setSolarBrand(newBrand);
  };
  const handleChangeI = (id, value) => {
    // console.log('inverterBrand', value);
    const newBrand = inverterBrand.map(i => {
      if(i.id === id){
        i['user_brand_role'][0]['checked'] = value? "true":"false"
      }
      return i;
    })
    setInverterBrand(newBrand);
  };

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
              var esCoValue = (res.data.estimatedCost)=='true'?true:false;
              setEstimatedCost(esCoValue);
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

  const onSubmit = () => {
    let data ={
      'pumpBrand': pumpBrand, 'solarBrand': solarBrand, 'inverterBrand': inverterBrand, 'id': userId,
    };
    data['estimatedCost']=estimatedCost?'true':'false';
    // console.log('data in post form', data);
    axios
      .post("api/postUserBrand", data)
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
          User Role Management Form
        </DialogTitle>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <div className="row">
            {visibility ? (
                <div className="col-xl-12 col-lg-12 col-md-12 col-12 justify-content-center">
                  <span className="row justify-content-center">
                    <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
                  </span>
                </div>
              ) : 
              <>
                <div className="col-xl-4 col-lg-4 col-md-4 col-4">
                  <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Pump Brand</FormLabel>
                      <FormGroup>
                        {pumpBrand?.map((brand, index) => 
                          <FormControlLabel key={index}
                            control={<Checkbox checked={(brand?.user_brand_role[0]?.checked=="true")? true:false} onChange={event => handleChangeP(brand?.id, event.target.checked)} name={brand?.name}  />}
                            label={brand?.name}
                          />
                        )}
                      </FormGroup>
                      {/* <FormHelperText>Be careful</FormHelperText> */}
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
                            control={<Checkbox checked={(brand?.user_brand_role[0]?.checked=="true")? true:false} onChange={event => handleChangeS(brand?.id, event.target.checked)} name={brand?.name} />}
                            label={brand?.name}
                          />
                        )}
                       
                      </FormGroup>
                      {/* <FormHelperText>Be careful</FormHelperText> */}
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
                            control={<Checkbox checked={(brand?.user_brand_role[0]?.checked=="true")? true:false} onChange={event => handleChangeI(brand?.id, event.target.checked)} name={brand?.name} />}
                            label={brand?.name}
                          />
                        )}
                        
                      </FormGroup>
                      {/* <FormHelperText>Be careful</FormHelperText> */}
                    </FormControl>
                  </div>
                </div>
                <Divider className="mb-3 mt-3" />
                
                <div className="col-xl-4 col-lg-4 col-md-4 col-4">
                  <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Estimated Cost</FormLabel>
                      <FormGroup>
                          <FormControlLabel 
                            control={<Checkbox checked={estimatedCost} onChange={event => setEstimatedCost(event.target.checked)} name='Estimated Cost'  />}
                            label='Estimated Cost'
                          />
                      </FormGroup>
                      {/* <FormHelperText>Be careful</FormHelperText> */}
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
