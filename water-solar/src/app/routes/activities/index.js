import React from 'react';
import {NavLink} from 'react-router-dom';
// import ContainerHeader from "components/ContainerHeader/index";
// import IntlMessages from "util/IntlMessages";
import {ProjectList} from './ProjectList';
import SendMoney from '../dashboard/routes/Home/SendMoney';
import Widget from "components/Widget/index";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const activities=({match,props}) => {
  
  return (
    <div className="app-wrapper">
      {/* <ContainerHeader match={match} title={<IntlMessages id="Activities" />} /> */}
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6 col-12 mobile-width">
        <NavLink  to="/app/newproject">
        <Button color="primary" className='mb-4'>
          <AddCircleOutlineIcon className="mr-2" />
          Add New Project
        </Button>
        </NavLink>
          {/* <NavLink  to="/app/newproject">
            <Widget styleName={`bg-gradient-primary darken-4 text-white mb-2 mt-2`} >
              <div className="d-flex flex-row justify-content-center mb-2">
                <i className={`zmdi zmdi-plus-circle-o zmdi-hc-2x`} />
              </div>
              <div className="text-center">
                <h3 className="jr-font-weight-medium mb-3">Add New Project</h3>
              </div>
            </Widget>
          </NavLink> */}
        </div>
        <div className="col-xl-9 col-lg-12 col-md-12 col-12">
          <ProjectList />
        </div>

        <div className="col-xl-3 col-lg-12 col-md-12 col-12">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-4 col-md-6 col-12 desktop-width">
              <NavLink  to="/app/newproject">
                <Widget styleName={`bg-gradient-primary darken-4 text-white mb-2`} >
                  <div className="d-flex flex-row justify-content-center mb-2">
                    <i className={`zmdi zmdi-plus-circle-o zmdi-hc-2x`} />
                  </div>
                  <div className="text-center">
                    <h3 className="jr-font-weight-medium mb-3">Add New Project</h3>
                  </div>
                </Widget>
              </NavLink>
            </div>
            <div className='devider-sect'></div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <SendMoney />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default activities;