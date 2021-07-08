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

const Acceessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    getAcceessories();
  }, []);

  const getAcceessories = async () => {
    setVisibility(true);
    var id = JSON.parse(localStorage.getItem("UserData")).id;
    var system = JSON.parse(localStorage.getItem("UserData")).system;
    var data = [id, system];
    axios
      .post("api/accessoriesdownload", data)
      .then((res) => {
        if (res.data.auth == "unauthenticated") {
          setVisibility(false);
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        } else {
          setAccessories(res.data.accessories);
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
          title="Accessories Datasheet"
          columns={[
            { title: "Pruduct", field: "name" },
            { title: "Model", field: "model" },
            { title: "UOM Name", field: "uom_name" },
            {
              title: "Download",
              render: (accessories) => {
                return accessories.data_sheet ? (
                  <a
                    href={`${axios.defaults.baseURL}accessories/data_sheet/${accessories.data_sheet}`}
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
          data={accessories}
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

export default Acceessories;
