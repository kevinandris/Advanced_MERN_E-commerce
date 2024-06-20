import React from "react";
import { LuBookOpenCheck } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";
import { ImCreditCard } from "react-icons/im";
import { GiSandsOfTime } from "react-icons/gi";

const data = [
  {
    icon: <LuBookOpenCheck size={30} color="#e13c19" />,
    heading: "Top Books",
    text: "Our books are available based on popularity across the world",
  },
  {
    icon: <LiaShippingFastSolid size={30} color="#a81ae7" />,
    heading: "Free Shipping",
    text: "we charge zero money for the shipping",
  },
  {
    icon: <ImCreditCard size={30} color="#1fd1b9" />,
    heading: "Secure Payment",
    text: "No frauds upon our payment processes, 100% secure",
  },
  {
    icon: <GiSandsOfTime size={30} color="#de0ed1" />,
    heading: "24/7 Support",
    text: "Our team is always ready for you for help",
  },
];

const HomeInfoBox = () => {
  return (
    <div className="infoboxes --mb2">
      {/* // ! Map the data */}
      {data.map((item, index) => {
        const { icon, heading, text } = item;
        return (
          <div className="infobox" key={index}>
            <div className="icon">{icon}</div>
            <div className="text">
              <h4>{heading}</h4>
              <p className="--text-sm">{text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeInfoBox;
