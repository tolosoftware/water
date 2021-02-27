import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useDropzone} from "react-dropzone";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import SolarPanalDeviceForm from './SolarPanalDeviceForm';
// code for small steps
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import IntlMessages from 'util/IntlMessages';
import {NotificationManager} from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
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
    return `${value}W`;
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
// start code for dropzone
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
// end code for dropzone
  const marksW = [
    {
      value: 0,
      label: '0W',
    },
    {
      value: 270,
      label: '270W',
    },
];
const marksV = [
    {
      value: 0,
      label: '0V',
    },
    {
      value: 270,
      label: '270V',
    },
];
const marksC = [
    {
      value: 0,
      label: '0A',
    },
    {
      value: 270,
      label: '270A',
    },
];
export default function DialogSolarP(props){
    // start code of dialog modal for Solar Panal 
    const {openS,   setOpenS} = props;
    const handleCloseS = () => {
          setOpenS(false);
    };
    // end code of dialog modal for Solar Panal 
  const solarBrands=props.solarBrands;
  const [brand, setBrand] = useState("");
  const [typeModel, setTypeModel] = useState("");
  const [powerW, setPowerW] = useState("");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [cableType, setCableType] = useState("");
  const [description, setDescription] = useState("");
  const classes = useStyles();
  
// dropzone code
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt={file.name}
             src={file.preview}
             style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
// end dropzone code
// start get cable type
useEffect(() => {
  getCabletype();
},[])
const [cableTypesSelect,setCabletypesSelect]= useState([]);
const getCabletype=async () => {
  axios.get('api/cabletype')
    .then(res => {  
      setCabletypesSelect(res.data)
      }
  ).catch(err => {
         NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
        }
    )
};

// end get cable type
  const handleSubmit = (e) => {
    e.preventDefault();
    let dataSolarList = {
        brand, typeModel, powerW, voltage, current, cableType, description
    }
    console.log(dataSolarList);
    var image = '';
    let file = files[0];
    let reader = new FileReader();
    reader.onloadend = (file) => {
      image = reader.result;
      dataSolarList['image'] = image;
      dataSolarList['serial_no'] = uuidv4();
      axios.post('api/solarList', dataSolarList)
        .then(res => {
          setOpenS(false);
            NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
        }).catch(err =>{
          NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
          }
        )
    }
    reader.readAsDataURL(file); 
    

  }
    return (
      <Dialog onClose={handleCloseS}  aria-labelledby="customized-dialog-title" open={openS}>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleCloseS}>
              Add Solar Panal  Device
            </DialogTitle>
            <DialogContent dividers>
                {/* <SolarPanalDeviceForm /> */}
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                                <TextField size="small"
                                    id="outlined-read-only-input"
                                    label="ID"
                                    defaultValue={1}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                                <FormControl variant="outlined" size="small" className={classes.formControl}>
                                  <InputLabel id="demo-simple-select-outlined-label">Brand</InputLabel>
                                  <Select
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                  label="Brand"
                                  >
                                  <MenuItem value="">
                                      <em>None</em>
                                  </MenuItem>
                                  {solarBrands.map(brand => 
                                  <MenuItem value={brand.id}>{brand.name}</MenuItem>
                                  )}
                                  </Select>
                                </FormControl>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                                <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Type/Model" value={typeModel} onChange={(e) => setTypeModel(e.target.value)} variant="outlined" />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 insideFormPadding1 inputAdornmentWrap">
                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                    Power
                                    </Typography>
                                    <Slider onChange={(event, value) => setPowerW(value)}
                                        defaultValue={150}
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider-small-steps"
                                        step={20}
                                        marks={marksW}
                                        min={0}
                                        max={270}
                                        valueLabelDisplay="auto"
                                    />
                            </div>
                            
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 insideFormPadding2 inputAdornmentWrap">
                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                    Voltage
                                    </Typography>
                                    <Slider onChange={(event, value) => setVoltage(value)}
                                        defaultValue={150}
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider-small-steps"
                                        step={20}
                                        marks={marksV}
                                        min={0}
                                        max={270}
                                        valueLabelDisplay="auto"
                                    />
                            </div>
                            
                            <div className="col-xl-8 col-lg-8 col-md-8 col-12 insideFormPadding3 inputAdornmentWrap">
                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                    Current
                                    </Typography>
                                    <Slider onChange={(event, value) => setCurrent(value)}
                                        defaultValue={150}
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider-small-steps"
                                        step={20}
                                        marks={marksC}
                                        min={0}
                                        max={270}
                                        valueLabelDisplay="auto"
                                    />
                            </div>
                            
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBPCable">
                              <FormControl variant="outlined" size="small" className={classes.formControl}>
                                  <InputLabel id="demo-simple-select-outlined-label">Cable Type</InputLabel>
                                  <Select
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={cableType}
                                  onChange={(e) => setCableType(e.target.value)}
                                  label="Cable Type"
                                  >
                                  <MenuItem value="">
                                      <em>None</em>
                                  </MenuItem>
                                  {cableTypesSelect.map(cableOption => 
                                  <MenuItem value={cableOption.id}>{cableOption.name}</MenuItem>
                                  )}
                                  </Select>
                              </FormControl>
                            </div>    
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div class="form-group">
                                    <textarea class="form-control form-control-lg"  value={description} onChange={(e) => setDescription(e.target.value)} rows="2" spellcheck="false" placeholder="Short Description"></textarea>
                                </div>
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-10 col-12 accessory_file waterPumFile">
                                <div className="dropzone-card">
                                    <div className="dropzone">
                                        <div {...getRootProps({className: 'dropzone-file-btn'})}>
                                            <input {...getInputProps()} />
                                            <p>Upload image</p>
                                        </div>
                                    </div>
                                    <div className="dropzone-content" style={thumbsContainer}>
                                        {thumbs}
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                </div>
            </div>
                
            </DialogContent>
            
            <DialogActions>
            <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Submit</Button>
            </DialogActions>
          </form>
      </Dialog>
    );
}