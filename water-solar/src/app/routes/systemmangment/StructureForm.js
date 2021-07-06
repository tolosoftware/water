import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CustomDropzone from "../systemmangment/commentElement/CustomDropzone";
import DataSheetFile from '../systemmangment/commentElement/DataSheetFile/index';
import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// code for small steps
import axios from 'axios';
import IntlMessages from 'util/IntlMessages';
import { NotificationManager } from 'react-notifications';
import { useForm } from 'react-hook-form';
// end import for dialog 
// start of dialog modal for Solar Panal 
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
// end of dialog modal for Solar Panal 
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
    root: {
        width: 300,
    },
}));


export default function StructureForm(props) {
    const { register, handleSubmit, errors, reset } = useForm(); // initialize the hook
    // start code of dialog modal for Solar Panal 
    const { open, setOpen } = props;
    const { structureObj, setStructureObj } = props;

    // end code of dialog modal for Solar Panal 

    const [image, setImage] = useState({ oldImage: '', filePath: 'structure/', btnText: 'Image' });
    let imageFile = '';
    const [dataSheet, setDataSheet] = useState({ oldImage: '', filePath: 'structure/data_sheet/', btnText: 'Data Sheet' });
    let dataSheetFile = '';


    const eventhandlerIm = (data) => {
        imageFile = data;
        // console.log('images file data', data);
        // console.log('images file', imageFile);
    };
    const eventhandlerDaSh = data => {
        dataSheetFile = data;
        // console.log('dataSheetFile file', dataSheetFile);
    };


    const classes = useStyles();

    const handleCloseS = () => {
        setOpen(false);
        setStructureObj([]);
    };



    useEffect(() => {
        setImage({ ...image, oldImage: structureObj.image ? structureObj.image : '' });
        setDataSheet({ ...dataSheet, oldImage: structureObj.datasheet ? structureObj.datasheet : '' });
    }, [props.structureObj, open])

    const onSubmit = (data) => {

        data['imageFile'] = imageFile;
        data['dataSheetFile'] = dataSheetFile;

        // console.log("Inverter Data:", data);
        axios.post('api/structure', data)
            .then(res => {
                handleCloseS();
                props.getStructure();
                // console.log(res.data);
                NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
                    id="notification.titleHere" />);
            }).catch(err => {
                NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
                    id="notification.titleHere" />);
            });

    }
    return (
        <Dialog onClose={handleCloseS} aria-labelledby="customized-dialog-title" open={open}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleCloseS}>
                    Update Selected Structure
                </DialogTitle>
                <DialogContent dividers>
                    {/* <SolarPanalDeviceForm /> */}
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-12">

                            <div className="row">
                                <TextField id="id" type='hidden' style={{ width: '0%' }} name="structureID" defaultValue={(structureObj?.id) ? structureObj?.id : ''} inputRef={register} />

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                                    <TextField id="outlined-basic-name" size="small" variant="outlined" name="name" className="fullWidthInput" label="Name" defaultValue={structureObj?.name} inputRef={register({ required: true })}
                                        error={errors.name && true} helperText={errors.name ? '*required' : ''}
                                    />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                                    <TextField id="outlined-basic1" size="small" variant="outlined" name="model" className="fullWidthInput" label="Model" defaultValue={structureObj?.model} inputRef={register({ required: structureObj?.model?false:true })} InputProps={{readOnly: structureObj?.model?true:false,}}
                                        error={errors.model && true} helperText={errors.model ? '*required' : ''}
                                    />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 insideFormBP">
                                    <TextField id="outlined-basic-price" size="small" className="fullWidthInput" label="Price" name='price' variant="outlined" 
                                    InputProps={{
                                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    defaultValue={structureObj?.price} inputRef={register({required: true, pattern: /^[+-]?([0-9]*[.])?[0-9]+$/,})} 
                                    error={errors.price && true} helperText={errors.price ? '*Please enter valid number.' : ''}
                                    />
                                </div>
                                {/* <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                                    <TextField id="outlined-basic-quantity" size="small" variant="outlined" name="quantity" className="fullWidthInput" label="Quantity" defaultValue={structureObj?.quantity} inputRef={register({ required: true })}
                                        error={errors.quantity && true} helperText={errors.quantity ? '*required' : ''}
                                    />
                                </div> */}

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 waterPumFile waterPumpListFile">
                                    <CustomDropzone formData={image} onChange={eventhandlerIm.bind(this)} />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 waterPumFile waterPumpListFile">
                                    <DataSheetFile formData={dataSheet} onChange={eventhandlerDaSh.bind(this)} />
                                </div>
                            </div>

                        </div>
                    </div>

                </DialogContent>

                <DialogActions>
                    <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg">Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}