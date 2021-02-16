import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import {useDropzone} from "react-dropzone";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

export default function WaterPumpDeviceForm() {
  const [brand, setBrand] = useState("");
  const handleChange1 = (event) => {
    setBrand(event.target.value);
  };
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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
        brand, name, model, description, price, ...files
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
                    <div className="col-xl-3 col-lg-3 col-md-3 col-12 insideFormBP">
                        {/* <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Type" value={type} onChange={(e) => setType(e.target.value)} variant="outlined" /> */}
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
                    <div className="col-xl-3 col-lg-3 col-md-3 col-12 insideFormBP">
                        <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-12 insideFormBP">
                        <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Model" value={model} onChange={(e) => setModel(e.target.value)} variant="outlined" />
                    </div>
                    
                    <div className="col-xl-3 col-lg-3 col-md-3 col-12 ">
                        {/* <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} variant="outlined" /> */}
                    </div>
                    
                    <div className="col-xl-3 col-lg-3 col-md-3 col-12">
                        <TextField id="outlined-basic" size="small" type="number" className="fullWidthInput" label="Price" value={price} onChange={(e) => setPrice(e.target.value)} variant="outlined" />
                    </div>
                        
                    <div className="col-xl-9 col-lg-9 col-md-9 col-12">
                        <div class="form-group">
                            <textarea class="form-control form-control-lg"  value={description} onChange={(e) => setDescription(e.target.value)} rows="2" spellcheck="false" placeholder="Short Description"></textarea>
                        </div>
                    </div>
                    <div className="col-xl-10 col-lg-10 col-md-10 col-12 accessory_file">
                        <div className="dropzone-card">
                            <div className="dropzone">
                                <div {...getRootProps({className: 'dropzone-file-btn'})}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop Accessory images</p>
                                </div>
                            </div>
                            <div className="dropzone-content" style={thumbsContainer}>
                                {thumbs}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-12">
                     <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg accessBtn">primary</Button>
                    </div>
                    </div>
            </form>
        </div>
    </div>
        
  );
}