import React, { useEffect }  from 'react';
import Uom from './Uom';
import CableType from './CableType';
import Post from './Post';
import UserProfile from './UserProfile';
import CardBox from 'components/CardBox';
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";

// import PickGoogleMap from './PickGoogleMap';

const Setting = ({match}) => { 
  useEffect(() => {
    checkToken();
  }, []);
  const checkToken = async () => {
    var id = JSON.parse(localStorage.getItem("UserData")).id;
    axios
      .get("api/checkToken/" + id)
      .then((res) => {
        if (res.data == "unauthenticated") {
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        } 
      })
      .catch((err) => {
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };
  return (
      <div className="app-wrapper">
          {JSON.parse(localStorage.getItem('UserData')).system == 0 ?
            <div className="row custom-row-card">
                <CardBox >
                  <UserProfile/>
                </CardBox>
            </div>
            :''
          }

          {JSON.parse(localStorage.getItem('UserData')).system == 1 ? (
          <div className="row seeting-table-style">

              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <Uom  />
              </div>  
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <CableType />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <Post />
              </div>
              {/* <div className="col-xl-12 col-lg-6 col-md-6 col-12">
                <PickGoogleMap />
              </div> */}
              
          </div>
          ) : ''}
          <NotificationContainer />
    </div>
  );
};
export default Setting;
