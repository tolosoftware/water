import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import IconButton from "@material-ui/core/IconButton";
import Spinner from "react-spinner-material";
import axios from "axios";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";
import "./download.css";

const Pump = () => {
  const [pump, setPump] = useState([]);
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    getPump();
  }, []);

  const getPump = async () => {
    setVisibility(true);
    var id = JSON.parse(localStorage.getItem("UserData")).id;
    axios
      .get("api/pump/" + id)
      .then((res) => {
        if (res.data.auth == "unauthenticated") {
          localStorage.removeItem("token");
          this.props.history.push("/signin");
          setVisibility(false);
        } else {
          setPump(res.data.pump_lists);
          setVisibility(false);
        }
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
          title="Pump Brand"
          columns={[
            { title: "Pruduct", field: "brand_name" },
            { title: "Model", field: "model" },
            { title: "Current", field: "ampeier" },
            { title: "Power (KW)", field: "power" },
            { title: "HP", field: "hp" },
            {
              title: "Download",
              render: (pump) => {
                return pump.data_sheet ? (
                  <a
                    href={
                      pump.data_sheet == 0
                        ? "#"
                        : `${axios.defaults.baseURL}brand/pumpbrand/pump_list/data_sheet/${pump.data_sheet}`
                    }
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
          data={pump}
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

export default Pump;
