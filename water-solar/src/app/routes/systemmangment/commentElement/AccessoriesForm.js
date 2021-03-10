import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import {useDropzone} from "react-dropzone";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
// end of dialog modal for water pump
import axios from 'axios';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';

// end code for country selection 
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

export default function AccessoriesForm(props) {
  const [type, setType] = useState("");
  const handleChange1 = (event) => {
    setType(event.target.value);
    };
  
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [min_quantity, setMin_quantity] = useState(""); 
  const [max_quantity, setMax_quantity] = useState(""); 
  const [uom, setUom] = useState({});
  const [uomList, setUomList] = useState([]);
  const classes = useStyles();
  
// dropzone code
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      maxFiles:1,
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
  
// end dropzone code
  

const [accessoriestype,setAccessoriestype]= useState([]);
 useEffect(() => {
    getAccessoriestype();
    getUOM();
  },[])
  
 
  const accessoryObject = props.accessoryObject;
  const [accessoryID, setAccessoryID] = useState('0'); 
  const [oldImage, setOldImage] = useState("");
  const getUOM=async () => {
    axios.get('api/uom')
      .then(res => {  
         setUomList(res.data)
        }
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
          }
      )
  }; 
  useEffect(() => {
    setEditFieldValuse();
  },[props.accessoryObject])

  const setEditFieldValuse = () => {
    setAccessoryID(accessoryObject.id);
    setType(accessoryObject.accessories_type_id);
    setName(accessoryObject.name);
    setModel(accessoryObject.model);
    setMin_quantity(accessoryObject.min_quantity); 
    setMax_quantity(accessoryObject.max_quantity);
    console.log('uom_id before if', accessoryObject.uom_id);
    if(accessoryObject.uom_id !== undefined){
      console.log('uom_id inside if', accessoryObject.uom_id);
      getUomObj(accessoryObject.uom_id);
       
       
    } 
    setDescription(accessoryObject.discription);
    setOldImage(accessoryObject.image);
  } 

  const getUomObj = (id) => {
    axios.get('api/uom/'+id)
      .then(res => {  
         setUom(res.data)
        }
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
          }
      )
  }
 
  const getAccessoriestype=async () => {
    axios.get('api/accessoriestype')
      .then(res => {  
         setAccessoriestype(res.data)
        }
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
          }
      )
  };  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      accessoryID, type, name, model ,min_quantity, max_quantity, description
    }
    data['uom']=uom.id;
    data['uom_name']=uom.name;
    console.log("filese: ", data);
    if(files.length!==0){
      if(data.accessoryID===undefined){
        data.accessoryID = 0;
      }
      // console.log('inside if', data.accessoryID);
      var image = '';
      let file = files[0];
      let reader = new FileReader();
      reader.onloadend = (file) => {
        image = reader.result;
        data['image'] = image;
        axios.post('api/accessories', data)
          .then(res => {
                // console.log(res.data);
                  NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
                id="notification.titleHere" />);
              }
          ).catch(err =>{
                NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
                id="notification.titleHere"/>);
              }
          )
      }
      reader.readAsDataURL(file);
    }
    else{
      // console.log('inside else:', files.length);
      data['image'] = 'oldImage';
      axios.post('api/accessories', data)
          .then(res => {
            // console.log(res.data);
                NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
                id="notification.titleHere" />);
              }
          ).catch(err =>{
                NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
                id="notification.titleHere"/>);
              }
          )
    }
  }
  
  return (
    <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="row">
            
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 insideFormBP">
                        {/* <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Type" value={type} onChange={(e) => setType(e.target.value)} variant="outlined" /> */}
                        <FormControl variant="outlined" size="small" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label" size="small" >Type</InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={type}
                                onChange={handleChange1}
                                label="Type"
                                name="Type"
                              >
                              {accessoriestype.map((data, index) =>  
                                <MenuItem value={data.id}>{data.name}</MenuItem>
                              )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 insideFormBP">
                        <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 insideFormBP">
                        <TextField id="outlined-basic-mod" size="small" className="fullWidthInput" label="Model" value={model} onChange={(e) => setModel(e.target.value)} variant="outlined" />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 insideFormBP">
                        
                        <Autocomplete  
                          id="country-select-demo" value={uom}  onChange={(event, newValue) => setUom(newValue)}
                          style={{ width: 300 }}
                          options={uomList}
                          classes={{
                          option: classes.option,
                          }}
                          autoHighlight
                          getOptionLabel={(option) => option.acronym}
                          renderOption={(option) => (
                          <React.Fragment>
                              {option.acronym}
                          </React.Fragment>
                          )}
                          renderInput={(params) => (
                          <TextField size="small" 
                              {...params}
                              label="UoM"
                              variant="outlined"
                              placeholder="pick UoM!"
                              name="location"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password', // disable autocomplete and autofill
                              }}
                              />
                              )}
                            />  
                    </div>
                    
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 insideFormBP">
                        <TextField id="outlined-basic-min" size="small" type="number" className="fullWidthInput" label="MinQ" value={min_quantity} onChange={(e) => setMin_quantity(e.target.value)} variant="outlined" />
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 insideFormBP">
                        <TextField id="outlined-basic-max" size="small" type="number" className="fullWidthInput" label="MaxQ" value={max_quantity} onChange={(e) => setMax_quantity(e.target.value)} variant="outlined" />
                    </div>
                        
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                            <textarea className="form-control form-control-lg"  value={description} onChange={(e) => setDescription(e.target.value)} rows="2"  placeholder="Short Description"></textarea>
                        </div>
                    </div>
                    <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 accessory_file">
                        <div className="dropzone-card">
                            <div className="dropzone">
                                <div {...getRootProps({className: 'dropzone-file-btn'})}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop Accessory image <br/> Single file</p>
                                </div>
                            </div>
                            <div className="dropzone-content" style={thumbsContainer}>
                                {thumbs}
                                {(files.length === 0 )? ((oldImage!=="" && oldImage!==undefined)? (<spam>
                                  <span className={`sp_right_padding`}>Cuurent Image </span>
                                  <span><img src={`${axios.defaults.baseURL}accessories/${oldImage}`} class="img-thumbnail rounded acc_img_width"  alt="Responsive"></img></span>
                                </spam>): ''): ''}
                                
                                 
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 btnAccessory">
                     <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg accessBtn">Submit</Button>
                    </div>
                    </div>
            </form>
          </div>
          <NotificationContainer />   
      </div>
    
        
  );
}