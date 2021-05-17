import React,{ useState, useEffect } from 'react';
import YearlyProfitChart from "components/dashboard/eCommerce/YearlyProfitChart";
import Divider from "@material-ui/core/Divider";
import { date } from 'yup/lib/locale';

import './dashstyle.css';
const UserExpiration = () =>{
 
  // var expiration;
  // var expiration = JSON.parse(localStorage.getItem("UserData")).expiration;
  const [expiration, setExpiration]= useState(JSON.parse(localStorage.getItem("UserData")).expiration);
  const [startdate, setStartdate]= useState(JSON.parse(localStorage.getItem("UserData")).created_at);

  // var groupedData = _.groupBy(startdate, function(d){
  //   return d.startedAt.toISOString().substring(0, 10);
  // });
  // console.log('test'+ groupedData);

  
  return (
    <>
    <div>
      <YearlyProfitChart
        centerText="20"
        myData={['40', '50']}
        textColor="#999999"
        height={220}
        chartType="customDoughnut"
        backgroundColor={['#FFF', '#28a745']}
        borderColor={['#28a745', '#28a745']}
        hoverBorderColor={['#28a745', '#28a745']}
        hoverBorderWidth={[1, 1]}
        rotation={350}
        />
        </div>
        <div className="mt-3">
          <div className="greenbox"></div>
          <strong>Remining Days</strong>

          <div className="whitebox"></div>
          <strong>Used Days</strong>
        </div>

        <Divider className="mt-3 mb-4"/>
        <strong style={{marginLeft: '110px'}}>User Expiration Date: 2021/3/4</strong>
      </>
      
    )};

export default UserExpiration;