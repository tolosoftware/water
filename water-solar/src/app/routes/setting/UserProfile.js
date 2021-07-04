import React, { useEffect, useState } from "react";
// import { Table } from "reactstrap";
import axios from "axios";
// import GetAppIcon from "@material-ui/icons/GetApp";
import IntlMessages from "util/IntlMessages";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { useForm } from "react-hook-form";
// import Divider from "@material-ui/core/Divider";
import "./style.css";
import { useDropzone } from "react-dropzone";
import {NotificationContainer,NotificationManager} from 'react-notifications';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 0,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 170,
  height: 170,  
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const dropzone1 = {
  height: "80px",
  minWidth: "120px",
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: "#3548d9",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#3548d9",
  outline: "none",
  transition: "border .24s ease-in-out",
};
// end form dependency

const UserProfile = () => {
  //drop zone
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="previews" />
      </div>
    </div>
  ));

  const { register, handleSubmit } = useForm(); // initialize the hook
  const onSubmit = (data) => {
    var userimage = "";
    let file = files[0];
    if (files.length != 0) {
      let reader = new FileReader();
      reader.onloadend = (file) => {
        userimage = reader.result;
        data["userimage"] = userimage;
        axios
          .put(
            "api/user/" + JSON.parse(localStorage.getItem("UserData")).id,
            data
          )
          .then((res) => {
            NotificationManager.success(
              <IntlMessages id="notification.successMessage" />,
              <IntlMessages id="notification.titleHere" />
            );
          })
          .catch((err) => {
            NotificationManager.error(
              <IntlMessages id="notification.errorMessage" />,
              <IntlMessages id="notification.titleHere" />
            );
          });
      };
      reader.readAsDataURL(file);
    } else {
      axios
        .put(
          "api/user/" + JSON.parse(localStorage.getItem("UserData")).id,
          data
        )
        .then((res) => {
          NotificationManager.success(
            <IntlMessages id="notification.successMessage" />,
            <IntlMessages id="notification.titleHere" />
          );
          localStorage.setItem("UserData", JSON.stringify(res.data));
        })
        .catch((err) => {
          NotificationManager.error(
            <IntlMessages id="notification.errorMessage" />,
            <IntlMessages id="notification.titleHere" />
          );
        });
    }
  };

  const [ppassword, setPpassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [values, setValues] = React.useState({
    showPPassword: false,
    showNPassword: false,
    showCPassword: false,
  });
  const [cpconfirm, setCpconfirm] = useState(false);
  const [cppassword, setcPpassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const changePassword = () => {
    const data = {
      password: ppassword,
      npassword: npassword,
      userid: JSON.parse(localStorage.getItem("UserData")).id,
    };
    if (npassword == cpassword) {
      setCpconfirm(false);
      axios
        .put(
          "api/user/" + JSON.parse(localStorage.getItem("UserData")).id,
          data
        )
        .then((res) => {
          if (res.data == "oops") {
            setcPpassword(true);
            NotificationManager.error(
              <IntlMessages id="notification.errorMessage" />,
              <IntlMessages id="notification.titleHere" />
            );
          } else {
            setcPpassword(false);
            NotificationManager.success(
              <IntlMessages id="notification.successMessage" />,
              <IntlMessages id="notification.titleHere" />
            );
          }
        })
        .catch((err) => {
          NotificationManager.error(
            <IntlMessages id="notification.errorMessage" />,
            <IntlMessages id="notification.titleHere" />
          );
        });
    } else {
      setCpconfirm(true);
    }
  };
   
  return (
    <>
      <div className="row">
        <div className="col-md-7">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-12">
              <strong>Update User Information</strong>
              </div>
            
              <div className="col-md-4">
                <TextField
                  disabled={true}
                  id="outlined-basic"
                  label="Full Name"
                  variant="outlined"
                  placeholder="Full Name"
                  className="m-3"
                  name="name"
                  size="small"
                  fullWidth
                  defaultValue={
                    JSON.parse(localStorage.getItem("UserData")).name
                  }
                  inputRef={register}
                />

                <TextField
                  disabled={true}
                  id="outlined-basic"
                  label="username"
                  variant="outlined"
                  placeholder="Username"
                  className="m-3"
                  name="username"
                  size="small"
                  fullWidth
                  defaultValue={
                    JSON.parse(localStorage.getItem("UserData")).username
                  }
                  inputRef={register}
                />

                <TextField disabled={true}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  placeholder="Email"
                  className="m-3"
                  name="email"
                  size="small"
                  fullWidth
                  defaultValue={
                    JSON.parse(localStorage.getItem("UserData")).email
                  }
                  inputRef={register}
                />

                <TextField disabled={true}
                  id="outlined-basic"
                  label="Belong to"
                  variant="outlined"
                  placeholder="Belong To"
                  className="m-3"
                  name="belongto"
                  size="small"
                  fullWidth
                  defaultValue={
                    JSON.parse(localStorage.getItem("UserData")).belongto
                  }
                  inputRef={register}
                />
                
              </div>
              <div className="col-md-4">
                <TextField
                  disabled={true}
                  id="outlined-basic"
                  label="Status"
                  variant="outlined"
                  placeholder="Status"
                  className="m-3"
                  name="status"
                  size="small"
                  fullWidth
                  defaultValue={
                    JSON.parse(localStorage.getItem("UserData")).status
                  }
                  inputRef={register}
                />
                <TextField disabled={true}
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  placeholder="Phone"
                  className="m-3"
                  name="phone"
                  size="small"
                  fullWidth
                  defaultValue={
                    JSON.parse(localStorage.getItem("UserData")).phone
                  }
                  inputRef={register}
                />
                <TextField
                  disabled={true}
                  id="outlined-basic"
                  label="Website"
                  variant="outlined"
                  placeholder="Website"
                  className="m-3"
                  name="website"
                  size="small"
                  fullWidth
                  defaultValue={
                    JSON.parse(localStorage.getItem("UserData")).website
                  }
                  inputRef={register}
                />

                
                
              </div>

              <div className="col-md-4 mt-3">
                <section className="container">
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    style={dropzone1}
                  >
                    <input {...getInputProps()} />
                    <p>Uplod Logo</p>
                  </div>
                  <aside style={thumbsContainer}>
                    {thumbs}
                    {files.length === 0 ? (
                      JSON.parse(localStorage.getItem("UserData")).userimage !==
                        "" &&
                      JSON.parse(localStorage.getItem("UserData")).userimage !==
                        undefined ? (
                        <spam>
                          <span className={`sp_right_padding`}>
                            Cuurent Image{" "}
                          </span>
                          <br></br>
                          <span>
                            <img
                              src={`${axios.defaults.baseURL}user/img/${
                                JSON.parse(localStorage.getItem("UserData"))
                                  .userimage
                              }`}
                              class="img-thumbnail rounded edit_img_width"
                              alt="Responsive"
                            ></img>
                          </span>
                        </spam>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </aside>
                </section>
              </div>
              <div className="col-md-12">
                <Button
                  disabled={files[0]?false:true}
                  color="primary"
                  variant="contained"
                  size="medium"
                  type="submit"
                  className="mt-4 ml-3"
                >
                  Update User Information
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="vartical-Devider ml-4 mr-4"></div>

        <div className="col-md-4 mr-3">
          <strong>Change User Password</strong>
          <TextField
            id="outlined-basic"
            label="Previous Password"
            variant="outlined"
            placeholder="Previous Password"
            className="m-3"
            name="ppassword"
            size="small"
            fullWidth
            type={values.showPPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: <InputAdornment position="end">
               <IconButton
                  aria-label="toggle password visibility"
                  onClick={e=>setValues({ ...values, showPPassword: !values.showPPassword })}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setPpassword(event.target.value)}
          />
          {cppassword === true ? (
            <strong style={{ color: "red" }} className="ml-3">
              Previous Password is not valid !
            </strong>
          ) : (
            ""
          )}

          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            placeholder="New Password"
            className="m-3"
            name="npassword"
            type={values.showNPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: <InputAdornment position="end">
               <IconButton
                  aria-label="toggle password visibility"
                  onClick={e=>setValues({ ...values, showNPassword: !values.showNPassword })}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showNPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>,
            }}
            size="small"
            fullWidth
            onChange={(event) => setNpassword(event.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            placeholder="Confirm Password"
            className="m-3"
            name="cpassword"
            type={values.showCPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: <InputAdornment position="end">
               <IconButton
                  aria-label="toggle password visibility"
                  onClick={e=>setValues({ ...values, showCPassword: !values.showCPassword })}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showCPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>,
            }}
            size="small"
            fullWidth
            onChange={(event) => setCpassword(event.target.value)}
          />
          {cpconfirm === true ? (
            <strong style={{ color: "red" }} className="ml-3">
              Confirm Password is not valid !
            </strong>
          ) : (
            ""
          )}

          <br></br>
          <Button
            disabled={(ppassword && npassword && cpassword)?false:true}
            color="primary"
            className="ml-3"
            variant="contained"
            size="medium"
            onClick={() => changePassword()}
          >
            Change Your Password
          </Button>
        </div>
        <NotificationContainer />
      </div>
    </>
  );
};

export default UserProfile;
