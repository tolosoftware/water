import React, {useEffect, useState} from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions} from '@material-ui/core';
import {Input,TextField,InputLabel,Select,MenuItem} from '@material-ui/core';
import {FormControl,FormLabel,RadioGroup,FormControlLabel,Radio} from '@material-ui/core';
import {Button} from '@material-ui/core';

//drop zoon
import {useDropzone} from 'react-dropzone'



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

export default function UserForm(props) {

  const {openPopup,setOpenPopup}=props;
  const handleClose = () => {
    setOpenPopup(false);
  };

//drop zone
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
        <img
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

  
  return (
    <Dialog open={openPopup} maxWidth="lg" onClose={handleClose}>
      <DialogTitle  >
        this is title
      </DialogTitle>
      <DialogContent dividers>
        <form  noValidate autoComplete="off"> 
         <div className="row mb-5">
                <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
                  <TextField id="name" className="form-control" label="Full Name" label="Full Name" variant="outlined" />
              </div>


               <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
                  <TextField id="compay-name" className="form-control" label="Company Name" variant="outlined" /> 
                </div>  

              
               <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
                 <TextField id="email" className="form-control" label="Email" type="email" variant="outlined" />   
                </div>
              </div>
              
              <div className="row mb-5">
                
                <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
                  <TextField id="password" className="form-control" label="Password" type="password" variant="outlined"/>
                </div>
                 <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
                   <TextField id="website" className="form-control" label="Website" variant="outlined"/>
                </div>

                <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
                   
                <FormControl component="fieldset" variant="outlined" className="form-control">
                    <FormLabel component="legend">Status</FormLabel>
                    <RadioGroup
                      className="d-flex flex-row"
                      aria-label="gender"
                      name="gender">
                      <FormControlLabel value="male1" control={<Radio color="primary"/>} label="Active"/>
                      <FormControlLabel value="female1" control={<Radio color="primary"/>} label="Inactive"/>
                    </RadioGroup>
                  </FormControl> 
                </div>
              </div>

              <div className="row mb-5">
                
                <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
                   <FormControl component="fieldset" className="form-control"  variant="outlined">
                    <InputLabel htmlFor="age-simple"  variant="outlined">Expiration</InputLabel>
                    <Select
                     variant="outlined"
                    input={<Input id="ageSimple1"/>}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={3}>3 Month</MenuItem>
                    <MenuItem value={6}>6 Month</MenuItem>
                    <MenuItem value={12}>12 Month</MenuItem>
                </Select>
                </FormControl>
                </div> 

               <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside style={thumbsContainer}>
                  {thumbs}
                </aside>
              </section>
           </div>   
        </form>  

         <DialogActions dividers>
          <Button  onClick={handleClose} color="primary" variant="contained">
            Register User
          </Button>
        </DialogActions>
        
      </DialogContent>
    </Dialog>
  )
}


