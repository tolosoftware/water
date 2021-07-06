import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import IconButton from "@material-ui/core/IconButton";
import Spinner from "react-spinner-material";
import axios from "axios";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";
import "./download.css";

const Controller = () => {
  const [controller, setController] = useState([]);
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    getController();
  }, []);

  const getController = async () => {
    setVisibility(true);
    var id = JSON.parse(localStorage.getItem("UserData")).id;
    axios
      .get("api/controller/" + id)
      .then((res) => {
        if (res.data.auth == "unauthenticated") {
          setVisibility(false);
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        } else {
          setController(res.data.inveter_lists);
        }
        setVisibility(false);
      })
      .catch((err) => {
        setVisibility(false);
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };

  return (
    <>
      {visibility ? (
        <span className="row justify-content-center">
          <Spinner
            radius={60}
            color={"#3f51b5"}
            stroke={3}
            visible={visibility}
          />
        </span>
      ) : (
        <MaterialTable
          title="Controller"
          columns={[
            { title: "Pruduct", field: "brand_name" },
            { title: "Model", field: "model" },
            { title: "Power", field: "power" },
            { title: "Voltage (V)", field: "voltage" },
            { title: "Current (A)", field: "current" },
            {
              title: "Download",
              render: (controller) => {
                return controller.data_sheet ? (
                  <a
                    href={`${axios.defaults.baseURL}brand/invertor/invertor_list/data_sheet/${controller.data_sheet}`}
                    download
                  >
                    <IconButton
                      size="small"
                      aria-label="download"
                      color="secondary"
                    >
                      <GetAppIcon />
                    </IconButton>
                  </a>
                ) : (
                  <IconButton
                    size="small"
                    aria-label="download"
                    color="secondary"
                    disabled={true}
                  >
                    <GetAppIcon />
                  </IconButton>
                );
              },
            },
          ]}
          data={controller}
          options={{
            loadingType: "linear",
          }}
          localization={{
            body: {
              emptyDataSourceMessage: (
                <p color="primary">
                  <strong>No Record Found</strong>
                </p>
              ),
            },
          }}
        />
      )}
      <NotificationContainer />
    </>
  );
};

export default Controller;
