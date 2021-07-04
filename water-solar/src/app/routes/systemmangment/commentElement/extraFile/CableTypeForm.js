import React from "react";
import Widget from "components/Widget/index";

import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import axios from "axios";
import { useForm } from "react-hook-form";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IntlMessages from "util/IntlMessages";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const CableTypeForm = (props) => {
  const { register, errors, handleSubmit } = useForm(); // initialize the hook
  const onSubmit = (data) => {
    axios
      .post("api/cabletype", data)
      .then((res) => {
        props.setAddvisibility(false);
        props.setCabletype(res.data);
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
  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-12 mb-2">
                <TextField
                  id="id"
                  type="hidden"
                  style={{ width: "0%" }}
                  name="cableTypeID"
                  defaultValue={
                    props?.cabletypeObj?.id ? props?.cabletypeObj?.id : ""
                  }
                  inputRef={register}
                />
                <TextField
                  id="outlined-basic"
                  label="Cable type"
                  variant="outlined"
                  placeholder="Cable type"
                  name="name"
                  size="small"
                  fullWidth
                  defaultValue={props?.cabletypeObj?.name}
                  error={errors.name && true}
                  helperText={errors.name && "*required"}
                  inputRef={register({ required: true })}
                />
              </div>
              <div className="col-md-12 mb-2">
                <TextField
                  id="outlined-basic-price"
                  size="small"
                  fullWidth
                  className="fullWidthInput"
                  label="Price"
                  name="price"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">$</InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={props?.cabletypeObj?.price}
                  inputRef={register({
                    required: true,
                    pattern: /^[+-]?([0-9]*[.])?[0-9]+$/,
                  })}
                  error={errors.price && true}
                  helperText={errors.price ? "*Please enter valid number." : ""}
                />
              </div>
            </div>

            <div className="col-md-3 col-sm-3 col-lg-3 col-xs-12 pl-0">
              <Button
                color="primary"
                variant="contained"
                size="medium"
                type="submit"
              >
                <AddCircleOutlineIcon />
              </Button>
            </div>
          </form>
        <NotificationContainer />
    </>
  );
};

export default CableTypeForm;
