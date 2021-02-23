import React, { useState, useEffect } from "react";
import {useDropzone} from "react-dropzone";
import {Table} from 'reactstrap';
import Widget from "components/Widget/index";
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Edit from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

// start import for taps 
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import './style.css';
import './style.scss';
// end import for taps

// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
// end import for dialog 
import DialogSolarP from './commentElement/DialogSolarP'
import DialogSettingSP from './commentElement/DialogSettingSP'


// start of dialog modal for water pump
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
// end of dialog modal for water pump

// start code for country selection 
// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
// function countryToFlag(isoCode) {
//   return typeof String.fromCodePoint !== 'undefined'
//     ? isoCode
//         .toUpperCase()
//         .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
//     : isoCode;
// }

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  { code: 'AD', label: 'Andorra', phone: '376' },
  { code: 'AE', label: 'United Arab Emirates', phone: '971' },
  { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  { code: 'AU', label: 'Australia', phone: '61', suggested: true },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  { code: 'BA', label: 'Bosnia and Herzegovina', phone: '387' },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  { code: 'CA', label: 'Canada', phone: '1', suggested: true },
  { code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61' },
  { code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243' },
  { code: 'CF', label: 'Central African Republic', phone: '236' },
  { code: 'CG', label: 'Congo, Republic of the', phone: '242' },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  { code: 'DE', label: 'Germany', phone: '49', suggested: true },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  { code: 'DO', label: 'Dominican Republic', phone: '1-809' },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  { code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500' },
  { code: 'FM', label: 'Micronesia, Federated States of', phone: '691' },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  { code: 'FR', label: 'France', phone: '33', suggested: true },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  { code: 'GS', label: 'South Georgia and the South Sandwich Islands', phone: '500' },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  { code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672' },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  { code: 'IO', label: 'British Indian Ocean Territory', phone: '246' },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  { code: 'IR', label: 'Iran, Islamic Republic of', phone: '98' },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  { code: 'JP', label: 'Japan', phone: '81', suggested: true },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  { code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869' },
  { code: 'KP', label: "Korea, Democratic People's Republic of", phone: '850' },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  { code: 'LA', label: "Lao People's Democratic Republic", phone: '856' },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  { code: 'MD', label: 'Moldova, Republic of', phone: '373' },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  { code: 'MF', label: 'Saint Martin (French part)', phone: '590' },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  { code: 'MK', label: 'Macedonia, the Former Yugoslav Republic of', phone: '389' },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  { code: 'MP', label: 'Northern Mariana Islands', phone: '1-670' },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  { code: 'PM', label: 'Saint Pierre and Miquelon', phone: '508' },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  { code: 'PS', label: 'Palestine, State of', phone: '970' },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  { code: 'SJ', label: 'Svalbard and Jan Mayen', phone: '47' },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  { code: 'ST', label: 'Sao Tome and Principe', phone: '239' },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  { code: 'SX', label: 'Sint Maarten (Dutch part)', phone: '1-721' },
  { code: 'SY', label: 'Syrian Arab Republic', phone: '963' },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  { code: 'TC', label: 'Turks and Caicos Islands', phone: '1-649' },
  { code: 'TD', label: 'Chad', phone: '235' },
  { code: 'TF', label: 'French Southern Territories', phone: '262' },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  { code: 'TT', label: 'Trinidad and Tobago', phone: '1-868' },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  { code: 'TW', label: 'Taiwan, Province of China', phone: '886' },
  { code: 'TZ', label: 'United Republic of Tanzania', phone: '255' },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  { code: 'US', label: 'United States', phone: '1', suggested: true },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  { code: 'VA', label: 'Holy See (Vatican City State)', phone: '379' },
  { code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784' },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  { code: 'VG', label: 'British Virgin Islands', phone: '1-284' },
  { code: 'VI', label: 'US Virgin Islands', phone: '1-340' },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];
// end code for country selection 

// start taps functions
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));
// end taps functions

const tableList = [
  {
    id: 1,
    name: 'Lucy Francis',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '17 days ago',
    action: 'Pay'
  },
  {
    id: 2,
    name: 'Dean Holmes',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '10 days ago',
    action: 'Pay'
  },
  {
    id: 3,
    name: 'Terry Bridges',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '6 days ago',
    action: 'Pay'
  },
  {
    id: 4,
    name: 'Alice Collins',
    image: 'https://via.placeholder.com/150x150',
    lastTransfer: '2 hrs. ago',
    action: 'Pay'
  }
];
// start code for dropzone
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
// end code for dropzone


const SolarPanel = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  // start code of dialog modal for water pump
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openS, setOpenS] = React.useState(false);
  const [openSPD, setOpenSPD] = React.useState(false);
  // end code of dialog modal for water pump

// start popove code
const [anchorEl, setAnchorEl] = React.useState(null);
const handlePopoverOpen = (event) => {
  setAnchorEl(event.currentTarget);
};
const handlePopoverClose = () => {
  setAnchorEl(null);
};
const open1 = Boolean(anchorEl);
// end popover code
// dropzone code
const [files, setFiles] = useState([]);
const {getRootProps, getInputProps} = useDropzone({
  accept: 'image/*',
  onDrop: acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }
});

