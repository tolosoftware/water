import React, { useState, useEffect, useRef } from "react";
import TextField from '@material-ui/core/TextField';
import {useDropzone} from "react-dropzone";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
// import {UUID} from "uuid";
import  './CommentEleStyle.css';
// import {useDropzone} from "react-dropzone";
// end of dialog modal for water pump
 
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

// function component lifecycle hook
const useComponentWillMount = func => {
    const willMount = useRef(true);
    if (willMount.current) {
      func();
    }
    useComponentDidMount(() => {
      willMount.current = false;
    });
  };
  
  const useComponentDidMount = func => useEffect(func, []);
  
//   const useInputState = initial => {
//     const [state, setState] = useState(initial);
//     const setInputState = e => {
//       setState(e.target.value);
//     };
//     return [state, setInputState];
//   };
// end function lifecycle hook

export default function WaterPumpDeviceForm() {
    let val
    useComponentWillMount(() => {
        console.log("willMount");
        // val = UUID.v4();
    });
    useComponentDidMount(() => console.log("didMount"));
    
    console.log("rendering");
  const [brand, setBrand] = useState("");
  const handleChange1 = (event) => {
    setBrand(event.target.value);
  };
  const [cableType, setCableType] = useState("");
  const handleChangeCable = (event) => {
    setCableType(event.target.value);
  };
  const [name, setName] = useState("");
  const [powerKg, setPowerKg] = useState("");
  const [powerHp, setPowerHp] = useState("");
  const [outlet, setOutlet] = useState("");
  const [current, setCurrent] = useState("");
  const [diameter, setDiameter] = useState("");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
        brand, name, powerKg, description, ...files
    }
    console.log(brand);
    console.log(data);
    console.log(files);
    

  }
  
  return (
    <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                        <TextField size="small"
                            id="outlined-read-only-input"
                            label="ID"
                            defaultValue={val}
                            InputProps={{
                            readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                        <FormControl variant="outlined" size="small" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple" size="small" >Brand</InputLabel>
                            <Select size="small"
                                native
                                value={brand}
                                onChange={handleChange1}
                                label="Brand"
                                inputProps={{
                                name: 'Brand',
                                id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Brand 1</option>
                                <option value={20}>Brand 2</option>
                                <option value={30}>Brand 3</option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                        <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Name/Model" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP inputAdornmentWrap">
                        <TextField size="small"
                            label="Power to Kw" value={powerKg} onChange={(e) => setPowerKg(e.target.value)}
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="end">Kw</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                    </div>
                    
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP inputAdornmentWrap">
                        <TextField size="small"
                            label="Power to Hp" value={powerHp} onChange={(e) => setPowerHp(e.target.value)}
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="end">Hp</InputAdornment>,
                            }}
                            variant="outlined"
                        /> 
                    </div>
                    
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP inputAdornmentWrap">
                        <TextField size="small"
                            label="Outlet" value={outlet} onChange={(e) => setOutlet(e.target.value)}
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="end">inch</InputAdornment>,
                            }}
                            variant="outlined"
                        />  
                    </div>
                    
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP inputAdornmentWrap">
                        <TextField size="small"
                            label="Current" value={current} onChange={(e) => setCurrent(e.target.value)}
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="end">A</InputAdornment>,
                            }}
                            variant="outlined"
                        />  
                    </div>
                    
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP inputAdornmentWrap">
                        <TextField size="small"
                            label="Diameter" value={diameter} onChange={(e) => setDiameter(e.target.value)}
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="end">inch</InputAdornment>,
                            }}
                            variant="outlined"
                        />  
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                        <FormControl variant="outlined" size="small" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple" size="small" >Cable Type</InputLabel>
                            <Select size="small"
                                native
                                value={cableType}
                                onChange={handleChangeCable}
                                label="Cable Type"
                                inputProps={{
                                name: 'cableType',
                                id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Cable Type 1</option>
                                <option value={20}>Cable Type 2</option>
                                <option value={30}>Cable Type 3</option>
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
                                    <p>Drag 'n' drop Water Pump Device image</p>
                                </div>
                            </div>
                            <div className="dropzone-content" style={thumbsContainer}>
                                {thumbs}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-12">
                     <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg accessBtn">Submit</Button>
                    </div>
                    </div>
            </form>
        </div>
    </div>
        
  );
}