import React, {useEffect, useState} from 'react';
import CardBox from 'components/CardBox';
import Widget from "components/Widget/index";
import './download.css';
// import ListAltIcon from '@material-ui/icons/ListAlt';
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import FlashAutoIcon from '@material-ui/icons/FlashAuto';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';

import Module from './Module';
import Pump from './Pump';
import Controller from './Controller';
import Acceessories from './Acceessories';
import Structure from './Structure';
const Datasheet = () => {

  const [module, setModule] = useState(false);
  const [pump, setPump] = useState(false);
  const [controller, setController] = useState(false);
  const [structure, setStructure] = useState(false);
  const [accessories, setAccessories] = useState(false);
  const [active, setActive] = useState(1);

  useEffect(() => {
    selectedTabe(1);
  },[])
  const selectedTabe=async (id) => {
   
    if(id == 1){
      setActive(1);
      setModule(true);
      setPump(false);
      setController(false);
      setStructure(false);
      setAccessories(false);
    }else if(id == 2){
      setActive(2);
      setModule(false);
      setPump(true);
      setController(false);
      setStructure(false);
      setAccessories(false);
    }else if(id == 3){
      setActive(3);
      setModule(false);
      setPump(false);
      setController(true);
      setStructure(false);
      setAccessories(false);
    }else if(id == 4){
      setActive(4);
      setModule(false);
      setPump(false);
      setController(false);
      setStructure(true);
      setAccessories(false);
    }
    else if(id == 5){
      setActive(5);
      setModule(false);
      setPump(false);
      setController(false);
      setStructure(false);
      setAccessories(true);
    }else{
      setActive(1);
      setModule(true);
      setPump(false);
      setController(false);
      setStructure(false);
      setAccessories(false);
    }
  };


  function toggelactivestyleinvertor(index) {
    if (active === index) {
      return "activetab bg-info text-white";
    } else {
      return "bg-info text-white";
    }
  }

  return(
  <>

  <div className="app-wrapper">
    <div  className="row custom-margin d-flex justify-content-center">

    
        <div className="col-md-2" onClick={() => selectedTabe(1)}>
          <Widget styleName={toggelactivestyleinvertor(1)} >
              <div className="d-flex flex-row justify-content-center">
                <WbSunnyIcon className="sunnyIcon"/>
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">PV Module</h4>
              </div>
            </Widget>
       </div>

       <div className="col-md-2" onClick={() => selectedTabe(2)}>
          <Widget styleName={toggelactivestyleinvertor(2)} >
              <div className="d-flex flex-row justify-content-center">
              <LocalDrinkIcon className="lDrinkIcon" />
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">Water Pump</h4>
              </div>
            </Widget>
       </div>

       <div className="col-md-2" onClick={() => selectedTabe(3)}>
          <Widget styleName={toggelactivestyleinvertor(3)}  >
              <div className="d-flex flex-row justify-content-center">
                <FlashAutoIcon className="lDrinkIcon"/>
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">Controller</h4>
              </div>
            </Widget>
       </div>

       <div className="col-md-2" onClick={() => selectedTabe(4)}>
          <Widget styleName={toggelactivestyleinvertor(4)}  >
              <div className="d-flex flex-row justify-content-center">
                <ViewComfyIcon fontSize="large"/>
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">PV Structure</h4>
              </div>
            </Widget>
       </div>

       <div className="col-md-2" onClick={() => selectedTabe(5)}>
          <Widget styleName={toggelactivestyleinvertor(5)}  >
              <div className="d-flex flex-row justify-content-center">
                <SettingsInputComponentIcon fontSize="large"/>
              </div>
              <div className="text-center">
                <h4 className="jr-font-weight-medium mb-3">Accessories</h4>
              </div>
            </Widget>
       </div>
       
        </div>

   

    {module== true?(
          <div className="row">
              <div className="col-md-12 pl-3 pr-3">
              <Module/>
              </div>
          </div>
    ):''}

      {pump== true?(
          <div className="row">
              <div className="col-md-12 pl-3 pr-3">
                 <Pump/>
              </div>
          </div>
    ):''}

  

     {controller== true?(
          <div className="row">
            <div className="col-md-12 pl-3 pr-3">
               <Controller/>
            </div>
          </div>
    ):''}
   

    {accessories== true?(
          <div className="row">
              <div className="col-md-12 pl-3 pr-3">
                 <Acceessories/>
              </div>
          </div>
    ):''}

  {structure== true?(
          <div className="row custom-row-card pl-3 pr-3">
          <CardBox >
          <Structure/>
          </CardBox>
          </div>
      ):''}
 

    </div>
   

</>

)};

export default Datasheet;