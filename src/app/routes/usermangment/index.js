import React from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import {UserList} from "./UserList";
import CardBox from 'components/CardBox/index';


const Usermangment = ({match}) => (
    <div className="app-wrapper">
   <ContainerHeader match={match} title={<IntlMessages id="User Managment"/>}/>  

    <div className="row">
        <CardBox styleName="col-12" cardStyle="p-0" headerOutside>   
          <UserList/>
        </CardBox>
        </div>
  </div>
);

export default Usermangment;
