import React from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import EnhancedTable from "./EnhancedTable";
import CardBox from 'components/CardBox/index';


const Usermangment = ({match}) => (
    <div className="app-wrapper">
   <ContainerHeader match={match} title={<IntlMessages id="User Managment"/>}/>      
     <div className="row">
        <CardBox styleName="col-12" cardStyle="p-0" heading="User List"
                headerOutside>   
          <EnhancedTable/>
        </CardBox>
      </div>
  </div>
);

export default Usermangment;
