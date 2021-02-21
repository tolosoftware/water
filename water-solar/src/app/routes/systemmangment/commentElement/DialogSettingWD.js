import React, { useState } from "react";
// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { v4 as uuidv4 } from 'uuid';
// code for small steps
import Slider from '@material-ui/core/Slider';
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


function valuetext(value) {
  return `${value}KW`;
} 

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
    root: {
        width: 300,
      },
      
  }));
  const marksM = [
    {
      value: 0,
      label: '0M',
    },
    {
      value: 400,
      label: '400M',
    },
  ];
  const marksD = [
    {
      value: 0,
      label: '0V',
    },
    {
      value: 50,
      label: '50V',
    },
  ];
  const marksCL = [
    {
      value: 0,
      label: '0M',
    },
    {
      value: 1000,
      label: '1000M',
    },
  ];
  
export default function DialogSettingWD(props){
  const classes = useStyles();
    // start code of dialog modal for Solar Panal 
    const {openWSD, setOpenWSD} = props;
    const handleClose = () => {
      setOpenWSD(false);
    };
    // end code of dialog modal for Solar Panal 
  
    const [inputFields, setInputFields] = useState([
      { id: uuidv4(), head: '', discharge: '', cableLength: '', cableType: ''},
    ]);
    const handleChangeStep = (id, event, value, name) => {
      const newInputFields = inputFields.map(i => {
        if(id === i.id) {
          if('head' === name){
            i['head'] = value;
          }
          if('discharge' === name){
            i['discharge'] = value;
          }
          if('cableLength' === name){
            i['cableLength'] = value;
          }
          
        }
        return i;
      })
      
      setInputFields(newInputFields);
    }
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
      setInputFields([...inputFields, { id: uuidv4(), head: '', discharge: '', cableLength: '', cableType: ''}])
    }
    const handleRemoveFields = id => {
      const values  = [...inputFields];
      values.splice(values.findIndex(value => value.id === id), 1);
      setInputFields(values);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("InputFields", inputFields);
    }
    let id_field;
    
    return (
        <Dialog onClose={handleClose} className="dialogWD"  aria-labelledby="customized-dialog-title" open={openWSD}>
           <form autoComplete="off" onSubmit={handleSubmit}>  
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleClose}>
              Setup
            </DialogTitle>
            <DialogContent dividers>
                {/* <WaterPumpDeviceSettingForm /> */}
                <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              { inputFields.map(inputField => (
                <div key={id_field = inputField.id}>
                    <div className="row paddingBottom">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inputAdornmentWrap">
                            <Typography id="discrete-slider-small-steps" gutterBottom>
                            Head 
                            </Typography>
                            <Slider name="head" onChange={(event, value) => handleChangeStep(inputField.id, event, value, 'head')}
                                defaultValue={200}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                step={5}
                                marks={marksM}
                                min={0}
                                max={400}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inputAdornmentWrap">
                            <Typography id="discrete-slider-small-steps" gutterBottom>
                            Discharge
                            </Typography>
                            <Slider name="discharge" onChange={(event, value) => handleChangeStep(inputField.id, event, value, 'discharge')}
                                defaultValue={25}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                step={1}
                                marks={marksD}
                                min={0}
                                max={50}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inWPS3 inputAdornmentWrap">
                            <Typography id="discrete-slider-small-steps" gutterBottom>
                                Cable length
                            </Typography>
                            <Slider name="cableLength" onChange={(event, value) => handleChangeStep(inputField.id, event, value, 'cableLength')}
                                defaultValue={500}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                step={10}
                                marks={marksCL}
                                min={0}
                                max={1000}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPadding inWPST">
                            <FormControl variant="outlined" size="small" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Cable Type</InputLabel>
                                <Select name="cableType"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={inputField.cableType}
                                onChange={event => handleChangeInput(inputField.id, event)}
                                label="Cable Type"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Cable Type 1</MenuItem>
                                <MenuItem value={20}>Cable Type 2</MenuItem>
                                <MenuItem value={30}>Cable Type 2</MenuItem>
                                </Select>
                            </FormControl>
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