import React from "react";
import Slider from "react-slick";
//country flag
import Flags from "country-flag-icons/react/3x2";
import axios from "axios";

const options = {
    dots: true,
    arrows: false,
    pauseOnHover: true,
    infinite: false,
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
};
  
const Pump = (props) => {

  return (
    <>
       <Slider className={`slick-app-frame ${props?.pump.length===1? 'single-slide':''}`} {...options}>
            {props?.pump.map((data, index) => {
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
    </>
  );
};

export default Pump;
