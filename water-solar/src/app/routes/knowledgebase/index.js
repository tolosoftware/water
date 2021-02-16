import React from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";

const Knowledgebase = ({match}) => (
    <div className="app-wrapper">
   <ContainerHeader match={match} title={<IntlMessages id="knowledge Base"/>}/>      
      <h1>This is Knowledgebase</h1>
  </div>
);

export default Knowledgebase;