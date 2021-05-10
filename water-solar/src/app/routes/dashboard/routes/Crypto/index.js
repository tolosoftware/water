import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
//backdrop
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import CardBox from 'components/CardBox';
import SendMoney from "./SendMoney";
import UserExpiration from './UserExpiration';
import PumpList from "./PumpList";
import SolarList from "./SolarList";
import InvertorList from "./InvertorList";
import TestimonialCarousel from './testimonial/index';
import Slider from "react-slick";
import {Area, AreaChart, ResponsiveContainer} from "recharts";
import Card from '@material-ui/core/Card';
//country flag
import Flags from 'country-flag-icons/react/3x2';
import Divider from "@material-ui/core/Divider";

import Firstrow from './Firstrow';
import Secondrow from './Secondrow';

function getFlag(countryname) {
  switch (countryname) {
    case 'Afghanistan':
      return <Flags.AF title="United States" className="customflag"/> ;
    case 'Italy':
      return <Flags.IT title="United States" className="customflag"/> ;
    case 'China':
      return <Flags.CH title="United States" className="customflag" />;
     case 'Iran':
     return <Flags.IR title="United States" className="customflag"/> ;
    default:
      return '';
  }
}
const increamentData = [
  {name: 'Page A', pv: 200},
  {name: 'Page B', pv: 1200},
  {name: 'Page C', pv: 600},
  {name: 'Page D', pv: 1600},
  {name: 'Page D', pv: 1000},
  {name: 'Page H', pv: 2260},
  {name: 'Page K', pv: 800},
];
const testimonials = [
  {
    content: 'All the Lorem Ipsum generators on the Internet tend to repeat, making this the first true generator on the Internet.',
    avatar: '/images/General layout.png',
    name: 'Alex Dolgove',
    title: 'BDM G-axon'
  }, {
    content: 'Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)',
    avatar: '/images/System layout.png',
    name: 'Domnic Brown',
    title: 'Product Head'
  }, {
    content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    avatar: '/images/Pipe layout.png',
    name: 'Jeson Born',
    title: 'Director, Abc LLC'
  }, {
    content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, ',
    avatar: '/images/Motor Cable layout.png',
    name: 'John Smith',
    title: 'Chief Engineer'
  }, {
    content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
    avatar: '/images/outlet layout.png',
    name: 'Min Chan',
    title: 'Director, Abc LLC'
  }, {
    content: 'It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures',
    avatar: '/images/Hight layout.png',
    name: 'Stella Johnson',
    title: 'Engineer Lead'
  }, {
    content: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections ',
    avatar: '/images/System details layout.png',
    name: 'Steve Smith',
    title: 'Director, Abc LLC'
  }
]; 
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

    backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));
