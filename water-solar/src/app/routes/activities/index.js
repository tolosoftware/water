import React from 'react';
import {NavLink} from 'react-router-dom';
// import ContainerHeader from "components/ContainerHeader/index";
// import IntlMessages from "util/IntlMessages";
import {ProjectList} from './ProjectList';
import SendMoney from '../dashboard/routes/Crypto/SendMoney';
import Widget from "components/Widget/index";

const activities=({match,props}) => {
  
  return (
    <div className="app-wrapper">
      {/* <ContainerHeader match={match} title={<IntlMessages id="Activities" />} /> */}
      <div className="row">
        <div className="col-md-9">
          <ProjectList />
        </div>

        <div className="col-md-3 p-0">

          <div>
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
                
         
            <SendMoney />
         
            
        </div>
      </div>
    </div>
  )
};

export default activities;