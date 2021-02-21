import React from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import VerticalTabs from './VerticalTabs';

const Newproject = ({match}) => (
    <div className="app-wrapper">
    <ContainerHeader match={match} title={<IntlMessages id="New Project" />} />   
 
     <VerticalTabs/>
  </div>
);

export default Newproject;