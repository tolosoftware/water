import React from 'react';
import CardBox from 'components/CardBox';
import Widget from "components/Widget/index";
import './download.css';
import ListAltIcon from '@material-ui/icons/ListAlt';

import Module from './Module';
import Pump from './Pump';
import Controller from './Controller';
import Acceessories from './Acceessories';
import Structure from './Structure';
const Datasheet = () => {

  return(
  <>

  <div className="app-wrapper">
    <div  className="row custom-margin d-flex justify-content-center">

    
        <div className="col-md-2">
          <Widget styleName={`bg-primary text-white `} >
              <div className="d-flex flex-row justify-content-center">
                <ListAltIcon fontSize="large"/>
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">PV Module</h4>
              </div>
            </Widget>
       </div>

       <div className="col-md-2">
          <Widget styleName={`bg-primary text-white `} >
              <div className="d-flex flex-row justify-content-center">
                <ListAltIcon fontSize="large"/>
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">Water Pump</h4>
              </div>
            </Widget>
       </div>

       <div className="col-md-2">
          <Widget styleName={`bg-primary text-white `} >
              <div className="d-flex flex-row justify-content-center">
                <ListAltIcon fontSize="large"/>
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">Controller</h4>
              </div>
            </Widget>
       </div>

       <div className="col-md-2">
          <Widget styleName={`bg-primary text-white `} >
              <div className="d-flex flex-row justify-content-center">
                <ListAltIcon fontSize="large"/>
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">PV Structure</h4>
              </div>
            </Widget>
       </div>

       <div className="col-md-2">
          <Widget styleName={`bg-primary text-white `} >
              <div className="d-flex flex-row justify-content-center">
                <ListAltIcon fontSize="large"/>
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">Accessories</h4>
              </div>
            </Widget>
       </div>
       
        </div>

    {/* <div className="row">
      <Module/>
    </div> */}
    
    {/* <div className="row custom-row-card pl-3 pr-3">
    <CardBox >
       <Pump/>
    </CardBox>
    </div> */}

    {/* <div className="row custom-row-card pl-3 pr-3">
    <CardBox >
       <Controller/>
    </CardBox>
    </div> */}

    <div className="row custom-row-card pl-3 pr-3">
    <CardBox >
       <Acceessories/>
    </CardBox>
    </div>

    {/* <div className="row custom-row-card pl-3 pr-3">
    <CardBox >
       <Structure/>
    </CardBox>
    </div> */}

    

    </div>
   

</>

)};

export default Datasheet;