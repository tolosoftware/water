import React from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";

const activities = ({match}) => (
    <div className="app-wrapper">
   <ContainerHeader match={match} title={<IntlMessages id="Activities"/>}/>      
      <h1>Activity Page</h1>
  </div>
);

export default activities;