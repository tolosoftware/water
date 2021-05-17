import React from "react";
import CardBox from 'components/CardBox';
import Widget from "components/Widget/index";
import WebIcon from '@material-ui/icons/Web';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import InfoIcon from '@material-ui/icons/Info';
import ListAltIcon from '@material-ui/icons/ListAlt';
import './dashstyle.css';
import Aboutawm from './Aboutawm';
import { NavLink, withRouter } from 'react-router-dom';
const Firstrow = () => {
  const [open,setOpen]=React.useState(false);  
  return (
    <>

        <div className="col-md-3">
          <NavLink className="prepend-icon linkstyle" to="/app/newproject" style={{textDecoration:'none'}}>
              <Widget styleName={`bg-primary text-white dashboard`}>
              <div className="d-flex flex-row justify-content-center">
                <WebIcon fontSize="large"/>
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">Start Sizing</h4>
              </div>
              </Widget>
            </NavLink>

         </div>

         <div className="col-md-3">
           <NavLink className="prepend-icon linkstyle" to="/app/activities" style={{textDecoration:'none'}}>
            <Widget styleName={`bg-secondary text-white dashboard`}>
              <div className="d-flex flex-row justify-content-center">
                <AccountBalanceIcon fontSize="large"/>
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">Planned Project</h4>
              </div>
              </Widget>
            </NavLink>
           
         </div>
      

         <div className="col-md-3">
            <Widget styleName={`bg-success text-white dashboard`}>
             <div className="d-flex flex-row justify-content-center">
               <ListAltIcon fontSize="large"/>
             </div>
             <div className="text-center">
               <h4 className="jr-font-weight-medium mb-3">Data Sheet</h4>
             </div>
             </Widget>
         </div>
      

         <div className="col-md-3" onClick={()=> setOpen(true)}>
            <Widget styleName={`bg-info text-white dashboard`}>
             <div className="d-flex flex-row justify-content-center">
               <InfoIcon fontSize="large"/>
             </div>
             <div className="text-center">
               <h4 className="jr-font-weight-medium mb-3">About AWM</h4>
             </div>
             </Widget>
         </div>

         <Aboutawm
          open={open}
          setOpen={setOpen}
         />
      
      
    </>    
    
  );
};

export default Firstrow;