const Crypto = ({match}) => {
const [openbackdrop,setOpenbackdrop]=useState(false);
const [isHide,setIsHide]=useState(false);
const [isHide1,setIsHide1]=useState(false);
const [isHide2,setIsHide2]=useState(false);
const [pump,setPump]=useState([]);
const [solar,setSolar]=useState([]);
const [invertorBrand,setInvertorBrand]=useState([]);
const [users,setUsers]=useState([]);
const [projects,setProjects]=useState([]);
const [proOfThMonth,setProOfThMonth]=useState(0);
const [pumpLists,setPumpLists]=useState([]);
const [solarLists,setSolarLists]=useState([]);
const [invertorLists,setInvertorLists]=useState([]);
const projectChart={
  title: 'PROJECTS',
  prize: projects.length,
  icon: 'stats',
  bgColor: 'indigo',
  styleName: 'up',
  desc: 'This month',
  percent: proOfThMonth,
};
const classes = useStyles();
useEffect(() => {
    getDashboardData();
    
},[])
 
const options = {
  dots: false,
  infinite: true,
  arrows: true,
  speed: 500,
  slidesToShow: 2,
  marginRight: 10,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false
      }
    }, 
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false
      }
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }
  ]
};
const handleToggle = (type) => {
  if(type==='proBtn'){
    setIsHide(!isHide);
  }else if(type==='userBtn'){
    setIsHide1(!isHide1);
  }else if(type==='downBtn'){
    setIsHide2(!isHide2);
  }
}
  const getDashboardData=async () => {
    setOpenbackdrop(true);
   axios.get('api/adminDashboard')
     .then(res => {  
       setOpenbackdrop(false);
       setSolar(res.data.solarbrand);
       setPump(res.data.pumpbrand);
       setInvertorBrand(res.data.invertorBrand);
       setUsers(res.data.users);
       setPumpLists(res.data.pumpLists);
       setSolarLists(res.data.solarLists);
       setInvertorLists(res.data.invertorLists);
       setProjects(res.data.projects);
       setProOfThMonth(res.data.proOfThMonth);
      //  console.log('solar and pumpbrand', res);
     }
       
   ).catch(err => {
          setOpenbackdrop(false);
          NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
           id="notification.titleHere"/>);
       }
     )
 };
  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">
      {/* <ContainerHeader match={match} title={<IntlMessages id="sidebar.dashboard.dashbord"/>}/> */}
      <Backdrop className={classes.backdrop} open={openbackdrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
       
      <div className="row">
        <Firstrow/>
      </div>

      <CardBox styleName="col-xl-12 col-lg-12 col-md-12 col-12 pl-0 pr-0">
        <div className="row">
           <Secondrow/>
        </div>
      </CardBox>

      
      <CardBox styleName="col-xl-12 col-lg-12 col-md-12 col-12 pl-0 pr-0" cardStyle="text-center"
                    heading={"All Brands"}>
            

              <div className="row">
              <div className="col-md-4">
              <Slider className="slick-app-frame" {...options} >
                {pump.map((data,index) => {
                  return <div class="slick-slide-item">
                    <div className="brand-logo">
                      <div className="brand-logo-inner">
                        <img src={`${axios.defaults.baseURL}brand/pumpbrand/${data.image}`} alt="Clients"/>
                      </div>
                      
                    </div>
                    <span> {data.country} {getFlag(data.country)}  </span>
                  </div>  
                })} 
                
              </Slider>
               <Divider className="mb-3 mt-1" />
              <h3 className="mt-3">Pump Brands</h3>
              </div>

              <div className="col-md-4">

              <Slider className="slick-app-frame" {...options} >
                {solar.map((data,index) => {
                  return <div class="slick-slide-item">
                    <div className="brand-logo">
                      <div className="brand-logo-inner">
                        <img src={`${axios.defaults.baseURL}brand/solar/${data.image}`} alt="Clients"/>
                      </div>
                    </div>
                    <span> {data.country} {getFlag(data.country)}  </span>
                  </div>  
                })} 
                
              </Slider>
                  <Divider className="mb-3 mt-1" />
              <h3 className="mt-3">Solar Brands</h3>

              </div>
              <div className="col-md-4">
                <Slider className="slick-app-frame" {...options} >
                  {solar.map((data,index) => {
                    return <div class="slick-slide-item">
                      <div className="brand-logo">
                        <div className="brand-logo-inner">
                          <img src={`${axios.defaults.baseURL}brand/solar/${data.image}`} alt="Clients"/>
                        </div>
                      </div>
                      <span> {data.country} {getFlag(data.country)}  </span>
                    </div>  
                  })} 
                  
                </Slider>
                  <Divider className="mb-3 mt-1" />
                  <h3 className="mt-3">Invertor Brands</h3>
                </div>


              </div>
      </CardBox>

      <div className="row">

       <div className="col-xl-5 col-lg-5 col-md-12 col-12 user-list-sect">
            <SendMoney usersData={users}/>
        </div>

          <CardBox styleName="col-xl-7 col-lg-7 col-md-12 col-12 dashboard-slide" cardStyle="text-center"
                  heading>
            {/* <div><IntlMessages id="component.carousel.testimonial"/><IntlMessages id="component.carousel.testimonialTxt"/></div> */}
            <TestimonialCarousel testimonials={testimonials}/>
          </CardBox>

          

      </div>

       <div className="row">
        <CardBox styleName="col-lg-5" >
          <UserExpiration/>
        </CardBox>
      </div>
    </div>
  );
};

export default Crypto;
