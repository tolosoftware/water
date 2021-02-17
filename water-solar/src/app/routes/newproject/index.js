import React from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";

const Newproject = ({match}) => (
    <div className="app-wrapper">
   <ContainerHeader match={match} title={<IntlMessages id="New Project"/>}/>      
      <h1>This is New Project</h1>
  </div>
);

export default Newproject;