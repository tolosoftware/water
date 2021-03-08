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
const marksVolDC = [
    {
      value: 0,
      label: '0V',
    },
    {
      value: 270,
      label: '270V',
    },
];
export default function DialogInvertor(props){
    // start code of dialog modal for Solar Panal 
    const [files, setFiles] = useState([]);
    const {openIn,   setOpenIn} = props;
    const {invertorListObject, setInvertorListObject} = props;
    
    // end code of dialog modal for Solar Panal 
  const invertorBrands=props.invertorBrands;
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [powerKW, setPowerKW] = useState(150);
  const [voltage, setVoltage] = useState(100);
  const [voltageDC, setVoltageDC] = useState([50, 150]);
  const [description, setDescription] = useState("");
  const [invertorListID, setInvertorListID] = useState(0); 
  const [oldImage, setOldImage] = useState("");
  const classes = useStyles();
  const handleCloseS = () => {
    emptyForm();
    setOpenIn(false);
  };
  const emptyForm = () =>{
    setInvertorListObject([]);
    setInvertorListID(0);
    setBrand('');
    setModel('');
    setPowerKW(150);
    setVoltage(150);
    setVoltageDC([50, 150]);
    setDescription("");
    setOldImage('');
    setFiles([]);
  }
// dropzone code
 
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


useEffect(() => {
  setEditFieldValuse();
},[props.invertorListObject])

const setEditFieldValuse = () => {
  if(invertorListObject.voltage_dc_min!==undefined){
    let min = Math.floor(invertorListObject.voltage_dc_min);
    let max = Math.floor(invertorListObject.voltage_dc_max)
    setVoltageDC([min, max]);
    // console.log("invertor dc: ", [min, max]);
  }
  setInvertorListID(invertorListObject.id);
  setBrand(invertorListObject.invertor_brand_id);
  setModel(invertorListObject.model);
  setPowerKW(Math.floor(invertorListObject.power));
  setVoltage(Math.floor(invertorListObject.voltage_ac));
  setDescription(invertorListObject.discription);
  setOldImage(invertorListObject.image);
} 

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataInvertor = {
      invertorListID, brand, model, powerKW, voltage, voltageDC, description
    }
    console.log(dataInvertor);
    if(files.length!==0){
      if(dataInvertor.invertorListID===undefined){
        dataInvertor.invertorListID = 0;
      }
        var image = '';
        let file = files[0];
        let reader = new FileReader();
        reader.onloadend = (file) => {
        image = reader.result;
        dataInvertor['image'] = image;
        axios.post('api/invertorList', dataInvertor)
            .then(res => {
            setOpenIn(false);
            emptyForm();
                NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
                id="notification.titleHere" />);
            }).catch(err =>{
            NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
                id="notification.titleHere"/>);
            }
            )
        }
        reader.readAsDataURL(file); 
  }else{
    dataInvertor['image'] = 'oldImage';
    axios.post('api/invertorList', dataInvertor)
        .then(res => {
          setOpenIn(false);
          emptyForm();
            NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
        }).catch(err =>{
          NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
          }
        )
  } 

  }
    return (
      <Dialog onClose={handleCloseS}  aria-labelledby="customized-dialog-title" open={openIn}>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleCloseS}>
              Add Invertor Device
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
                                  {invertorBrands.map(brand => 
                                  <MenuItem value={brand.id}>{brand.name}</MenuItem>
                                  )}
                                  </Select>
                                </FormControl>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                                <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Model" value={model} onChange={(e) => setModel(e.target.value)} variant="outlined" />
                            </div>
                             
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormPadding1 inverPower inputAdornmentWrap">
                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                    Power (KW)
                                    </Typography>
                                    <Slider onChange={(event, value) => setPowerKW(value)}
                                        defaultValue={(invertorListID !== undefined) ? powerKW : 150}
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider-small-steps"
                                        step={20}
                                        marks={marksW}
                                        min={0}
                                        max={270}
                                        valueLabelDisplay="auto"
                                    />
                            </div>
                            
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormPadding2 ivertor-ac inputAdornmentWrap">
                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                    Voltage (AC)
                                    </Typography>
                                    <Slider onChange={(event, value) => setVoltage(value)}
                                        defaultValue={(invertorListID !== undefined) ? voltage : 150}
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider-small-steps"
                                        step={20}
                                        marks={marksV}
                                        min={0}
                                        max={270}
                                        valueLabelDisplay="auto"
                                    />
                            </div>
                            
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormPadding3 ivertor-dc inputAdornmentWrap">
                                <Typography id="range-slider" gutterBottom>
                                        Voltage (DC)
                                </Typography>
                                <Slider name="voltageDC" onChange={(event, value) => setVoltageDC(value)}
                                    value={voltageDC}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={270}
                                    marks={marksVolDC}
                                />
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 descriptInvertor">
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
                                        {(files.length === 0 )? ((oldImage!=="" && oldImage!==undefined)? (<spam>
                                        <span className={`sp_right_padding`}>Cuurent Image </span>
                                        <span><img src={`http://localhost:8000/brand/invertor/invertor_list/${oldImage}`} class="img-thumbnail rounded acc_img_width"  alt="Responsive"></img></span>
                                      </spam>): ''): ''}
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