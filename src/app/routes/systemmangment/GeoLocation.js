import React ,{useState} from "react";
import {Table} from 'reactstrap';
import Widget from "components/Widget/index";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import './style.css';

const tableList = [
  {
    id: 1,
    name: 'Lucy Francis',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '17 days ago',
    action: 'Pay'
  },
  {
    id: 2,
    name: 'Dean Holmes',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '10 days ago',
    action: 'Pay'
  },
  {
    id: 3,
    name: 'Terry Bridges',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '6 days ago',
    action: 'Pay'
  },
  {
    id: 4,
    name: 'Alice Collins',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '2 hrs. ago',
    action: 'Pay'
  }
];

// for modal code
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 510,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #3f51b5',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  btnMarginTop: {
    marginTop:'20px',
  },
}));


const GeoLocation=() => {
const [show,setShow]=useState(true);
  const widget = {
   height: "300px",
  };

  const color = {
   color: "red",
  };

  const classes = useStyles();
  // form code 
  const [state, setState] = React.useState({
    country: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add Geo-Location Country with City <span onClick={handleClose}>X</span></h2>
      <p id="simple-modal-description">
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="country-native-simple">Country</InputLabel>
          <Select
            native
            value={state.country}
            onChange={handleChange}
            inputProps={{
              name: 'country',
              id: 'country-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={1}>Afghanistan</option>
            <option value={2}>Iran</option>
            <option value={3}>India</option>
          </Select>
        </FormControl> 
        <TextField id="standard-basic"  label="Standard" />
        <Button variant="contained" color="primary" >Primary</Button>
        </form>
      </p>
      <button type="button" className="simpleBtn" onClick={handleClose}>Open Modal</button>
      {/* <GeoLocation /> */}
    </div>
  );
  
  return (
    <div className="row">
    <div className="col-xl-5 col-lg-5 col-md-12 col-12 card-height">
        <Widget style={widget}>
       
      <div className="d-flex flex-row mb-3">
        <h4 className="mb-0"> Country</h4>
            <span className="text-primary ml-auto pointer d-none d-sm-inline-flex align-items-sm-center" onClick={handleOpen}>
         <i className="zmdi zmdi-plus-circle-o mr-1"/>New Location</span>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
          
      <div className="table-responsive-material">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <thead className="table-head-sm th-border-b">
          <tr>
            <th>Account Holder Name</th>
            <th>Last Transfer</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {tableList.map((data, index) => {
            return <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  {data.image === '' ? null :
                    <Avatar className="user-avatar size-30" src={data.image}/>}
                  <div className="user-detail">
                    <h5 className="user-name">{data.name}</h5>
                  </div>
                </div>
              </td>
              <td>{data.lastTransfer}</td>
              <td>
                <div className="pointer text-primary">
                  <span className="d-inline-block mr-1">
                    <i className="zmdi zmdi-mail-reply zmdi-hc-fw zmdi-hc-flip-horizontal"/>
                  </span>
                  <span className="d-inline-block">{data.action}</span>
                </div>
              </td>
            </tr>
          })}
          </tbody>
        </Table>
      </div>
      <span className="text-primary mt-2 pointer d-block d-sm-none">
        <i className="zmdi zmdi-plus-circle-o mr-1 jr-fs-lg d-inline-block align-middle"/>
              Add New Account</span>
        
      </Widget>
    </div>

    <div className="col-xl-7 col-lg-7 col-md-12 col-12">

          <Widget  style={widget}>
      <div className="d-flex flex-row mb-3">
        <h4 className="mb-0"> Country</h4>
        <span className="text-primary ml-auto pointer d-none d-sm-inline-flex align-items-sm-center">
                    <i className="zmdi zmdi-plus-circle-o mr-1"/>Add New Account</span>
      </div>
      <div className="table-responsive-material">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <thead className="table-head-sm th-border-b">
          <tr>
            <th>Account Holder Name</th>
            <th>Last Transfer</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {tableList.map((data, index) => {
            return <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  {data.image === '' ? null :
                    <Avatar className="user-avatar size-30" src={data.image}/>}
                  <div className="user-detail">
                    <h5 className="user-name">{data.name}</h5>
                  </div>
                </div>
              </td>
              <td>{data.lastTransfer}</td>
              <td>
                <div className="pointer text-primary">
                  <span className="d-inline-block mr-1">
                    <i className="zmdi zmdi-mail-reply zmdi-hc-fw zmdi-hc-flip-horizontal"/>
                  </span>
                  <span className="d-inline-block">{data.action}</span>
                </div>
              </td>
            </tr>
          })}
          </tbody>
        </Table>
      </div>
      <span className="text-primary mt-2 pointer d-block d-sm-none">
        <i className="zmdi zmdi-plus-circle-o mr-1 jr-fs-lg d-inline-block align-middle"/>
              Add New Account</span>
        
      </Widget>

      </div>

    </div>  
    

  );
};

export default GeoLocation;
