import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";
import axios from "axios";
import IntlMessages from "util/IntlMessages";
import Spinner from "react-spinner-material";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const Structure = () => {
  const [visibility, setVisibility] = useState(false);
  const [structures, setStructures] = useState([]);
  useEffect(() => {
    getStructure();
  }, []);

  const getStructure = async () => {
    setVisibility(true);
    var id = JSON.parse(localStorage.getItem("UserData")).id;
    var system = JSON.parse(localStorage.getItem("UserData")).system;
    var data = [id, system];
    axios
      .post("api/getStructure", data)
      .then((res) => {
        if (res.data.auth == "unauthenticated") {
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        } else {
          setVisibility(false);
          setStructures(res.data.structures);
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
      <span className="row justify-content-center">
        <Spinner
          radius={60}
          color={"#3f51b5"}
          stroke={3}
          visible={visibility}
        />
      </span>
      <div className="table-responsive-material row">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <thead className="table-head-sm th-border-b">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Model</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {structures?.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.model}</td>
                  <td>
                    <div className="pointer text-primary">
                      {/* <IconButton size="small" aria-label="download"  color="secondary"  >
                      <GetAppIcon />
                    </IconButton> */}
                      {data.datasheet ? (
                        <a
                          href={
                            data.datasheet == 0
                              ? "#"
                              : `${axios.defaults.baseURL}structure/data_sheet/${data.datasheet}`
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
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <NotificationContainer />
    </>
  );
};

export default Structure;
