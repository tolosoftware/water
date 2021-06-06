import React from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';

const Footer = () => {
    return (
      <footer className="app-footer">
        <div>
        <span className="d-inline-block">{`Copyright Amu Water Management System © 2021.`}</span> <br/>
        <span className="d-block">{`A Property of ${JSON.parse(localStorage.getItem("UserData")).belongto}.`}</span>
        </div>
        
        <Button
          href={JSON.parse(localStorage.getItem("UserData")).belongto==="Rana Solar"?'http://ranasolarenergy.com/':'http://dorokhshansolar.com/'}
          target="_blank"
          size="small"
          color="primary"
        ><IntlMessages id="water_is_life"/></Button>
      </footer>
    );
  }
;

export default Footer;
