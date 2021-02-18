import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Redirect} from "react-router-dom";
import axios from 'axios';


import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn
} from 'actions/Auth';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'demo@example.com',
      password: 'demo#123',
      type:'user'
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser !== null) {
      this.props.history.push('/');
    }
  }

   state = {
    redirect: false
  }


   handlSubmit = e =>{
        e.preventDefault();
        const data ={
            email: this.userName,
            password: this.password, 
        }
     
        this.props.showAuthLoader();
        axios.post('http://localhost:8000/api/login', data)
        .then(
          res => {
   
            localStorage.setItem('token', res.data.token); 
            localStorage.setItem('UserData',JSON.stringify(res.data.user));
            if(res.data.user.system==1) {
              this.props.history.push('app/dashboard/crypto');
            }else {
              this.props.history.push('app/dashboard/intranet');
            }
             
          }
        ).catch(
            err =>{
                alert('login faild !')
            } 
        )
    };


  render() {
    const {
      email,
      password,
      type
   
    } = this.state;
    const {showMessage,loader,alertMessage}=this.props;
    
    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/app/dashboard/intranet'/>;
     }
    return (
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">

                <div className="app-logo-content align-items-center justify-content-center">
                    
                    <div class="positioning custom-style MuiAvatar-root MuiAvatar-circle bg-grey lighten-2 avatar-shadow size-90 mx-auto mb-4 MuiAvatar-colorDefault">
                          <IconButton color="primary" aria-label="upload picture" component="span" className="custom-icon">
                            S
                          </IconButton>
                    </div>

                     <div class="positioning MuiAvatar-root MuiAvatar-circle bg-grey lighten-2 avatar-shadow size-90 mx-auto mb-4 MuiAvatar-colorDefault">
                           <IconButton color="primary" aria-label="upload picture" component="span" className="custom-icon">
                            C
                          </IconButton>
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
                      As Admin
                   </Button>

                    <Link to="/signup">
                      <IntlMessages id="signIn.signUp"/>
                    </Link>
                  </div>

                  <div className="app-social-block my-1 my-sm-3">
                    <IntlMessages
                      id="signIn.connectWith"/>
                    <ul className="social-link">
                      <li>
                        <IconButton className="icon"
                                    onClick={() => {
                                      this.props.showAuthLoader();
                                      this.props.userFacebookSignIn();
                                    }}>
                          <i className="zmdi zmdi-facebook"/>
                        </IconButton>
                      </li>

                      <li>
                        <IconButton className="icon"
                                    onClick={() => {
                                      this.props.showAuthLoader();
                                      this.props.userGoogleSignIn();
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
        {
          loader &&
          <div className="loader-view">
            <CircularProgress/>
          </div>
        }
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer/>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGoogleSignIn,
  userGithubSignIn,
  userTwitterSignIn
})(SignIn);
