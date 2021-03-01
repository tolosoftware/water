import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import './loginstylecustom.css';
//backdrop
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/styles";



const styles = theme => ({
   backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

class SignIn extends React.Component {
  
  constructor() {
    super();
    this.state = {
      open: false
    }
  }


   handlSubmit = e =>{
        e.preventDefault();
        const data ={
            email: this.userName,
            password: this.password, 
        }
        
        this.setState({open: true})
        axios.post('api/login', data)
          .then(res => {
             this.setState({open: false})
             NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
            console.log('ok work dkk')
           setTimeout(
              () => console.log('ok work'), 
              3000
            );
            localStorage.setItem('token', res.data.token); 
            localStorage.setItem('UserData',JSON.stringify(res.data.user));
         
            if(res.data.user.system===1) {
              this.props.history.push('app/dashboard/crypto');
            }else {
              this.props.history.push('app/dashboard/intranet');
            }
             
          }
        ).catch( err =>{
           this.setState({open: false})
            NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
            } 
        )
    };


  render() {
   const { classes } = this.props;
    return (
      <>
       <Backdrop className={classes.backdrop} open={this.state.open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">

                <div className="app-logo-content align-items-center justify-content-center">
                    
                   
                
                <div className="slick-slide-item">
                  <div className="customelogobrand">
                      <div>
                      <img src="/images/4.jpg" className="img-thumbnail rounded mx-auto d-block" alt="Responsive" />
                      </div>
                  </div>
              </div>
              
                <div className="slick-slide-item">
                  <div className="customelogobrand">
                      <div>
                      <img src="/images/4.jpg" className="img-thumbnail rounded mx-auto d-block" alt="Responsive" />
                      </div>
                  </div>
                </div>
                  

                  
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h1>Login To System</h1>
            </div>

            <div className="app-login-form">
              <form onSubmit={this.handlSubmit}>
                <fieldset>
                  <TextField
                    label="Email"
                    fullWidth
                    onChange={e => this.userName = e.target.value}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />
                  <TextField
                    type="password"
                    label={<IntlMessages id="appModule.password"/>}
                    fullWidth
                     onChange={e => this.password = e.target.value}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button variant="contained" color="primary" type="submit">
                      Login to system
                   </Button>

                
                  </div>

                  <div className="app-social-block my-1 my-sm-3">
                    <IntlMessages
                      id="signIn.connectWith"/>
                    <ul className="social-link">
                      <li>
                        <IconButton className="icon"
                                    onClick={() => {
                                   
                                    }}>
                          <i className="zmdi zmdi-facebook"/>
                        </IconButton>
                      </li>

                      <li>
                        <IconButton className="icon"
                                    onClick={() => {
                                    
                                    }}>
                          <i className="zmdi zmdi-google-plus"/>
                        </IconButton>
                      </li>

                      
                    </ul>
                  </div>

                </fieldset>
              </form>
            </div>
          </div>

        </div>
     
        </div>
          <NotificationContainer/>
      </>  
    );
  }
}



export default withStyles(styles)(SignIn);
