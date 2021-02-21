import React, {useEffect, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

// form dependency
import {Input,TextField,InputLabel,Select,MenuItem} from '@material-ui/core';
import {FormControl,FormLabel,RadioGroup,FormControlLabel,Radio} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import  './stayle.css';
import axios from 'axios';
import {useForm} from 'react-hook-form';
//drop zoon
import {useDropzone} from 'react-dropzone'







//drop down
const useStyles = makeStyles((theme) => ({ 
}));



//end drop down

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 0
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 190,
  height: 190,
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

const dropzone1 = {
  
    height: '100px',
    minWidth: '210px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#3548d9',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#3548d9',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};
// end form dependency

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

export default function CustomizedDialogs(props) {
    const {open,setOpen} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    };
   //drop down
  const classes = useStyles();
   const [state, setState] = React.useState({
    expiration: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  //end drop down

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

  const {register,handleSubmit,errors}=useForm(); // initialize the hook
  
  const onSubmit = (data) => {
  
    var userimage = '';
    let file = files[0];
    let reader = new FileReader();
     reader.onloadend = (file) => {
      userimage = reader.result;
      data['userimage'] = userimage;
      axios.post('http://localhost:8000/api/user', data)
        .then(
            res => {
                console.log(res);
            }
        ).catch(
            err =>{
                console.log(err);
            }
           
        )
    }
    reader.readAsDataURL(file); 
  };


  return (
    <div className={classes.modlewidth}>
    
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md" fullWidth="md">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          User Registration Form
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>      
         <DialogContent dividers>

          <div className="row"> 
             <div className="col-xl-8 col-gl-8 col-md-8 col-sm-12 col-12">
            
        

             <div className="row mb-5">
                <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                  <TextField id="name" className="form-control" name="name" label="Full Name" size="small" variant="outlined" inputRef={register}/>
              </div>

        
               <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                  <TextField id="companyname" name="companyname" className="form-control"  size="small" label="Company Name" variant="outlined" inputRef={register} /> 
                </div>  

              
            
              </div>


             <div className="row mb-5">
                <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                 <TextField id="email" className="form-control" label="Email" name="email"  size="small" type="email" variant="outlined" inputRef={register}/>   
                </div>
                   <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                  <TextField name="password" className="form-control" label="Password"  size="small" type="password" variant="outlined" inputRef={register}/>
                </div>
              </div>
              
            
           
              
              <div className="row mb-5">
                
             
                 <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                   <TextField name="website" className="form-control" label="Website"  size="small" variant="outlined" inputRef={register}/>
                </div>

                   <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                   <TextField name="phone" className="form-control" label="Phone"  size="small" variant="outlined" inputRef={register}/>
                </div>    

              
              </div>

              <div className="row">
                <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
               
                    <FormControl variant="outlined" className="form-control" size="small">
                    <InputLabel htmlFor="outlined-age-native-simple">Expiration</InputLabel>
                    <Select
                      native
                      inputRef={register}
                      value={state.age}
                      onChange={handleChange}
                      label="expiration"

                      inputProps={{
                        name: 'expiration',
                        id: 'outlined-expiration-native-simple',
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={3}>3 Month</option>
                      <option value={6}>6 Month</option>
                      <option value={12}>12 Month</option>
                    </Select>
                  </FormControl>
                  </div> 

                <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                   
                   <FormControl component="fieldset" variant="outlined" className="form-control"  size="small">
                    {/* <FormLabel component="legend" size="small">Status</FormLabel> */}
                  <RadioGroup
                    size="small"
                      className="d-flex flex-row"
                      aria-label="status"
                      name="status">
                      <FormControlLabel value="male"  inputRef={register} control={<Radio color="primary"/>} label="Active"/>
                      <FormControlLabel value="female" inputRef={register} control={<Radio color="primary"/>} label="Inactive"/>
                    </RadioGroup>
                 </FormControl>               
                </div>    

              </div> 
            </div>

            
            <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
            
             <section className="container">
                <div {...getRootProps({className: 'dropzone'})} style={dropzone1}>
                  <input {...getInputProps()} />
                  <p>Uplod Logo</p>
                </div>
               <aside style={thumbsContainer}>
                  {thumbs}
              </aside>
              </section>
              </div>

            </div>                 

                 
     
        </DialogContent>
        <DialogActions>
          <Button  type="submit" color="primary" variant="contained" className="pull-right">
            Register User
          </Button>
            </DialogActions>
           </form>          
      </Dialog>
    </div>
  );
}
