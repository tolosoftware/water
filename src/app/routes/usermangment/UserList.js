import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

//modle imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

//form
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
//option
import {MenuItem,Select} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

//share
import FormControl from '@material-ui/core/FormControl';
//end share
//radio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

export const UserList=() => {
//start modle
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

    const DialogActions=withStyles((theme) => ({

   root: {
    margin: 0,
    padding: theme.spacing(1),
  },
    }))(MuiDialogActions);
    const [open,setOpen]=React.useState(false);
   
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
//end modle
//start form
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  }));  
  
  // radio
 const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // end radio


 const classes = useStyles();    


//option

//end optoion 

const handlSubmit = e =>{
        e.preventDefault();
        const data ={
            fullName: this.fullName,
            companyName: this.companyName,
            email: this.email,
            password: this.password,
            website: this.website,
            status: this.status,
            expiration: this.expiration,
            image: this.image,      
        }
        axios.post('http://localhost:8000/regester', data)
        .then(
            res => {
                console.log(res);
            }
        ).catch(
            err =>{
                console.log(err);
            }
        )
    };

    return (
        <div>

     <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add User
      </Button>

      {/* modale start */}
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
         User Registration form
        </DialogTitle>
        <DialogContent dividers>
             <form className={classes.root} noValidate autoComplete="off">
                <TextField id="name" label="Full Name" onChange={e => this.fullName = e.target.value}/>
                <TextField id="compay-name" label="Company Name"  onChange={e => this.companyName = e.target.value}/> 
                <TextField id="email" label="Email" type="email" />       
                <TextField id="password" label="Password" type="password" />
                <TextField id="website" label="Website" />
               <FormControl component="fieldset">
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup
                    className="d-flex flex-row"
                    aria-label="gender"
                    name="gender">
                    <FormControlLabel value="male1" control={<Radio color="primary"/>} label="Active"/>
                    <FormControlLabel value="female1" control={<Radio color="primary"/>} label="Inactive"/>
                  </RadioGroup>
                </FormControl>

              
               <FormControl component="fieldset">
                    <InputLabel htmlFor="age-simple">Expiration</InputLabel>
                    <Select
                  
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
               <TextField id="image" label="Image" type="file" />
             <button type="submit" class="btn btn-primary">Submit</button>
             </form>
         
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      {/* end mule */}

     
          <MaterialTable
                title="Positioning Actions Column Preview"
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Surname', field: 'surname' },
                    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                    {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                    },
                ]}
                data={[
                    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                ]}
                actions={[
                    {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                    },
                    rowData => ({
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                    disabled: rowData.birthYear < 2000
                    })
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
            />

</div>
      )
}