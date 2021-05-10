import React from 'react';
import YearlyProfitChart from "components/dashboard/eCommerce/YearlyProfitChart";


const UserExpiration = () =>{
  var expiration = JSON.parse(localStorage.getItem("UserData")).expiration;
  return (
    <YearlyProfitChart
      shadowColor={'rgba(0,188,212,0.8)'}
      centerText="20"
      textColor="#999999"
      height={250}
      chartType="customDoughnut"
      backgroundColor={['#F44336', '#00BCD4']}
      borderColor={['#F44336', '#00BCD4']}
      hoverBorderColor={['#F44336', '#00BCD4']}
      hoverBorderWidth={[8, 2]}
     
      rotation={250}/>
    )};

export default UserExpiration;