import React,{ useState, useEffect } from 'react';
import YearlyProfitChart from "components/dashboard/eCommerce/YearlyProfitChart";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import './dashstyle.css';

const UserExpiration = () =>{
 
  useEffect(() => {
    getExpir();
  }, [false]);

  const [expir, setExpir] = useState([]);
  const [expiration, setExpiration]= useState(JSON.parse(localStorage.getItem("UserData")).id);
  const getExpir = () => {
    axios
      .get("api/expir/"+expiration)
      .then((res) => {
        setExpir(res.data);
        
      })
      .catch((err) => {});
  };

  
  return (
    <>
   
    <div>
      <YearlyProfitChart
        centerText={expir?.reminingDays ? `${expir?.reminingDays}` : '' }
        myData={[`${expir?.used}`, `${expir?.reminingDays}`]}
        textColor="#999999"
        height={195}
        chartType="customDoughnut"
        backgroundColor={['#FFF', '#28a745']}
        borderColor={['#28a745', '#28a745']}
        hoverBorderColor={['#28a745', '#28a745']}
        hoverBorderWidth={[1, 1]}
        rotation={360}
        />
        </div>
        <div className="mt-3">
          <div className="greenbox"></div>
          <strong>Remaining Days</strong>

          <div className="whitebox"></div>
          <strong>Used Days</strong>
        </div>
        <div className='white-space-90'></div>
        <Divider className="mt-3 mb-4"/>
        <div className='center'><strong>User Expiration Date:  {expir.endDate}</strong></div>
      </>
      
    )};

export default UserExpiration;