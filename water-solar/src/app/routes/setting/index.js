import React from 'react';
import Uom from './Uom';
import CableType from './CableType';
import Post from './Post';
import UserProfile from './UserProfile';
import CardBox from 'components/CardBox';
const Setting = ({match}) => (
    <div className="app-wrapper">

        <div className="row custom-row-card">
            <CardBox >
              <UserProfile/>
            </CardBox>
        </div>


        <div className="row seeting-table-style">

            <div className="col-md-4">
              <Uom  />
            </div>  
             <div className="col-md-4">
              <CableType />
            </div>
            <div className="col-md-4">
              <Post />
            </div>
        </div>
  </div>
);

export default Setting;
