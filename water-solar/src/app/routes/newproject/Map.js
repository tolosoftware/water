import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: 34.552351483337546, lng: 69.19775390624999};
const DefaultZoom = 10;

// const useStyles = makeStyles((theme) => ({
   
// }));

export default function Map(props) {
//   const classes = useStyles();
  const {openMap, setOpenMap, setGps}= props;

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
    // setGps({ lati: location?.lat, long: location?.lng});
  }

  useEffect(() => {
    if (location && openMap)  {
      setGps({ lati: location?.lat, long: location?.lng});
    }
  }, [location]);

  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }

  function handleResetLocation(){
    setDefaultLocation({...DefaultLocation});
    setLocation({...DefaultLocation});
    setZoom(DefaultZoom);
  }

  const handleClose = () => {
    setOpenMap(false);
    // setGps({ lati: location?.lat, long: location?.lng});
    handleResetLocation();
  };


  return (
    <React.Fragment>
     
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={openMap}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Pick The Project Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
              <div className='row mb-4'>
                <div className='col-md-4'>
                    <Button
                    size="large"
                    color="primary"
                    variant="outlined"
                    className="form-control"
                    onClick={handleResetLocation}
                    >Reset Location
                    </Button>
                </div>
                <div className='col-md-4 pt-3'>
                    <p>Latitute: {location.lat} </p>
                </div>
                <div className='col-md-4 pt-3'>
                    <p>Longitute: {location.lng} </p>
                </div>
              </div>
             
          </DialogContentText>
          <MapPicker defaultLocation={defaultLocation}
            zoom={zoom}
            style={{height:'350px'}}
            onChangeLocation={handleChangeLocation} 
            onChangeZoom={handleChangeZoom}
            apiKey='AIzaSyAHpzdpdb9uKz4ZqYpXB4TT3JfZxQXo_so'/>
    {/* AIzaSyAHpzdpdb9uKz4ZqYpXB4TT3JfZxQXo_so 
AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8
    */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