const thumbs = files.map(file => (
  <div style={thumb} key={file.name}>
    <div style={thumbInner}>
      <img alt={file.name}
           src={file.preview}
           style={img}
      />
    </div>
  </div>
));

useEffect(() => () => {
  // Make sure to revoke the data uris to avoid memory leaks
  files.forEach(file => URL.revokeObjectURL(file.preview));
}, [files]);
// end dropzone code
// start form sumbit
const [brand, setBrand] = React.useState("");
const [country, setCountry] = React.useState("");
const [description, setDescription] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      brand, country, description, files
    }
    console.log(data);
    console.log(country);
    console.log(description);
    

  }
// end form sumbit
   
  


  return (
  <div className="row">
    <div className="col-xl-4 col-lg-4 col-md-12 col-12">
      <div className={classes.root}>
        <Widget styleName={`solarPanalBackGrad text-white`} >
          <div className="d-flex flex-row justify-content-center mb-3">
            {/* <i className={`zmdi zmdi-view-web zmdi-hc-4x`}/> */}
            <WbSunnyIcon className="sunnyIcon"/>
          </div>
          <div className="text-center">
            <h3 className="jr-font-weight-medium mb-3">Solar Panal Brands</h3>
            <p className="mb-3">List of Current Solar Panal Brands</p>
            <Button size="large" className="bg-warning text-white mt-3 text-capitalize" onClick={handleClickOpen}>Manage</Button>
          </div>
        </Widget>
        
          
            
            <Dialog onClose={handleClose}  aria-labelledby="customized-dialog-title" open={open}>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <DialogTitle id="customized-dialog-title" className='customizedDialog1' onClose={handleClose}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label="Add New Solar Brand" {...a11yProps(0)} />
                    <Tab label="List of Solar Brand" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                
                </DialogTitle>
                <DialogContent dividers>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                <TabPanel value={value} index={0} dir={theme.direction} className="waterPumpPanel">
               
                  <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  </Typography>
                <div className="row ">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                    <TextField id="outlined-basic" value={brand} onChange={e => setBrand(e.target.value)} name='brand' label="Brand Name" variant="outlined" />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-12">  
                    <Autocomplete
                      id="country-select-demo" value={country['country']} onChange={(event, newValue) => {setCountry(newValue);}}
                      style={{ width: 300 }}
                      options={countries}
                      classes={{
                        option: classes.option,
                      }}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(option) => (
                        <React.Fragment>
                          {/* <span>{countryToFlag(option.code)}</span> */}
                          {/* {option.label} ({option.code}) +{option.phone} */}
                          {option.label}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a country"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    /> 
                  </div>
                </div>
                <div className="row paddingTopForm">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <TextareaAutosize value={description} onChange={e => setDescription(e.target.value)} name='description' id='description' aria-label="minimum height" rowsMin={3} className="minWidth form-control" placeholder="Short Description" />
                  </div>
                </div>
                <div className="row paddingTopForm">
                  
                <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 accessory_file waterPumFile">
                      <div className="dropzone-card">
                        <div className="dropzone">
                            <div {...getRootProps({className: 'dropzone-file-btn'})}>
                                <input {...getInputProps()} />
                                <p>Upload image</p>
                            </div>
                        </div>
                        <div className="dropzone-content" style={thumbsContainer}>
                            {thumbs}
                        </div>
                      </div>
                  </div>
                </div>
                
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <div className="table-responsive-material">
                        <Table className="default-table table-unbordered table table-sm table-hover">
                          <thead className="table-head-sm th-border-b">
                            <tr>
                              <th>Brand</th>
                              <th>Coutry</th>
                              <th>logo</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {tableList.map((data, index) => {
                            return <tr key={index}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="user-detail">
                                    
                                    <h5 className="user-name">
                                    <Typography
                                      aria-owns={open1 ? 'mouse-over-popover' : undefined}
                                      aria-haspopup="true"
                                      onMouseEnter={handlePopoverOpen}
                                      onMouseLeave={handlePopoverClose}
                                    >
                                      {data.name}
                                    </Typography>
                                    </h5>
                                    <Popover
                                      id="mouse-over-popover"
                                      className={classes.popover}
                                      classes={{
                                        paper: classes.paper,
                                      }}
                                      open={open1}
                                      anchorEl={anchorEl}
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                      }}
                                      transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                      }}
                                      onClose={handlePopoverClose}
                                      disableRestoreFocus
                                    >
                                      <Typography>{data.name}.</Typography>
                                    </Popover>
                                  </div>
                                </div>
                              </td>
                              
                              <td>{data.lastTransfer}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  {data.image === '' ? null :
                                    <Avatar className="user-avatar size-30" src={data.image}/>}
                                </div>
                              </td>
                              <td>
                                <div className="pointer text-primary">
                                  <IconButton size="small" aria-label="delete"  color="secondary">
                                    <DeleteIcon />
                                  </IconButton>
                                <IconButton size="small" color="primary" aria-label="edit an alarm">
                                    <Edit />
                                </IconButton>
                              
                                </div>
                              </td>
                            </tr>
                          })}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                </SwipeableViews>
                </DialogContent>
                <DialogActions>
                {(value===0)? (<Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Submit</Button>): null}
                  
                </DialogActions>
                </form>
              </Dialog>
          
          
        
      </div>
      
    </div>

    <div className="col-xl-8 col-lg-8 col-md-12 col-12 sp-second-col">
      {/* imported dialog form another file */}
      <DialogSolarP 
        openS={openS}
        setOpenS={setOpenS}
      />
      
      <DialogSettingSP 
        openSPD={openSPD}
        setOpenSPD={setOpenSPD}
      />
      <Widget>
        <div className="d-flex flex-row mb-3">
          <h4 className="mb-0"> List of Solar Panals</h4>
          <span className="text-primary ml-auto pointer d-none d-sm-inline-flex align-items-sm-center" onClick={()=>setOpenS(true)}>
            <i className="zmdi zmdi-plus-circle-o mr-1"/>Register New Device</span>
        </div>
        <div className="table-responsive-material">
          <Table className="default-table table-unbordered table table-sm table-hover">
            <thead className="table-head-sm th-border-b">
              <tr>
                <th>Country</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {tableList.map((data, index) => {
              return <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    {data.image === '' ? null :
                      <Avatar className="user-avatar size-30" src={data.image}/>}
                    <div className="user-detail">
                      <h5 className="user-name">{data.name}</h5>
                    </div>
                  </div>
                </td>
                <td>{data.lastTransfer}</td>
                <td>
                  <div className="pointer text-primary">
                    <IconButton size="small" aria-label="delete"  color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  <IconButton size="small" color="primary" aria-label="add an alarm">
                      <Edit />
                  </IconButton>
                  <IconButton size="small" color="primary" aria-label="setting an alarm" onClick={()=>setOpenSPD(true)}>
                    <SettingsIcon />
                  </IconButton>
                  </div>
                </td>
              </tr>
            })}
            </tbody>
          </Table>
        </div>
        <span className="text-primary mt-2 pointer d-block d-sm-none" onClick={()=>setOpenS(true)}>
        <i className="zmdi zmdi-plus-circle-o mr-1 jr-fs-lg d-inline-block align-middle"/>
        Register New Device</span>
        
      </Widget>
    </div>
  </div>
    

  );
};

export default SolarPanel;
