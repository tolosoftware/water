import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//backdrop
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
// import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import CardBox from "components/CardBox";
import SendMoney from "./SendMoney";
import UserExpiration from "./UserExpiration";
import TestimonialCarousel from "./testimonial/index";
import Slider from "react-slick";
//country flag
import Flags from "country-flag-icons/react/3x2";
import Divider from "@material-ui/core/Divider";
import Firstrow from "./Firstrow";
import Secondrow from "./Secondrow";
import ProvenceUsers from "./ProvenceUsers";
import "./dashstyle.css";

function getFlag(countryname) {
  switch (countryname) {
    case "Afghanistan":
      return <Flags.AF title="Afghanistan" className="customflag" />;
    case "Italy":
      return <Flags.IT title="Italy" className="customflag" />;
    case "China":
      return <Flags.CH title="China" className="customflag" />;
    case "Iran":
      return <Flags.IR title="Iran" className="customflag" />;
    case "Turkey":
      return <Flags.TR title="Turkey" className="customflag" />;
    case "Germany":
      return <Flags.DE title="Germany" className="customflag" />;
    default:
      return "";
  }
}

const testimonials = [
  {
    content:
      "All the Lorem Ipsum generators on the Internet tend to repeat, making this the first true generator on the Internet.",
    avatar: "/images/slider/1.png",
    name: "Alex Dolgove",
    title: "BDM G-axon",
  },
  {
    content:
      "Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
    avatar: "/images/slider/2.png",
    name: "Domnic Brown",
    title: "Product Head",
  },
  {
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, ",
    avatar: "/images/slider/3.png",
    name: "John Smith",
    title: "Chief Engineer",
  },
  {
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    avatar: "/images/slider/4.png",
    name: "Min Chan",
    title: "Director, Abc LLC",
  },
  {
    content:
      "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures",
    avatar: "/images/slider/3.png",
    name: "Stella Johnson",
    title: "Engineer Lead",
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
    color: "#fff",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));
const Home = ({ match }) => {
  const [openbackdrop, setOpenbackdrop] = useState(false);
  const [pump, setPump] = useState([]);
  const [solar, setSolar] = useState([]);
  const [invertorBrand, setInvertorBrand] = useState([]);
  const [users, setUsers] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    getDashboardData();
    getPost();
    document.addEventListener('contextmenu', (e) => {e.preventDefault();});
  }, []);

  const options = {
    dots: true,
    arrows: false,
    pauseOnHover: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    fade: false,
    slidesToShow: 2,
    marginRight: 10,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const getDashboardData = async () => {
    setOpenbackdrop(true);
    var id = JSON.parse(localStorage.getItem("UserData")).id;
    var system = JSON.parse(localStorage.getItem("UserData")).system;
    var data = [id, system];
    axios
      .post("api/adminDashboard", data)
      .then((res) => {
        if(res.data.auth=='unauthenticated'){
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        }else{
          setOpenbackdrop(false);
          setSolar(res.data.solarbrand);
          setPump(res.data.pumpbrand);
          setInvertorBrand(res.data.invertorBrand);
          setUsers(res.data.users);
        }
        
      })
      .catch((err) => {
        setOpenbackdrop(false);
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };

  const [post, setPost] = useState();
  const getPost = async () => {
    axios
      .get("api/post")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {});
  };

  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">
      <Backdrop className={classes.backdrop} open={openbackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="row">
        <Firstrow />
      </div>

      <div className="row">
        <div className="col-xl-5 col-lg-5 col-md-12 col-12 user-list-sect">
          <SendMoney usersData={users} />
        </div>
        <CardBox styleName="col-xl-7 col-lg-7 col-md-12 col-12">
          <ProvenceUsers />
        </CardBox>
      </div>

      <CardBox styleName="col-xl-12 col-lg-12 col-md-12 col-12 pl-0 pr-0">
        <div className="row">
          <Secondrow />
        </div>
      </CardBox>

      <CardBox
        styleName="col-xl-12 col-lg-12 col-md-12 col-12 pl-0 pr-0"
        cardStyle="text-center"
        heading={"All Brands"}
      >
        <div className="row">
          
          <div className="col-xl-4 col-lg-4 col-md-12 col-12">
            <Slider className={`slick-app-frame ${pump.length===1? 'single-slide':''}`} {...options}>
              {pump.map((data, index) => {
                return (
                  <div class="slick-slide-item">
                    <div className="brand-logo">
                      <div className="brand-logo-inner">
                        <img
                          src={`${axios.defaults.baseURL}brand/pumpbrand/${data.image}`}
                          alt="Clients"
                        />
                      </div>
                    </div>
                    <span>
                      {" "}
                      {data.country} {getFlag(data.country)}{" "}
                    </span>
                  </div>
                );
              })}
            </Slider>

            <Divider className="mb-3 mt-1" />
            <h3 className="mt-3">Pump Brands</h3>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-12">
            <Slider className={`slick-app-frame ${solar.length===1? 'single-slide':''}`} {...options}>
              {solar.map((data, index) => {
                return (
                  <div class="slick-slide-item">
                    <div className="brand-logo">
                      <div className="brand-logo-inner">
                        <img
                          src={`${axios.defaults.baseURL}brand/solar/${data.image}`}
                          alt="Clients"
                        />
                      </div>
                    </div>
                    <span>
                      {" "}
                      {data.country} {getFlag(data.country)}{" "}
                    </span>
                  </div>
                );
              })}
            </Slider>
            <Divider className="mb-3 mt-1" />
            <h3 className="mt-3">Solar Brands</h3>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-12">
            <Slider className={`slick-app-frame ${invertorBrand.length===1? 'single-slide':''}`} {...options}>
              {invertorBrand.map((data, index) => {
                return (
                  <div class="slick-slide-item">
                    <div className="brand-logo">
                      <div className="brand-logo-inner">
                        <img
                          src={`${axios.defaults.baseURL}brand/invertor/${data.image}`}
                          alt="Clients"
                        />
                      </div>
                    </div>
                    <span>
                      {" "}
                      {data.country} {getFlag(data.country)}{" "}
                    </span>
                  </div>
                );
              })}
            </Slider>
            <Divider className="mb-3 mt-1" />
            <h3 className="mt-3">Invertor Brands</h3>
          </div>
        </div>
      </CardBox>

      <div className="row">
        {JSON.parse(localStorage.getItem("UserData")).system!=1?
          <CardBox styleName="col-lg-5">
            <UserExpiration />
          </CardBox>
        :''}
        

        <CardBox
          styleName={`col-xl-7 col-lg-12 col-md-12 col-12 dashboard-slide  sliderstylepadding`}
          cardStyle="text-center"
          heading
        >
          <TestimonialCarousel testimonials={testimonials} />
        </CardBox>

        <CardBox styleName={`${JSON.parse(localStorage.getItem("UserData")).system!=1?'col-xl-12 col-lg-12 col-md-12 col-12':'col-xl-5 col-lg-12 col-md-12 col-12'}`}>
          <>
            <h2>
              <span>Todays Post</span>
              <span style={{ float: "right", fontSize:'16px'}}>{post?.date}</span>
            </h2>
            <Divider className="mb-3 mt-1" />
            <h3 className="mb-2">
              <b>{post?.title}</b>
            </h3>
            <h4>{post?.discription}</h4>
          </>
        </CardBox>
      </div>

      <div className="row">
        
      </div>
    </div>
  );
};

export default Home;
