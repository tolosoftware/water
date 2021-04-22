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
import InputAdornment from '@material-ui/core/InputAdornment';

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
import * as type from 'yup';
import { checkValidation, runValidation } from './utils';
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
      value: 100,
      label: '100W',
    },
    // {
    //   value: 270,
    //   // label: '270W',
    // },
    {
      value: 600,
      label: '600W',
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
// const marksC = [
//     {
//       value: 0,
//       label: '0A',
//     },
//     {
//       value: 270,
//       label: '270A',
//     },
// ];

// validation code
const initialState = {
  formData: {
    brand: '',
    model: '',
    cableType: '',
    current: '',
    voltage: '',
    // description: '',
  },
  error: {},
  touched: {},
  isValid: false
};

const setState = 'SET_STATE';

function reducer(state, action) {
  switch(action.type) {
    case setState:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
const schema = type.object().shape({
  brand: type.string().required("Required"),
  model: type.string().required("Required"),
  cableType: type.number().required("Required"), 
  // description: type.string().required("Required"),
  current: type.number().required("Required"),
  voltage: type.number().required("Required"),
});
// end validation code
export default function DialogSolarP(props){
    // start code of dialog modal for Solar Panal 
    const [files, setFiles] = useState([]);
    const {openS,   setOpenS} = props;
    const {solarListObject, setSolarListObject} = props;
    
    // end code of dialog modal for Solar Panal 
  const solarBrands=props.solarBrands;
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [solarType, setSolarType] = useState("Mono");
  const [powerW, setPowerW] = useState(150);
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [cableType, setCableType] = useState("");
  // const [description, setDescription] = useState("");
  const [solarListID, setSolarListID] = useState('0'); 
  const [oldImage, setOldImage] = useState("");
  const [{
    formData,
    error,
    touched,
    isValid
  }, dispatch] = React.useReducer(reducer, initialState);
  const classes = useStyles();
  const handleCloseS = () => {
    emptyForm();
    handleAllField(false, false);
    setOpenS(false);
  };
  const emptyForm = () =>{
    setSolarListID('0');
    setSolarListObject([]);
    setFiles([]);
    setBrand('');
    setModel('');
    setSolarType("Mono");
    setPowerW(150);
    setVoltage('');
    setCurrent('');
    setCableType("");
    // setDescription("");
    setOldImage('');
    setFiles([]);
  }

  const handleChangeField = async ({ target: { name, value } }) => {
    if(name==='brand'){
      setBrand(value)
    }
    else if(name==='model'){
      setModel(value)
    }
    // else if(name==='description'){
    //   setDescription(value)
    // }
    
    else if(name==='cableType'){
      setCableType(value)
    }
    else if(name==='current'){
      setCurrent(value)
    }
    
    const schemaErrors = await runValidation(schema, {
      ...formData, [name]: value
    });
    dispatch({
      type: setState,
      payload: {
        error: schemaErrors,
        formData: { ...formData, [name]: value },
        touched: { ...touched, [name]: true },
        isValid: checkValidation(schemaErrors)
      }
    });
  };
 
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

useEffect(() => {
    setSolarListID(solarListObject.id);
    setBrand(solarListObject.solar_brand_id);
    setModel(solarListObject.model);
    setSolarType(solarListObject.type);
    setPowerW(Math.floor(solarListObject.power));
    setVoltage(solarListObject.voltage);
    setCurrent(solarListObject.current);
    setCableType(solarListObject.cable_type_id);
    // setDescription(solarListObject.discription);
    setOldImage(solarListObject.image);
    
},[solarListObject])
useEffect(() => {
  (solarListObject.id === undefined)? handleAllField(false): handleAllField(true);
},[openS])
const handleAllField = async(valid, touchedValid) =>{
  let f1 = 'brand', f2 = 'model', f3 = 'cableType', f5 = 'current', f6 = 'voltage'/*, f4 = 'description'*/;
  const schemaErrors = await runValidation(schema, {
    ...formData, [f1]: brand, [f2]: model, [f3]: cableType, [f5]: current, [f6]: voltage/*, [f4]: description*/
  });
  dispatch({
    type: setState,
    payload: {
      error: schemaErrors,
      formData: { ...formData, [f1]: brand, [f2]: model, [f3]: cableType, [f5]: current, [f6]: voltage/*, [f4]: description*/ },
      touched: { ...touched, [f1]: false, [f2]: false, [f3]: false, [f5]: false, [f6]: false/*, [f4]: false*/ },
      isValid: valid
    }
  });
}


  const handleSubmit = (e) => {
    e.preventDefault();
    let dataSolarList = {
      solarListID, brand, model, solarType, powerW, voltage, current, cableType/*, description*/
    }
    // console.log(dataSolarList);
    if(dataSolarList.solarListID===undefined){
      dataSolarList.solarListID = 0;
    }
    if(files.length!==0){
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
    dataSolarList['image'] = 'oldImage';
    axios.post('api/solarList', dataSolarList)
        .then(res => {
          setOpenS(false);
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
                                  <InputLabel id="demo-simple-select-outlined-label" error={(touched && touched.brand) && (error && error.brand) ? true : false}>Brand</InputLabel>
                                  <Select name='brand'
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={brand}
                                        onChange={(e) => handleChangeField(e)}
                                  label="Brand"
                                  >
                                  <MenuItem value="">
                                      <em>None</em>
                                  </MenuItem>
                                  {solarBrands.map(brand => 
                                  <MenuItem value={brand.id}>{brand.name}</MenuItem>
                                  )}
                                  </Select>
                                  <span className={(touched && touched.brand) && (error && error.brand) ? 'displayBlock errorText' : 'displayNone'}>*required</span>
                                </FormControl>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                                <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Model" name='model' value={model} onChange={(e) => handleChangeField(e)} variant="outlined" 
                                error={(touched && touched.model) && (error && error.model) ? true : false}
                                helperText={(touched && touched.model) && (error && error.model) ? '*required' : ''} />
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP group_radio insideFormPaddingWPS">
                              <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                  <input type="radio" class="btn-check" name={`radio${solarType}`} id="btnradio1Mono" autocomplete="off" checked={(solarType==="Mono" || solarType === undefined) ? true : false} value="Mono" onChange={event => setSolarType(event.target.value)}/>
                                  <label class="btn btn-outline-primary" for="btnradio1Mono">Mono</label>
                                  <input type="radio" class="btn-check" name={`radio${solarType}`} id="btnradio2Poly" autocomplete="off" checked={(solarType==="Poly")? true : false} value="Poly" onChange={event => setSolarType(event.target.value)}/>
                                  <label class="btn btn-outline-primary" for="btnradio2Poly">Poly</label>
                              </div>
                               
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormPadding1 inputAdornmentWrap">
                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                    Power
                                    </Typography>
                                    <Slider onChange={(event, value) => setPowerW(value)}
                                        defaultValue={(solarListID !== undefined) ? powerW : 270}
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider-small-steps"
                                        step={5}
                                        marks={marksW}
                                        min={100}
                                        max={600}
                                        valueLabelDisplay="auto"
                                    />
                            </div>
                            
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormPadding2 inputAdornmentWrap">
                                {/* <Typography id="discrete-slider-small-steps" gutterBottom>
                                  Voltage
                                </Typography>
                                <Slider onChange={(event, value) => setVoltage(value)}
                                    defaultValue={(solarListID !== undefined) ? voltage : 150}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={20}
                                    marks={marksV}
                                    min={0}
                                    max={270}
                                    valueLabelDisplay="auto"
                                /> */}
                                <FormControl fullWidth >  
                                  <TextField size="small" id="outlined-basic3" label="Voltage" variant="outlined"
                                  name="voltage"  
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end">V</InputAdornment>,
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={voltage} onChange={(e) => handleChangeField(e)}
                                  error={(touched && touched.voltage) && (error && error.voltage) ? true : false}
                                  helperText={(touched && touched.voltage) && (error && error.voltage) ? '*required & must be number' : ''}/>
                                </FormControl>
                            </div>
                            
                            <div className="col-xl-8 col-lg-8 col-md-8 col-12 insideFormBPCable">
                                {/* <Typography id="discrete-slider-small-steps" gutterBottom>
                                Current
                                </Typography>
                                <Slider onChange={(event, value) => setCurrent(value)}
                                    defaultValue={(solarListID !== undefined) ? current : 150}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={20}
                                    marks={marksC}
                                    min={0}
                                    max={270}
                                    valueLabelDisplay="auto"
                                /> */}
                                <FormControl fullWidth >  
                                  <TextField size="small" id="outlined-basic3" label="Current" variant="outlined"
                                  name="current"  
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end">A</InputAdornment>,
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={current} onChange={(e) => handleChangeField(e)}
                                  error={(touched && touched.current) && (error && error.current) ? true : false}
                                  helperText={(touched && touched.current) && (error && error.current) ? '*required & must be number' : ''}/>
                                </FormControl>
                                
                            </div>
                            
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBPCable">
                              <FormControl variant="outlined" size="small" className={classes.formControl}>
                                  <InputLabel id="demo-simple-select-outlined-label" error={(touched && touched.cableType) && (error && error.cableType) ? true : false}>Cable Type</InputLabel>
                                  <Select name='cableType'
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={cableType}
                                  onChange={(e) => handleChangeField(e)}
                                  label="Cable Type"
                                  >
                                  <MenuItem value="">
                                      <em>None</em>
                                  </MenuItem>
                                  {cableTypesSelect.map(cableOption => 
                                  <MenuItem value={cableOption.id}>{cableOption.name}</MenuItem>
                                  )}
                                  </Select>
                                  <span className={(touched && touched.cableType) && (error && error.cableType) ? 'displayBlock errorText' : 'displayNone'}>*required</span>
                              </FormControl>
                            </div>    
                            {/* <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div class="form-group">
                                    <textarea name="description" class={`form-control form-control-lg ${(touched && touched.description) && (error && error.description) ? 'error' : ''}`}  value={description} onChange={(e) => handleChangeField(e)} rows="2" spellcheck="false" placeholder="Short Description"></textarea>
                                    <span className={(touched && touched.description) && (error && error.description) ? 'displayBlock errorText' : 'displayNone'}>*required</span>
                                </div>
                            </div> */}
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
                                        <span><img src={`${axios.defaults.baseURL}brand/solar/solar_list/${oldImage}`} class="img-thumbnail rounded edit_img_width"  alt="Responsive"></img></span>
                                      </spam>): ''): ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                </div>
            </div>
                
            </DialogContent>
            
            <DialogActions>
            <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg " name={`isValid ${isValid}`} disabled={!isValid} >Submit</Button>
            </DialogActions>
          </form>
      </Dialog>
    );
}