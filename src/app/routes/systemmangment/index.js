import React from 'react';

import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import CardBox from 'components/CardBox/index';

import GeoLocation from "./GeoLocation"; 
import WaterPump from "./WaterPump";
import SolarPanel from "./SolarPanel";
import Accessories from "./Accessories";



const Systemmangment = ({match}) => (
    <div className="app-wrapper">
    <ContainerHeader match={match} title={<IntlMessages id="System Mangment" />} /> 
  
    <h3><b>Geo-Location Mangment</b></h3>
    <span>
      <GeoLocation/>
    </span>
    
    <h3><b>Water Pumps</b></h3>
    <span>
      <WaterPump/>
    </span>

     <h3><b>Solar Panels</b></h3>
    <span>
      <SolarPanel/>
    </span>

  
      <CardBox styleName="col-12" cardStyle="p-0" heading={<IntlMessages id="Accessories"/>}
                headerOutside>
        <Accessories/>
      </CardBox>

  
  </div>
);

export default Systemmangment;