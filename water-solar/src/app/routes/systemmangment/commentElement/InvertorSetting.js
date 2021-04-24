import React, { useState, useEffect } from "react";
// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import {useDropzone} from "react-dropzone";
import { v4 as uuidv4 } from 'uuid';
// code for small steps
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
// import WaterPumpDeviceSettingForm from './WaterPumpDeviceSettingForm';
// end import for dialog 
// start of dialog modal for Solar Panal 
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
  // end of dialog modal for Solar Panal 

  // end code for dropzone
export default function InvertorSetting(props){
    // start code of dialog modal for Solar Panal 
    const {openSID, setOpenSID} = props;
    const handleClose = () => {
      setOpenSID(false);
    };
    // end code of dialog modal for Solar Panal 
   
  const invertorList_Id = props.invertorListId;
  const invertorListModel = props.invertorListModel;
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), power: '', invertor_list_id: invertorList_Id},
  ]);

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }
   
  const handleAddFields = () => {
    let newElement = { id: uuidv4(), power: inputFields[inputFields.length-1].power, invertor_list_id: invertorList_Id};
    setInputFields([...inputFields, newElement])
  }
  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
  
  useEffect(() => {
    // console.log("invertorList Id before if", props.invertorListId);
    if(props.invertorListId!==0){
      // inputFields[0].invertorListId=props.invertorListId;
      getInvertorListSettings(props.invertorListId);
      // console.log("invertorList Id inside if", props.invertorListId);
    }
    // console.log("invertorList Id outside if", props.invertorListId); 
     
    // console.log("invertorList Id outside if", props.invertorListId);  
  },[props.invertorListId])
  
  const getInvertorListSettings = async(id) => {
    // console.log("id: ", id);
    if(id!==0 && id!==""){
      // console.log("ok it is not 0", id);
      axios.get('api/invertorListSetting/'+id)
      .then(res => { 
        let mydata = res.data;
        // console.log("the result: "+ mydata + "length"+ mydata.length);
        const mainArray = []
        if(mydata.length !== 0){
          mydata.forEach(elem => {
            //   console.log(elem); 
            mainArray.push({ id: elem.id, power: elem.power, invertor_list_id: elem.invertor_list_id});
          });
          // console.log('mainArray is: ',mainArray);
        }else{
          mainArray.push({ id: uuidv4(), power: '', invertor_list_id: id});
        }
        setInputFields(mainArray);
      }).catch(err => {
        
          NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
          }
        )
    }
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      // let data = {
      //     power, 
      // }
      console.log(inputFields);
      axios.post('api/invertorListSetting', inputFields)
        .then(
            res => {
            //   console.log(res);
              NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
              handleClose();
            }
        ).catch(
            err =>{
              NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
                console.log(err);
            } 
        )
  }
  let id_field;
    return (
        <Dialog onClose={handleClose} className="dialogWD" fullWidth={'md'} maxWidth={'md'} aria-labelledby="customized-dialog-title" open={openSID}>
           <form autoComplete="off" onSubmit={handleSubmit}>  
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleClose}>
              Setup of {invertorListModel}
            </DialogTitle>
            <DialogContent dividers>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    { inputFields.map(inputField => (
                    <div key={id_field = inputField.id}>
                      <div className="row insideSPDS paddingBottom">
                          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inWPS3 inputAdornmentWrap">
                              <TextField required size="small" name='power' value={inputField.power} onChange={event => handleChangeInput(inputField.id, event)}
                                  id="outlined-number1"
                                  label="Invertor Power"
                                  type="number"
                                  InputLabelProps={{
                                      shrink: true,
                                  }}
                                  variant="outlined"
                              />
                          </div>
                      </div>
                  </div>
                  )) }
              </div>
          </div>
            </DialogContent>
            
            <DialogActions>
              <IconButton size="small" color="primary" aria-label="remove alarm" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(id_field)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="remove alarm" onClick={handleAddFields}>
                <AddCircleOutlineIcon />
              </IconButton>
              <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
    );
}