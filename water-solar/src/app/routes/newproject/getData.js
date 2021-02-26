import React,{useEffect,useState} from 'react';
import axios from 'axios';

export default function getData() {
    const [location,setLocation]=useState([]);
    const [solar,setSolar]=useState([]);
    const [pump,setPump]=useState([]);
    const [accessories,setAccessories]=useState([]);
    const [uom,setUom]=useState([]);
    
    useEffect(() => {
        getLocation();
        getSolarbrand();
        getWaterpumpbrand();
        getAccessories();
        getUom();
  },[])
  
  const getLocation=async () => {
    axios.get('api/cabletype')
      .then(res => {  
         setLocation(res.data)
        }
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
          }
      )
    };
  
    const getSolarbrand=async () => {
    axios.get('api/solarbrand')
      .then(res => {  
         setSolar(res.data)
        }
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
          }
      )
    };
  
     const getWaterpumpbrand=async () => {
    axios.get('api/pumpbrand')
      .then(res => {  
         setPump(res.data)
        }
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
          }
      )
    };
  
      const getAccessories=async () => {
    axios.get('api/cabletype')
      .then(res => {  
         setAccessories(res.data)
        }
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
          }
      )
    };
  
    const getUom=async () => {
    axios.get('api/uom')
      .then(res => {  
         setUom(res.data)
        }
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
          }
      )
  };
    return (
        <div>
            
        </div>
    )
}
